function Piece(x, y, player) {
    this.coords = { x, y }
    this.player = player
    this.color = {}
    this.color[Setup.PLAYER_0] = PIECE_COL_0
    this.color[Setup.PLAYER_1] = PIECE_COL_1

    this.draw = function () {}
}

function Game() {
    this.pieces = (() => {
        let pieces = []
        for (let y = 0; y < PIECES_COL_NUM; ++y) {
            for (let x = y % 2; x < ROW_COL_NUM; x += 2) {
                pieces.push(new Piece(x, y, Setup.PLAYER_0))
            }
        }
        for (let y = ROW_COL_NUM - PIECES_COL_NUM; y < ROW_COL_NUM; ++y) {
            for (let x = y % 2; x < ROW_COL_NUM; x += 2) {
                pieces.push(new Piece(x, y, Setup.PLAYER_1))
            }
        }
        return pieces
    })()
}

const game = new Game()
