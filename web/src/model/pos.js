class Pos {
    /**
     * Creates position object
     * @param x {number}
     * @param y {number}
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /**
     * @param other {Pos}
     * @return {boolean}
     */
    equals(other) {
        return this.x === other.x && this.y === other.y
    }

    /**
     * Returns a position this+other
     * @param other {Pos}
     * @return {Pos}
     */
    plus(other) {
        return new Pos(this.x + other.x, this.y + other.y)
    }
}

module.exports = Pos
