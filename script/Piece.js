class Piece {
  constructor(row, col, player, type) {
    this.row = row
    this.col = col
    this.type = type
    this.player = player
    this.canEat = false
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
    // if (possibleMoves.length === 0) {
    //   this.winner = this.getOpponent()
    //   this.endOfTheGame()
    // }
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
