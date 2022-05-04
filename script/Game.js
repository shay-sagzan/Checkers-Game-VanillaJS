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
        let oldPieceCol = piece.col
        piece.row = row
        piece.col = col

        if ((this.boardData.checkForBlackEndMoves = true)) {
          this.winner = WHITE_PLAYER
        }
        if ((this.boardData.checkForWhiteEndMoves = true)) {
          this.winner = BLACK_PLAYER
        }

        let isRightMove = false
        col > oldPieceCol ? (isRightMove = true) : (isRightMove = false)
        if (piece.canEat === true) {
          const pawnEatenColor = piece.getOpponent()
          this.boardData.removePiece(row, col, pawnEatenColor, isRightMove)
        }

        this.boardData.checkForWhiteArray().length === 0
          ? (this.winner = WHITE_PLAYER)
          : (this.winner = undefined)
        this.boardData.checkForBlackArray().length === 0
          ? (this.winner = BLACK_PLAYER)
          : (this.winner = undefined)

        piece.changeToQueen()

        this.currentPlayer = piece.getOpponent()
        return true
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
      return []
    }
    return piece.getPossibleMoves(this.boardData)
  }
}
