class Piece {
    /**
     *
     * @param {number} col
     * @param {number} row
     * @param {number} sideId
     */
    constructor(col, row, sideId) {
        this.coords = { col, row }
        this.sideId = sideId
        this.color = {}
        this.color[SIDE_ID_1] = PIECE_COL_1
        this.color[SIDE_ID_2] = PIECE_COL_2
        this.isKing = false
    }

    /**
     *
     * @param {number} col
     * @param {number} row
     * @return {boolean}
     */
    coordsEqual({ col, row }) {
        return this.coords.col === col && this.coords.row === row
    }
}

class Coords {
    /**
     * @param {number} col
     * @param {number} row
     */
    constructor(col, row) {
        this.col = col
        this.row = row
    }
}
class Game {
    /**
     * @param {string} gameId
     * @param {string} playerId
     * @param {{forceJumps: boolean}} settings
     * @param {number} side
     */
    constructor(gameId, playerId, settings = undefined, side = undefined) {
        this.gameId = gameId
        this.playerId = playerId
        this.settings = settings
        this.sideId = side
        this.pieces = this._initialisePieces()
        this.currentSideId = SIDE_ID_1
    }

    /**
     * @param {Coords} coords
     */
    makeKing = (coords) => {
        console.assert(this.getPiece(coords).isKing === false)
        this.getPiece(coords).isKing = true
    }
    /**
     *
     * @param {Coords} from
     * @param {Coords} to
     */
    movePiece = (from, to) => {
        this.getPiece(from).coords = to
    }
    /**
     *
     * @param {Coords} from
     * @param {Coords} to
     */
    requestPieceMove = (from, to) => {
        senders['move'](from, to)
    }

    /**
     *
     * @param {Coords} coords
     * @return {Piece}
     */
    getPiece = (coords) => {
        const piece = this.pieces.filter((piece) => piece.coordsEqual(coords))
        return piece[0]
    }

    /**
     *
     * @param {Coords} coords
     */
    removePiece = (coords) => {
        this.pieces.splice(this.pieces.indexOf(this.getPiece(coords)), 1)
    }

    /**
     * @param {number} sideId
     * @return {number}
     */
    getEatenPiecesNum = (sideId) => {
        console.assert(sideId === SIDE_ID_1 || sideId === SIDE_ID_2)
        return PLAYER_PIECES_NUM - this.pieces.filter((piece) => piece.sideId === sideId).length
    }
    _initialisePieces = () => {
        let pieces = []
        for (let y = 0; y < PIECES_COL_NUM; ++y) {
            for (let x = y % 2; x < ROW_COL_NUM; x += 2) {
                pieces.push(new Piece(x, y, SIDE_ID_1))
            }
        }
        for (let row = ROW_COL_NUM - PIECES_COL_NUM; row < ROW_COL_NUM; ++row) {
            for (let col = row % 2; col < ROW_COL_NUM; col += 2) {
                pieces.push(new Piece(col, row, SIDE_ID_2))
            }
        }
        return pieces
    }
    get turn() {
        return this.sideId === this.currentSideId ? 'you' : 'opp'
    }
}

let game = undefined
