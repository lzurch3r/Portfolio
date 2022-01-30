window.onload = startGame();

let player = 0;

function reset() {
  const boxes = document.querySelectorAll('.box');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = '';
  }
}

function startGame() {
  const boxes = document.querySelectorAll('.box');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', (e) =>  {
      clicked(e);
    });
  }
}

function clicked(e) {
  console.log(player)
      if(player === 0){
        e.target.innerText = 'X';
        player = 1;
      }else {
        e.target.innerText = 'O'
        player = 0;
      }
      checkWin();
}

function checkWin() {
  const boxes = document.querySelectorAll('.box');
  // check across
  // check diag
  // check vertical

  match = false

  for (let i = 0; i < boxes.length; i++) {
    if(boxes[0].outerText === boxes[1].outerText && boxes[0].outerText === boxes[2].outerText) {//Top Row
      endOfGame();
      match = true;
      break;
    }else if((boxes[0].outerText === boxes[3].outerText && boxes[0].outerText === boxes[6].outerText)) {//1st column
      endOfGame();
      match = true;
      break;
    }else if((boxes[3].outerText === boxes[4].outerText && boxes[3].outerText === boxes[5].outerText)) {//middle row
      endOfGame(); 
      match = true;
        break;
    }else if((boxes[6].outerText === boxes[7].outerText && boxes[6].outerText === boxes[8].outerText)) {//bottom row
      endOfGame();
      match = true;
      break;
    }else if((boxes[1].outerText === boxes[4].outerText && boxes[1].outerText === boxes[7].outerText)) {//middle column
      endOfGame();
      match = true;
        break;
    }else if((boxes[2].outerText === boxes[5].outerText && boxes[2].outerText === boxes[8].outerText)) {//bottom row
      endOfGame();    
      match = true;
            break;}
          }
      

  function endOfGame() {
    alert('end of game');
  }

}












// class TicTacToeGame {
//     constructor() {
//       this.gameOver = false;
//       this.players = ["one", "two"];
//       this.turn = this.players[0];
//     }
  
//     addSymbol(turn) {
//       if (turn == this.players[0]) { console.log("X"); this.turn = this.players[1] }
//       if (turn == this.players[1]) { console.log("O"); this.turn = this.players[0] }
//     }
//   }
  
//   /********************************************
//    * BUILD GAME
//    * Calls functions for Tic Tac Toe to work
//    ********************************************/
//   function buildGame() {
//     let tictactoe = new TicTacToeGame();
//     addBoxClick(tictactoe);
//   }
  
//   function addBoxClick(game) {
//     const boxes = document.getElementsByClassName('box');
//     let event = game.addSymbol(game.turn);
  
//     for (let i = 0; i < boxes.length; i++) {
//       boxes[i].addEventListener('click', event);
//       //console.log(boxes[i].innerHTML);
//     }
//     //console.log(boxes.length);
//     //console.log("success");
//   }
 