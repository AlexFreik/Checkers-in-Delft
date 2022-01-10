/**
 * Represents a rectangle.
 * @param {number} x, y -- coords of leftmost topmost corner
 * @param {number} w -- width
 * @param {number} h -- height
 */
class Pos {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    /**
     * @param {number} x
     * @param {number} y
     */
    isInside(x, y) {
        return this.x <= x && x <= this.x + this.w && this.y <= y && y <= this.y + this.h
    }
}

class RatioCnvPos extends Pos {
    static unifiedSize = 500
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }

    /**
     * @return {AbsCnvPos}
     */
    toAbsCnvPos() {
        return new AbsCnvPos(
            RatioCnvPos.ratioToAbs(this.x),
            RatioCnvPos.ratioToAbs(this.y),
            RatioCnvPos.ratioToAbs(this.w),
            RatioCnvPos.ratioToAbs(this.h)
        )
    }

    /**
     * @param {number} ratio
     * @return {number}
     */
    static ratioToAbs(ratio) {
        return RatioCnvPos.unifiedSize * ratio
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @return {RatioCnvPos}
     */
    shift(x, y) {
        return new RatioCnvPos(this.x + x, this.y + y, this.w, this.h)
    }
}

class AbsCnvPos extends Pos {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }

    /**
     * @return {RatioCnvPos}
     */
    toRatioCnvPos() {
        const us = RatioCnvPos.unifiedSize
        return new RatioCnvPos(this.x / us, this.y / us, this.w / us, this.h / us)
    }

    /**
     * @return {AbsPagePos}
     */
    toAbsPagePos() {
        const rect = canvas.getBoundingClientRect()
        return new AbsPagePos(
            this.x + rect.left + window.scrollX - 1,
            this.y + rect.top + window.scrollY - 2,
            this.w,
            this.h
        )
    }

    /**
     * @param {event} evt
     * @return {AbsCnvPos}
     */
    static constructFromEvent(evt) {
        const rect = canvas.getBoundingClientRect()
        return new AbsCnvPos(evt.clientX - rect.left, evt.clientY - rect.top, 0, 0)
    }
}

/**
 * Pos with x, y relative to page (like pageX, pageY)
 */
class AbsPagePos extends Pos {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }
}

/**
 * Pos with x, y relative to page (like clientX, clientY)
 */
function AbsClientPos(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
}
