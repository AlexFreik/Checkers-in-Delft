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
    }
}

module.exports = Piece