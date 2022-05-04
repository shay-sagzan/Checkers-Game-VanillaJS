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

  /**
   * @function getPossibleMoves
   * The function check what is the possible moves for each type of player
   * The function check also the filtered moves according to absolute moves
   * @param boardData - given boardData
   * @returns
   * The filtered moves of given piece according to boardData
   */
  getPossibleMoves(boardData) {
    let moves
    if (this.type === PAWN) {
      moves = this.getPawnMoves(boardData)
    } else if (this.type === QUEEN) {
      moves = this.getQueenMoves(boardData)
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
   * @function getPawnMoves
   * The function check what is the possible moves and eats for the Pawn
   * @param boardData - given boardData
   * @returns
   * The optional moves for each Pawn if he was selected
   */
  getPawnMoves(boardData) {
    let result = []
    let mustEat = []
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
          if (
            relativeMoves[0] === relativeMove &&
            boardData.isEmpty(row + 1, col + 1)
          ) {
            this.canEat = true
            mustEat.push([row + 1, col + 1])
          } else if (
            relativeMoves[1] === relativeMove &&
            boardData.isEmpty(row + 1, col - 1)
          ) {
            this.canEat = true
            mustEat.push([row + 1, col - 1])
          }
        } else {
          if (
            relativeMoves[0] === relativeMove &&
            boardData.isEmpty(row - 1, col + 1)
          ) {
            this.canEat = true
            mustEat.push([row - 1, col + 1])
          } else if (
            relativeMoves[1] === relativeMove &&
            boardData.isEmpty(row - 1, col - 1)
          ) {
            this.canEat = true
            mustEat.push([row - 1, col - 1])
          }
        }
      }
    }
    if (mustEat.length === 0) {
      return result
    } else {
      return mustEat
    }
  }

  /**
   * @function getQueenMoves
   * The function check what is the possible moves and eats for the Queen
   * @param boardData - given boardData
   * @returns
   * The optional moves for each Queen if she was selected
   */
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
    let mustEat = []

    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + directionRow * i
      let col = this.col + directionCol * i
      if (boardData.isEmpty(row, col)) {
        result.push([row, col])
      } else if (boardData.isPlayer(row, col, this.player)) {
        return result
      } else {
        if (boardData.isEmpty(row + 1, col + 1)) {
          this.canEat = true
          mustEat.push([row + 1, col + 1])
        } else if (boardData.isEmpty(row + 1, col - 1)) {
          this.canEat = true
          mustEat.push([row + 1, col - 1])
        }
        if (boardData.isEmpty(row - 1, col + 1)) {
          this.canEat = true
          mustEat.push([row - 1, col + 1])
        } else if (boardData.isEmpty(row - 1, col - 1)) {
          this.canEat = true
          mustEat.push([row - 1, col - 1])
        }
      }
    }
    return result
  }

  /**
   * @function changeToQueen
   * The function check if one of the players pieces is in a position to become a Queen
   * @returns
   * If conditions were true, the functions change the type of the piece
   */
  changeToQueen() {
    if (this.row === 7 && this.player === WHITE_PLAYER) {
      this.type = QUEEN
    } else if (this.row === 0 && this.player === BLACK_PLAYER) {
      this.type === QUEEN
    }
  }
}
