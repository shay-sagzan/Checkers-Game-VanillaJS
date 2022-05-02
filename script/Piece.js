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
      if (this.player === WHITE_PLAYER) {
        moves = this.getWhitePawnMoves(boardData)
      } else if (this.player === BLACK_PLAYER) {
        moves = this.getBlackPawnMoves(boardData)
      }
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
  getWhitePawnMoves(boardData) {
    let result = []
    const relativeMoves = [
      [1, 1],
      [1, -1],
    ]
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0]
      let col = this.col + relativeMove[1]
      if (boardData.isEmpty(row, col)) {
        result.push([row, col])
        console.log("regular move")
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        if (
          row - 1 === this.row &&
          col - 1 === this.col &&
          boardData.isEmpty(row + 1, col + 1)
        ) {
          result.push([row + 1, col + 1])
          console.log("eat black from right")
          return result
        } else if (
          row - 1 === this.row &&
          col + 1 === this.col &&
          boardData.isEmpty(row + 1, col - 1)
        ) {
          result.push([row + 1, col - 1])
          console.log("eat black from left")
          return result
        }
      } else if (boardData.isPlayer(row, col, this.player)) {
        console.log("friend")
      }
    }
    return result
  }

  getBlackPawnMoves(boardData) {
    let result = []
    const relativeMoves = [
      [-1, 1],
      [-1, -1],
    ]
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0]
      let col = this.col + relativeMove[1]
      if (boardData.isEmpty(row, col)) {
        result.push([row, col])
        console.log("regular move")
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        if (
          row + 1 === this.row &&
          col - 1 === this.col &&
          boardData.isEmpty(row - 1, col + 1)
        ) {
          console.log("eat white from right")
          result.push([row - 1, col + 1])
          return result
        }
        if (
          row + 1 === this.row &&
          col + 1 === this.col &&
          boardData.isEmpty(row - 1, col - 1)
        ) {
          console.log("eat white from left")
          result.push([row - 1, col - 1])
          return result
        }
      } else if (boardData.isPlayer(row, col, this.player)) {
        console.log("friend")
        return result
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

  changeToQueen() {
    let rowForBlack = 0
    let rowForWhite = 7
    if (this.player === BLACK_PLAYER && this.row === rowForBlack) {
      this.type === QUEEN
    }
    if (this.player === WHITE_PLAYER && this.row === rowForWhite) {
      this.type === QUEEN
    }
  }
}
