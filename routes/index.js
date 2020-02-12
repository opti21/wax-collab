var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Wax//Wane Collab Machine" });
});

router.get("/output", (req, res) => {
  res.render("output");
});

module.exports = router;
