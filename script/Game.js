class Game {
  constructor(firstPlayer) {
    this.boardData = new BoardData()
    this.currentPlayer = firstPlayer
    this.winner = undefined
  }

  /**
   * @function tryMove
   * The function tries to make a move. Check for possible moves
   * @param piece - the given piece
   * @param row - the given row
   * @param col - the given col
   * @returns
   * True if move is successful, Otherwise - false
   */
  tryMove(piece, row, col) {
    const possibleMoves = this.getPossibleMoves(piece)
    for (const possibleMove of possibleMoves) {
      if (possibleMove[0] === row && possibleMove[1] === col) {
        piece.row = row
        piece.col = col
        if (piece.canEatLeft === true) {
          this.boardData.removePiece(row, col)
        } else if (piece.canEatRight === true) {
          this.boardData.removePiece(row, col)
        }
        this.currentPlayer = piece.getOpponent()
        return true
      } else {
      }
    }
    return false
  }

  /**
   * @function getPossibleMoves
   * The function checking which player's turn or if there is a winner
   * @param piece - the given piece
   * @returns
   * empty array (non-functionality) if one of the conditions is true, otherwise - get the possible move
   */
  getPossibleMoves(piece) {
    if (this.currentPlayer !== piece.player || this.winner !== undefined) {
      if (this.winner === BLACK_PLAYER || this.winner === WHITE_PLAYER) {
        return this.endOfTheGame()
      }
      return []
    }
    return piece.getPossibleMoves(this.boardData)
  }

  /**
   * @function endOfTheGame
   * The function checking if there is a winner to the game
   * @returns
   * If there is a winner she return true with pop-up. Otherwise - false
   */
  endOfTheGame() {
    if (game.winner !== undefined) {
      const winnerPopup = document.createElement("div")
      const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1)
      winnerPopup.classList.add("Victory-jumps")
      winnerPopup.textContent = winner + " player wins!"
      console.log(winnerPopup.textContent)
      table.appendChild(winnerPopup)
      return true
    }
    return false
  }
}
