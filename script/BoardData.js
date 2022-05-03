class BoardData {
  constructor() {
    this.initPieces()
  }

  /**
   * @function initPieces
   * The function create list of pieces (24 total)
   */
  initPieces() {
    this.pieces = []

    for (let i = 1; i < BOARD_SIZE; i += 2) {
      this.pieces.push(new Pawn(0, i, WHITE_PLAYER, PAWN))
      this.pieces.push(new Pawn(2, i, WHITE_PLAYER, PAWN))
      this.pieces.push(new Pawn(6, i, BLACK_PLAYER, PAWN))
    }

    for (let i = 0; i < BOARD_SIZE; i += 2) {
      this.pieces.push(new Pawn(1, i, WHITE_PLAYER, PAWN))
      this.pieces.push(new Pawn(5, i, BLACK_PLAYER, PAWN))
      this.pieces.push(new Pawn(7, i, BLACK_PLAYER, PAWN))
    }
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
   * @returns
   * The new element in the row and the col of the eaten element
   */
  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i] // i have all the objects of piece
      //check for possible forward eats

      if (
        (piece.row === row - 1 && piece.col === col - 1) ||
        (piece.row === row - 1 && piece.col === col + 1)
      ) {
        console.log(piece.row)
        console.log(piece.col)
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
