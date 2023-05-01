/*

1. add a player or ai page
2. create a player object
3. correct preexisting fucntions -> play(),add to makeMove()
add new functions ->  checkTie(),
4. create a basic ai

-> check if ai has wining move, make move
or
-> if opponent has a winning move, make it
or
make any random move 

5. create advance unbeatable ai - > using minimax()
 */

//switch between ai and local player
const moan = new Audio("./audio/youWon.m4a");
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
  function playTwoPlayer() {
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
        if (checkWin()) {
          moan.play();
          setTimeout(resetBoard, 1500);
        }
        if (checkTie() && !checkWin()) {
          wonPlayer.innerHTML = `TIE!!`;
          setTimeout(resetBoard, 1500);
        }
      });
    }
  }

  function playAi(player, ai) {
    player.turn = true;
    for (let i = 0; i < boardDiv.length; i++) {
      boardDiv[i].addEventListener("click", () => {
        if (game[i] === "") {
          if (player.turn === true) {
            turnFor.innerHTML = `Turn for ${player.symbol}`;
            game[i] = player.symbol;
            ai.turn = true;
            player.turn = false;
          }
          if (ai.turn === true) {
            turnFor.innerHTML = `Turn for ${ai.symbol}`;
            makeMoveAi(player, ai);
            ai.turn = false;
            player.turn = true;
          }
        }
        makeMove();
        if (checkWin()) {
          moan.play();
          setTimeout(resetBoard, 1500);
        }
        if (checkTie() && !checkWin()) {
          wonPlayer.innerHTML = `TIE!!`;
          setTimeout(resetBoard, 1500);
        }
      });
    }
  }

  function makeMove() {
    for (let i = 0; i < game.length; i++) {
      if (boardDiv[i].innerHTML === "" && game[i] !== "") {
        boardDiv[i].innerHTML = game[i];
      }
    }
  }
  // basic ai
  function makeMoveAi(player, ai) {
    for (let i = 0; i < game.length; i++) {
      // if ai wins
      console.log("check ai move");
      if (game[i] === "") {
        game[i] = ai.symbol;
        if (checkWin()) {
          console.log("ai win move");
          return;
        }
        game[i] = "";
      }
    }

    // if opp has a winning move
    for (let i = 0; i < game.length; i++) {
      console.log("check opp move");
      if (game[i] === "") {
        game[i] = player.symbol;
        if (checkWin()) {
          game[i] = ai.symbol;
          return;
        }
        game[i] = "";
      }
    }

    // if no move play random
    if (!game.includes("")) {
      return;
    }
    // if no move play random
    while (true) {
      let r = Math.floor(Math.random() * 9);
      if (game[r] === "") {
        console.log("random move");
        game[r] = ai.symbol;
        return;
      }
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
      [2, 4, 6],
    ];

    for (let i = 0; i < win.length; i++) {
      let [a, b, c] = win[i];
      if (game[a] === game[b] && game[b] === game[c] && game[a] !== "") {
        wonPlayer.innerHTML = `player won ${game[a]}`;
        // setTimeout(resetBoard, 1500);
        return true;
      }
    }
    return false;
  }

  function checkTie() {
    for (let i = 0; i < game.length; i++) {
      if (game[i] === "") {
        return false;
      }
    }
    return true;
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
    playTwoPlayer,
    makeMove,
    checkWin,
    playAi,
  };
})();

// player object

let makePlayer = (name, symbol) => {
  let turn = false;
  return {
    name,
    symbol,
    turn,
  };
};

let page = document.body.id;
if (page === "two") {
  gameBoard.playTwoPlayer();
}
if (page === "ai") {
  let ai = makePlayer("ai", "O");
  let player = makePlayer("player", "X");

  gameBoard.playAi(player, ai);
  console.log("playing againts ai");
}
