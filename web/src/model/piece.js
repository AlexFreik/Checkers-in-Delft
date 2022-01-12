const Pos = require('./pos')

class Piece {
    /**
     * Creates a new piece
     * @param x {number}
     * @param y {number}
     * @param sideId {number}
     * @param king {boolean}
     */
    constructor(x, y, sideId, king = false) {
        this.pos = new Pos(x, y)
        this.sideId = sideId
        this.king = king
    }

    /**
     * Returns a copy of this piece with a changed position
     * @param pos {Pos}
     * @return {Piece}
     */
    cloneWithNewPos(pos) {
        return {...this, pos: pos}
    }
}

module.exports = Piece
