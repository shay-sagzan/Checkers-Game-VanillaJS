class Piece {
  constructor(row, col, player, type) {
    this.row = row
    this.col = col
    this.type = type
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
    if (this.player === PAWN) {
      moves = this.getPawnMoves(boardData)
    } else if (this.player === QUEEN) {
      moves = this.getQueenMoves(boardData)
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

  getPawnMoves() {
    let result = []

    let direction = 1
    if (this.player === BLACK_PLAYER) {
      direction = -1
    }

    let position = [this.row + direction, this.col]
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position)
    }

    position = [this.row + direction, this.col + direction]
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position)
    }

    position = [this.row + direction, this.col - direction]
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position)
    }

    return result
  }

  getQueenMoves() {
    let result = []
    result = result.concat(this.getMovesInDirection(-1, -1, boardData))
    result = result.concat(this.getMovesInDirection(-1, 1, boardData))
    result = result.concat(this.getMovesInDirection(1, -1, boardData))
    result = result.concat(this.getMovesInDirection(1, 1, boardData))
    return result
  }

  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = []

    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + directionRow * i
      let col = this.col + directionCol * i
      if (boardData.isEmpty(row, col)) {
        result.push([row, col])
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        result.push([row, col])
        return result
      } else if (boardData.isPlayer(row, col, this.player)) {
        return result
      }
    }
    return result
  }
}
