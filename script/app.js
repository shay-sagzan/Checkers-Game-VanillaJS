const WHITE_PLAYER = "white"
const BLACK_PLAYER = "black"
const BOARD_SIZE = 8

let table
let game
let selectedPiece
let eatenBlackPieces
let eatenWhitePieces
const CHECKER_BOARD_ID = "checker-board"

/**
//  * @function tryUpdateSelectedPiece
//  * The function clears all the previous classList after element movement and
//  * try to update the next selected piece
//  * @param row
//  * @param col
//  */
//  function tryUpdateSelectedPiece(row, col) {
//   // Clear all previous possible moves
//   for (let i = 0; i < BOARD_SIZE; i++) {
//     for (let j = 0; j < BOARD_SIZE; j++) {
//       table.rows[i].cells[j].classList.remove("possible-move")
//       table.rows[i].cells[j].classList.remove("selected")
//     }
//   }

//   // Show possible moves
//   const piece = game.boardData.getPiece(row, col)
//   if (piece !== undefined) {
//     let possibleMoves = game.getPossibleMoves(piece)
//     for (let possibleMove of possibleMoves) {
//       const cell = table.rows[possibleMove[0]].cells[possibleMove[1]]
//       cell.classList.add("possible-move")
//     }
//   }

//   table.rows[row].cells[col].classList.add("selected")
//   selectedPiece = piece
// }

// /**
//  * @function onCellClick
//  * The function mark cell by "click", the function is significant to play chess
//  * @param row
//  * @param col
//  */
// function onCellClick(row, col) {
//   // selectedPiece - The current selected piece (selected in previous click)
//   // row, col - the currently clicked cell - it may be empty, or have a piece
//   if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
//     selectedPiece = undefined
//     // Recreate whole board - this is not efficient, but doesn't affect user experience
//     createChessBoard(game.boardData)
//     if (game.endOfTheGame() === false) checkIfCheck()
//   } else {
//     tryUpdateSelectedPiece(row, col)
//   }
// }

/**
 * @function createCheckerBoard
 * The function get mark the table by the ID and remove it
 * if !== null, then, the function create the board 8*8 and
 * add the images to relevant cells
/  * @param boardData
 */
function createChekerBoard() {
  // table = document.getElementById(CHESS_BOARD_ID)
  //   if (table !== null) {
  //     table.remove()
  //   }

  // Create empty chess board HTML:
  table = document.createElement("table")
  table.id = CHECKER_BOARD_ID
  document.body.appendChild(table)
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow()
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell()
      if ((row + col) % 2 === 0) {
        cell.className = "light-cell"
      } else {
        cell.className = "dark-cell"
      }
      //   cell.addEventListener("click", () => onCellClick(row, col))
    }
  }
}

window.addEventListener("load", createChekerBoard())
