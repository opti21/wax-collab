var socket = io("/vid-control");
socket.on("socketConnect", () => {
  console.log("Socket Connected");
});

let bgVideo = document.getElementById("bg-video");

let embedTL = gsap.timeline();

embedTL.from("#twitch-embed", {
  scale: 0.1,
  autoAlpha: 0,
  duration: 10,
  ease: "sine",
  delay: 2,
  onComplete: pauseTL
});

embedTL.to("#twitch-embed", {
  autoAlpha: 0,
  duration: 7,
  ease: "sine",
  onComplete: pauseAndReset
});

embedTL.pause();

function pauseTL() {
  embedTL.pause();
  bgVideo.pause();
}

function pauseAndReset() {
  player.pause();
  embedTL.seek(0).pause();
}

socket.on("setChannel", data => {
  player.setChannel(`${data.channel}`);
  console.log("Set Channel");
  player.pause();
});

socket.on("showPlayer", () => {
  console.log("Show Player");
  player.play();
  player.setVolume(1);
  embedTL.play();
});

socket.on("hidePlayer", () => {
  console.log("Hide Player");
  player.setVolume(0);
  bgVideo.play();
  embedTL.play();
});

socket.on("setVol", data => {
  console.log("Set Volume to ", data.vol);
  player.setVolume(data.vol);
});
