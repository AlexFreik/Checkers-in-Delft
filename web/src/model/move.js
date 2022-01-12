class Move {
    /**
     * @param pos {Pos}
     * @param eating {Piece=}
     */
    constructor(pos, eating) {
        this.target = pos
        this.eating = eating
    }
}

module.exports = Move
