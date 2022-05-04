class Game {
  constructor(firstPlayer) {
    this.boardData = new BoardData()
    this.currentPlayer = firstPlayer
    this.winner = undefined
  }

  /**
   * @function tryMove
   * The function tries to make a move and check for possible moves. The function also check for
   * winner or any change with the player's type
   * @param piece - given piece
   * @param row - given row
   * @param col - given col
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

        // Trigger functions to check if there are no more moves for one of the players
        if ((this.boardData.checkForBlackEndMoves = true)) {
          this.winner = WHITE_PLAYER
        }
        if ((this.boardData.checkForWhiteEndMoves = true)) {
          this.winner = BLACK_PLAYER
        }

        // Get data on possible eaten movements
        let isRightMove = false
        let type = piece.type
        col > oldPieceCol ? (isRightMove = true) : (isRightMove = false)
        if (piece.canEat === true) {
          const pawnEatenColor = piece.getOpponent()
          this.boardData.removePiece(
            row,
            col,
            pawnEatenColor,
            isRightMove,
            type
          )
        }

        // Trigger function who check the length of the arrays (black and white)
        this.boardData.checkForWhiteArray().length === 0
          ? (this.winner = WHITE_PLAYER)
          : (this.winner = undefined)
        this.boardData.checkForBlackArray().length === 0
          ? (this.winner = BLACK_PLAYER)
          : (this.winner = undefined)

        // Check if piece change to Queen
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
