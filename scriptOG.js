// gameBoard module

const gameBoard = (() => {
  // game array
  let game = ["", "", "", "", "", "", "", "", ""];

  // selcting dom elements
  let boardDiv = document.querySelectorAll(".board-div");
  let turnFor = document.querySelector("#turn-for");
  let wonPlayer = document.querySelector(".won-player");

  // variables
  let turn = true;

  // methods
  function play() {
    for (let i = 0; i < boardDiv.length; i++) {
      boardDiv[i].addEventListener("click", () => {
        if (game[i] === "") {
          if (turn === true) {
            turnFor.innerHTML = "Turn for O";
            game[i] = "X";
            turn = false;
          } else {
            turnFor.innerHTML = "Turn for X";
            game[i] = "O";
            turn = true;
          }
        }
        makeMove();
        checkWin();
      });
    }
  }

  function makeMove() {
    for (let i = 0; i < game.length; i++) {
      boardDiv[i].innerHTML = game[i];
    }
  }

  function checkWin() {
    let win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 8],
    ];
    win.forEach((e) => {
      if (
        game[e[0]] === game[e[1]] &&
        game[e[1]] === game[e[2]] &&
        game[e[0]] !== ""
      ) {
        wonPlayer.innerHTML = `player won ${game[e[0]]}`;
        setTimeout(resetBoard, 1500);
      }
    });
  }

  function resetBoard() {
    for (div of boardDiv) {
      game.forEach((e, index, game) => {
        game[index] = "";
      });
      div.innerHTML = "";
    }
  }

  return {
    game,
    play,
    makeMove,
    checkWin,
  };
})();

gameBoard.play();
