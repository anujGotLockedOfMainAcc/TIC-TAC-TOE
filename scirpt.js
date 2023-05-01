const moan = new Audio("./audio/youWon.m4a");
const playWithMe = new Audio("./audio/playWithMe.m4a");
const yes = new Audio("./audio/yesYes.m4a");
let ai = document.querySelector(".ai");
let two = document.querySelector(".two-player");

ai.addEventListener("mouseover", () => {
  playWithMe.play();
});

ai.addEventListener("click", () => {
  yes.play();
});
