var socket = io("/vid-control");
socket.on("socketConnect", () => {
  console.log("Socket Connected");
});

let hideBtn = document.getElementById("hideBtn");
let showBtn = document.getElementById("showBtn");
let setChanBtn = document.getElementById("setChanBtn");

setChanBtn.onclick = e => {
  console.log("Set Channel");
  e.preventDefault();
  let channel = document.getElementById("chanInput").value;
  fetch(`/api/set-channel/${channel}`).then(res => {
    console.log(res);
  });
  document.getElementById(
    "currentChan"
  ).innerHTML = `Current Channel: ${channel}`;
  document.getElementById("chat").innerHTML = `
			<iframe frameborder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/${channel}/chat?darkpopout"
				height="500" width="350">
			</iframe>
	`;
};

hideBtn.disabled = !hideBtn.disabled;

showBtn.onclick = e => {
  e.preventDefault();
  fetch("/api/player-control?show=true");
  showBtn.disabled = !showBtn.disabled;
  hideBtn.disabled = !hideBtn.disabled;
};

hideBtn.onclick = e => {
  e.preventDefault();
  fetch("/api/player-control?show=false");
  showBtn.disabled = !showBtn.disabled;
  hideBtn.disabled = !hideBtn.disabled;
};

document.getElementById("vol").onchange = e => {
  let vol = e.target.value / 100;
  console.log(vol);
  fetch(`/api/vol/${vol}`);
};
