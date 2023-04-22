let game = ["", "", "", "", "", "", "", "", ""];

// addimg things to an array
let boardDiv = document.querySelectorAll(".board-div");
let turn = true;
for (let i = 0; i < boardDiv.length; i++) {
  boardDiv[i].addEventListener("click", () => {
    if (game[i] === "") {
      if (turn === true) {
        game[i] = "x";
        turn = false;
      } else {
        game[i] = "o";
        turn = true;
      }
    }
    makeMove();
  });
}

// display everything on the board
function makeMove() {
  for (let i = 0; i < game.length; i++) {
    boardDiv[i].innerHTML = game[i];
  }
}

function checkWin(game) {}
