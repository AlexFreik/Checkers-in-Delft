class Move {
    /**
     * @param pos {Pos}
     * @param eating {Piece=}
     */
    constructor(pos, eating) {
        this.pos = pos
        this.eating = eating
    }
}

module.exports = Move
