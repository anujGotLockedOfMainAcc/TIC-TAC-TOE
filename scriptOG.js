// to select ai level
// let medium = document.getElementById("medium");
// let hard = document.getElementById("hard");

// medium.addEventListener("click", () => {
//   if (medium.style.backgroundColor === "rgb(209, 148, 224)") {
//     medium.style.backgroundColor = "skyblue";
//   } else {
//     medium.style.backgroundColor = "rgb(209, 148, 224)";
//   }
// });

// hard.addEventListener("click", () => {
//   if (hard.style.backgroundColor === "rgb(209, 148, 224)") {
//     hard.style.backgroundColor = "skyblue";
//   } else {
//     hard.style.backgroundColor = "rgb(209, 148, 224)";
//   }
// });

// selctting sounds
// let gameSound = new Audio("./audio/music.mp3");
let gameOver = new Audio("./audio/gameover.mp3");
let move = new Audio("./audio/Untitled.mov");

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
        move.play();
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
        move.play();
        if (checkWin(player.symbol) || checkWin(ai.symbol)) {
          if (checkWin(player.symbol)) {
            wonPlayer.innerHTML = `PLAYER WON: ${player.symbol}}`;
          } else if (checkWin(ai.symbol)) {
            wonPlayer.innerHTML = `PLAYER WON: ${ai.symbol}`;
          }
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
            move.play();
            turnFor.innerHTML = `Turn for ${player.symbol}`;
            game[i] = player.symbol;
            ai.turn = true;
            player.turn = false;
          }
          if (ai.turn === true) {
            turnFor.innerHTML = `Turn for ${"O"}`;
            makeMoveAi(player, ai);
            ai.turn = false;
            player.turn = true;
          }
        }
        makeMove();

        if (checkWin(player.symbol) || checkWin(ai.symbol)) {
          if (checkWin(player.symbol)) {
            wonPlayer.innerHTML = `PLAYER WON: ${player.symbol}}`;
          } else if (checkWin(ai.symbol)) {
            wonPlayer.innerHTML = `PLAYER WON: ${"AI"}`;
          }
          gameOver.play();
          console.log("hi");
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
    let bestMove = getBestMove(player, ai);
    game[bestMove] = ai.symbol;
    // for (let i = 0; i < game.length; i++) {
    //   // if ai wins
    //   console.log("check ai move");
    //   if (game[i] === "") {
    //     game[i] = ai.symbol;
    //     if (checkWin()) {
    //       console.log("ai win move");
    //       return;
    //     }
    //     game[i] = "";
    //   }
    // }

    // // if opp has a winning move
    // for (let i = 0; i < game.length; i++) {
    //   console.log("check opp move");
    //   if (game[i] === "") {
    //     game[i] = player.symbol;
    //     if (checkWin()) {
    //       game[i] = ai.symbol;
    //       return;
    //     }
    //     game[i] = "";
    //   }
    // }

    // // if no move play random
    // if (!game.includes("")) {
    //   return;
    // }
    // // if no move play random
    // while (true) {
    //   let r = Math.floor(Math.random() * 9);
    //   if (game[r] === "") {
    //     console.log("random move");
    //     game[r] = ai.symbol;
    //     return;
    //   }
  }

  function checkWin(symbol) {
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
        if (game[a] === symbol) {
          // wonPlayer.innerHTML = `player won ${game[a]}`;
          // setTimeout(resetBoard, 1500);
          return true;
        }
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
    wonPlayer.innerHTML = "PLAYER WON: ";
  }

  function scores(player, ai) {
    if (checkWin(player.symbol)) {
      return -10;
    } else if (checkWin(ai.symbol)) {
      return 10;
    }
    return 0;
  }

  function getBestMove(player, ai) {
    let depth = 0;
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < game.length; i++) {
      if (game[i] === "") {
        game[i] = ai.symbol;
        let score = minimax(player, ai, false, depth);
        game[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    // console.log(bestMove);

    return bestMove;
  }
  function minimax(player, ai, isMaxi, depth) {
    if (checkWin(ai.symbol)) {
      return 10 - depth;
    } else if (checkWin(player.symbol)) {
      return depth - 10;
    } else if (checkTie()) {
      return 0;
    }

    if (isMaxi) {
      let bestScore = -Infinity;
      for (let i = 0; i < game.length; i++) {
        if (game[i] === "") {
          game[i] = ai.symbol;
          let score = minimax(player, ai, false, depth + 1);
          game[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < game.length; i++) {
        if (game[i] === "") {
          game[i] = player.symbol;
          let score = minimax(player, ai, true, depth + 1);
          game[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  /// unbeatable ai
  function unbeatableAI() {}

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
let ai = makePlayer("ai", "O");
let player = makePlayer("player", "X");

let page = document.body.id;
if (page === "two") {
  gameBoard.playTwoPlayer();
}
if (page === "ai") {
  gameBoard.playAi(player, ai);
  console.log("playing againts ai");
}
