class TicTacToeGame {
  constructor() {
    this.gameOver = false;
    this.players = ["one", "two"];
    this.turn = this.players[0];
  }

  addSymbol(turn) {
    if (turn == this.players[0]) { console.log("X"); this.turn = this.players[1] }
    if (turn == this.players[1]) { console.log("O"); this.turn = this.players[0] }
  }
}

/********************************************
 * BUILD GAME
 * Calls functions for Tic Tac Toe to work
 ********************************************/
function buildGame() {
  let tictactoe = new TicTacToeGame();
  addBoxClick(tictactoe);
}

function addBoxClick(game) {
  const boxes = document.getElementsByClassName('box');
  let event = game.addSymbol(game.turn);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', event);
    //console.log(boxes[i].innerHTML);
  }
  //console.log(boxes.length);
  //console.log("success");
}
