class BoardData {
  constructor() {
    this.initPieces()
  }

  /**
   * @function initPieces
   * The function create list of pieces (32 total)
   */
  initPieces() {
    this.pieces = []

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.pieces.push(new Piece(0, i, WHITE_PLAYER))
      this.pieces.push(new Piece(1, i, WHITE_PLAYER))
      this.pieces.push(new Piece(2, i, WHITE_PLAYER))
      this.pieces.push(new Piece(5, i, WHITE_PLAYER))
      this.pieces.push(new Piece(6, i, BLACK_PLAYER))
      this.pieces.push(new Piece(7, i, BLACK_PLAYER))
    }
  }
}
