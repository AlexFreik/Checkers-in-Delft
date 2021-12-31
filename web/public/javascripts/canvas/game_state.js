class Piece {
    constructor(col, row, player) {
        this.coords = { col, row }
        this.player = player
        this.color = {}
        this.color[Setup.PLAYER_0] = PIECE_COL_0
        this.color[Setup.PLAYER_1] = PIECE_COL_1
    }
    coordsEqual({ col, row }) {
        return this.coords.col === col && this.coords.row === row
    }
}

class Game {
    /**
     * @param {boolean} forceJumps
     */
    constructor(forceJumps) {
        this.forceJumps = forceJumps
        this.pieces = this._initialisePieces()
    }

    movePiece(from, to) {
        this.getPiece(from).coords = to
    }
    getPiece(coords) {
        const piece = this.pieces.filter((piece) => piece.coordsEqual(coords))
        return piece[0]
    }
    removePiece(coords) {
        this.pieces.splice(0, this.getPiece(coords))
    }
    _initialisePieces() {
        let pieces = []
        for (let y = 0; y < PIECES_COL_NUM; ++y) {
            for (let x = y % 2; x < ROW_COL_NUM; x += 2) {
                pieces.push(new Piece(x, y, Setup.PLAYER_0))
            }
        }
        for (let row = ROW_COL_NUM - PIECES_COL_NUM; row < ROW_COL_NUM; ++row) {
            for (let col = row % 2; col < ROW_COL_NUM; col += 2) {
                pieces.push(new Piece(col, row, Setup.PLAYER_1))
            }
        }
        return pieces
    }
}

let game = undefined
let playerToken = undefined
