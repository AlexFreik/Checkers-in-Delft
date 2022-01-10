const Pos = require('./pos')

class Piece {
    /**
     * Creates a new piece
     * @param x {number}
     * @param y {number}
     * @param sideId {number}
     */
    constructor(x, y, sideId) {
        this.pos = new Pos(x, y)
        this.sideId = sideId
        this.king = false
    }

    /**
     * Returns a copy of this piece with a changed position
     * @param pos {Pos}
     * @return {Piece}
     */
    withPos(pos) {
        return {...this, pos: pos}
    }
}

module.exports = Piece
