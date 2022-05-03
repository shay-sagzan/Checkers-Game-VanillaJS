class Piece {
  constructor(row, col, player, type) {
    this.row = row
    this.col = col
    this.type = type
    this.player = player
    this.relativeMoves = []
    this.canEatLeft = false
    this.canEatRight = false
    this.alive = true
  }

  get relativeMoves() {
    return this.relativeMoves
  }

  set relativeMoves(pm) {
    this.relativeMoves = pm
  }

  /**
   * @function removePiece
   * Remove a piece from the board
   * and kills it.
   */
  removePiece() {
    this._col = -1
    this._row = -1
    this.terminate()
  }

  terminate() {
    this._alive = false
    return true
  }

  getPossibleMoves(boardData) {
    let moves
    if (typeof Pawn) {
      moves = this.getPawnMoves(boardData)
    }
    // } else if (typeof Queen) {
    //   moves = this.getQueenMoves(boardData)
    // }
    else {
      console.log("Unknown type", this.type)
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

  /**
   * @function getOpponent
   * The function check if player in specific cell is opponent
   * @returns
   * The opponent player color
   */
  getOpponent(row, col) {
    this.getPiece(row, col)
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER, row, col
    }
    return WHITE_PLAYER, row, col
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

class Pawn extends Piece {
  constructor(row, col, player, type) {
    super(row, col, player, type)
  }

  getPawnMoves(boardData) {
    let result = []
    let direction = 1
    if (this.player === BLACK_PLAYER) {
      direction = -1
    }
    if (this.player === WHITE_PLAYER) {
      this.relativeMoves = [
        [1, 1],
        [1, -1],
      ]
    }

    if (this.player === BLACK_PLAYER) {
      this.relativeMoves = [
        [-1, 1],
        [-1, -1],
      ]
    }
    for (let relativeMove of this.relativeMoves) {
      let row = this.row + relativeMove[0]
      let col = this.col + relativeMove[1]
      if (boardData.isEmpty(row, col)) {
        result.push([row, col])
      }
      if (this.getOpponent(row, col)) {
      }
    }
    return result
  }
}

//   getBlackPawnMoves(boardData) {
//     let result = []
//     this.relativeMoves = [
//       [-1, 1],
//       [-1, -1],
//     ]
//     for (let relativeMove of this.relativeMoves) {
//       let row = this.row + relativeMove[0]
//       let col = this.col + relativeMove[1]

//       if (boardData.isEmpty(row, col)) {
//         result.push([row, col])
//       } else if (boardData.isPlayer(row, col, this.getOpponent())) {
//         if (
//           row + 1 === this.row &&
//           col - 1 === this.col &&
//           boardData.isEmpty(row - 1, col + 1)
//         ) {
//           console.log("eat white from right")
//           result.push([row - 1, col + 1])
//           this.canEatRight = true
//           return result
//         }
//         if (
//           row + 1 === this.row &&
//           col + 1 === this.col &&
//           boardData.isEmpty(row - 1, col - 1)
//         ) {
//           console.log("eat white from left")
//           result.push([row - 1, col - 1])
//           this.canEatLeft = true
//           return result
//         }
//       } else if (boardData.isPlayer(row, col, this.player)) {
//         console.log("friend")
//         return result
//       }
//     }
//     return result
//   }
// }

class Queen extends Piece {
  constructor(row, col, player, type) {
    super(row, col, player, type)
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
