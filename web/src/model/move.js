class Move {
    /**
     * @param target {Pos}
     * @param eating {Piece=}
     */
    constructor(target, eating) {
        this.target = target
        this.eating = eating
    }
}

module.exports = Move
