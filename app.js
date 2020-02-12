var createError = require("http-errors");
const express = require("express");
const app = express();
const server = require("http").Server(app);
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const io = require("socket.io")(server);
var indexRouter = require("./routes/index");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const vidControl = io.of("/vid-control");

vidControl.on("connection", socket => {
  socket.emit("socketConnect");
});

app.use("/", indexRouter);
app.get("/api/set-channel/:channel", (req, res) => {
  vidControl.emit("setChannel", {
    channel: req.params.channel
  });
  res.status(200).send("Emitted");
});

app.get("/api/player-control", (req, res) => {
  let show = req.query.show;
  if (show === "true") {
    vidControl.emit("showPlayer", {});
  } else {
    vidControl.emit("hidePlayer", {});
  }
  res.status(200).send("Emitted");
});

app.get("/api/vol/:vol", (req, res) => {
  let vol = req.params.vol;
  console.log(req.query);
  vidControl.emit("setVol", {
    vol: vol
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

let port = process.env.PORT || 3000;
server.listen(port, () => console.log(`App listening on port ${port}!`));
