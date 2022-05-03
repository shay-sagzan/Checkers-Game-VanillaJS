class Piece {
  constructor(row, col, player, type) {
    this.row = row
    this.col = col
    this.type = type
    this.player = player
    this.possibleMoves = []
    this.canEatLeft = false
    this.canEatRight = false
    this.alive = true
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
  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return BLACK_PLAYER
    }
    return WHITE_PLAYER
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
    let relativeMoves = []
    if (this.player === WHITE_PLAYER) {
      relativeMoves = [
        [1, 1],
        [1, -1],
      ]
    } else {
      relativeMoves = [
        [-1, 1],
        [-1, -1],
      ]
    }
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0]
      let col = this.col + relativeMove[1]

      if (boardData.isEmpty(row, col)) {
        result.push([row, col])
      } else if (boardData.isPlayer(row, col, this.player)) {
        result.push([])
      } else {
        if (this.player === WHITE_PLAYER) {
          if (relativeMoves[0] === relativeMove) {
            this.canEat = true
            result.push([row + 1, col + 1])
          } else {
            this.canEat = true
            result.push([row + 1, col - 1])
          }
        } else {
          if (relativeMoves[0] === relativeMove) {
            this.canEat = true
            result.push([row - 1, col + 1])
          } else {
            this.canEat = true
            result.push([row - 1, col - 1])
          }
        }
      }
    }
    if (possibleMoves.length === 0) {
      this.winner = this.getOpponent()
      this.endOfTheGame()
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
