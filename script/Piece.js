class Piece {
  constructor(row, col, player) {
    this.row = row
    this.col = col
    this.player = player
  }

  /**
   * @function getPossibleMoves
   * The function check what is the possible move of every piece in the table according
   * to the type of the piece
   * !!! that explanation is relevant for all the next functions !!!
   * @param boardData - the given board data from the table
   * @returns
   * The filtered moves for selected element
   */
  getPossibleMoves(boardData) {
    let moves
    if (this.player === BLACK_PLAYER) {
      moves = this.getBlackPlayerMoves(boardData)
    } else if (this.player === WHITE_PLAYER) {
      moves = this.getWhitePlayerMoves(boardData)
    } else {
      console.log("Unknown type", type)
    }

    // Get filtered absolute moves
    let filteredMoves = []
    for (const absoluteMove of moves) {
      const absoluteRow = absoluteMove[0]
      const absoluteCol = absoluteMove[1]
      if (
        absoluteRow >= 0 &&
        absoluteRow <= 7 &&
        absoluteCol >= 0 &&
        absoluteCol <= 7
      ) {
        filteredMoves.push(absoluteMove)
      }
    }
    return filteredMoves
  }

  getBlackPlayerMoves() {}

  getWhitePlayerMoves() {}
}
