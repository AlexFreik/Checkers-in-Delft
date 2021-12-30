/*
 represents a rectangle.
 x, y -- coords of leftmost topmost corner
 w -- width
 h -- height
 */
class Pos {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    shift(x, y) {
        return new Pos(this.x + x, this.y + y, this.w, this.h)
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

let unifiedSize = 500
function convertRatioToAbs(ratio) {
    return unifiedSize * ratio
}
class RatioCnvPos extends Pos {
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }
    toAbsCnvPos() {
        return new AbsCnvPos(
            convertRatioToAbs(this.x),
            convertRatioToAbs(this.y),
            convertRatioToAbs(this.w),
            convertRatioToAbs(this.h)
        )
    }
}

class AbsCnvPos extends Pos {
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }
    /*
     translates position, which is relative to canvas to coords, relative to page (like pageX, pageY)
     */
    toAbsPagePos() {
        const rect = canvas.getBoundingClientRect() // abs. size of element
        return new AbsPagePos(
            this.x + rect.left + window.scrollX,
            this.y + rect.top + window.scrollY,
            this.w,
            this.h
        )
    }
    static constructFromEvent(evt) {
        const rect = canvas.getBoundingClientRect() // abs. size of element
        return new AbsCnvPos(
            evt.clientX - rect.left,
            evt.clientY - rect.top,
            0,
            0
        )
    }
}

class AbsPagePos extends Pos {
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }
}
