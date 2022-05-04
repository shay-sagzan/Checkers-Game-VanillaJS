class BoardData {
  constructor() {
    this.initPieces()
    this.blackPieces = []
    this.whitePieces = []
  }

  /**
   * @function initPieces
   * The function create list of pieces (24 total)
   */
  initPieces() {
    this.pieces = []

    for (let i = 0; i < BOARD_SIZE; i += 2) {
      this.pieces.push(new Piece(0, i + 1, WHITE_PLAYER, PAWN))
      this.pieces.push(new Piece(1, i, WHITE_PLAYER, PAWN))
      this.pieces.push(new Piece(2, i + 1, WHITE_PLAYER, PAWN))
      this.pieces.push(new Piece(5, i, BLACK_PLAYER, PAWN))
      this.pieces.push(new Piece(6, i + 1, BLACK_PLAYER, PAWN))
      this.pieces.push(new Piece(7, i, BLACK_PLAYER, PAWN))
    }
  }

  checkForBlackArray() {
    this.blackPieces = []
    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].player === BLACK_PLAYER) {
        this.blackPieces.push(this.pieces[i])
      }
    }
    return this.blackPieces
  }

  checkForWhiteArray() {
    this.whitePieces = []
    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].player === WHITE_PLAYER) {
        this.whitePieces.push(this.pieces[i])
      }
    }
    return this.whitePieces
  }

  checkForBlackEndMoves() {
    const blackArr = this.checkForBlackArray()
    for (let i = 0; i < blackArr; i++) {
      if (piece.getPawnMoves() === undefined) {
        game.winner = WHITE_PLAYER
      }
    }
    return true
  }

  checkForWhiteEndMoves() {
    const whiteArr = this.checkForWhiteArray()
    for (let i = 0; i < whiteArr; i++) {
      if (piece.getPawnMoves() === undefined) {
        game.winner = BLACK_PLAYER
      }
    }
    return true
  }

  /**
   * @function getPiece
   * The function check the which piece is in the given row and col
   * @param row - given row
   * @param col - given col
   * @returns
   * piece in given row and col, or undefined if not exists
   */
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece
      }
    }
  }

  /**
   * @function removedPiece
   * The function remove eaten piece from the board
   * @param row - given row
   * @param col - given col
   * @param removedPawnColor - eat indication
   * @param isRightMove - eat indication
   * @returns
   * The new element in the row and the col of the eaten element
   */
  removePiece(row, col, removedPawnColor, isRightMove) {
    const eatingIndicationState = {
      color: removedPawnColor,
      rightDirection: isRightMove,
    }

    if (
      eatingIndicationState.color === BLACK_PLAYER &&
      eatingIndicationState.rightDirection === true
    ) {
      row = row - 1
      col = col - 1
    } else if (
      eatingIndicationState.color === BLACK_PLAYER &&
      eatingIndicationState.rightDirection === false
    ) {
      row = row - 1
      col = col + 1
    } else if (
      eatingIndicationState.color === WHITE_PLAYER &&
      eatingIndicationState.rightDirection === true
    ) {
      row = row + 1
      col = col - 1
    } else {
      row = row + 1
      col = col + 1
    }

    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i] // i have all the objects of piece
      //check for possible forward eats
      if (
        (piece.row === row && piece.col === col) ||
        (piece.row === row && piece.col === col)
      ) {
        // Remove piece at index i
        this.pieces.splice(i, 1)
        return piece
      }
    }
  }

  /**
   * @function isEmpty
   * The function check if the given piece (row, col) is empty (undefined)
   * @param row - given row
   * @param col - given col
   * @returns
   * True if the getPiece is === undefined. Otherwise - false
   */
  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined
  }

  /**
   * @function isPlayer
   * The function check what is the color of the element on given piece
   * @param row - given row
   * @param col - given col
   * @param player - given player color
   * @returns
   * True if the given player equals to the player in the piece. Otherwise - false
   */
  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col)
    return piece !== undefined && piece.player === player
  }
}
