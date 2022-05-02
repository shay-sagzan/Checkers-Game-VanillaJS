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

    //white pieces
    this.pieces.push(new Piece(0, 1, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(0, 3, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(0, 5, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(0, 7, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(1, 0, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(1, 2, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(1, 4, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(1, 6, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(2, 1, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(2, 3, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(2, 5, WHITE_PLAYER, PAWN))
    this.pieces.push(new Piece(2, 7, WHITE_PLAYER, PAWN))

    //black pieces
    this.pieces.push(new Piece(5, 0, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(5, 2, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(5, 4, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(5, 6, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(6, 1, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(6, 3, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(6, 5, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(6, 7, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(7, 0, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(7, 2, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(7, 4, BLACK_PLAYER, PAWN))
    this.pieces.push(new Piece(7, 6, BLACK_PLAYER, PAWN))
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
        (piece.row === row + 1 && piece.col === col + 1) ||
        (piece.row === row + 1 && piece.col === col - 1)
      ) {
        console.log(piece)
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
