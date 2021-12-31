/**
 * Represents a rectangle.
 * @param {number} x, y -- coords of leftmost topmost corner
 * @param {number} w -- width
 * @param {number} h -- height
 */
class Pos {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    isInside(x, y) {
        return (
            this.x <= x &&
            x <= this.x + this.w &&
            this.y <= y &&
            y <= this.y + this.h
        )
    }
}

class RatioCnvPos extends Pos {
    static unifiedSize = 500
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }
    toAbsCnvPos() {
        return new AbsCnvPos(
            RatioCnvPos.ratioToAbs(this.x),
            RatioCnvPos.ratioToAbs(this.y),
            RatioCnvPos.ratioToAbs(this.w),
            RatioCnvPos.ratioToAbs(this.h)
        )
    }
    static ratioToAbs(ratio) {
        return RatioCnvPos.unifiedSize * ratio
    }
    shift(x, y) {
        return new RatioCnvPos(this.x + x, this.y + y, this.w, this.h)
    }
}

class AbsCnvPos extends Pos {
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }
    toAbsPagePos() {
        const rect = canvas.getBoundingClientRect()
        return new AbsPagePos(
            this.x + rect.left + window.scrollX,
            this.y + rect.top + window.scrollY,
            this.w,
            this.h
        )
    }
    static constructFromEvent(evt) {
        const rect = canvas.getBoundingClientRect()
        return new AbsCnvPos(
            evt.clientX - rect.left,
            evt.clientY - rect.top,
            0,
            0
        )
    }
}

/**
 * Pos with x, y relative to page (like pageX, pageY)
 */
class AbsPagePos extends Pos {
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }
}
