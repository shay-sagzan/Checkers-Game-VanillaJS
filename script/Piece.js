class Piece {
  constructor(row, col, player, type) {
    this.row = row
    this.col = col
    this.type = type
    this.player = player
  }

  /**
   * @function getOpponent
   * The function check if player in specific cell is opponent
   * @returns
   * The opponent player color
   */
  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER
    }
    return WHITE_PLAYER
  }

  getPossibleMoves(boardData) {
    let moves
    if (this.type === PAWN) {
      moves = this.getPawnMoves(boardData)
    } else if (this.type === QUEEN) {
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

  eatFunction(boardData) {
    let result = []
    let direction = 2
    if (this.player === BLACK_PLAYER) {
      direction = -2
    }

    let position = [this.row + direction, this.col + direction]
    if (boardData.isEmpty(position[0], position[2])) {
      result.push(position)
    }

    position = [this.row + direction, this.col + direction]
    if (boardData.isPlayer(position[0], position[2], this.getOpponent())) {
      result.push(position)
    }

    position = [this.row + direction, this.col - direction]
    if (boardData.isPlayer(position[0], position[2], this.getOpponent())) {
      result.push(position)
    }

    return result
  }

  getPawnMoves(boardData) {
    let result = []
    let relativeMoves = []
    if (this.player === BLACK_PLAYER) {
      relativeMoves = [
        [-1, 1],
        [-1, -1],
      ]
    }
    if (this.player === WHITE_PLAYER) {
      relativeMoves = [
        [1, -1],
        [1, 1],
      ]
    }

    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0]
      let col = this.col + relativeMove[1]
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col])
      }
    }
    return result
  }

  getQueenMoves(boardData) {
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
