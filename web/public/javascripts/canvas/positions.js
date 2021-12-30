/*
 For convince I store positions in relative units (pos.x == 1 means pos.x is unifiedSize pixels)
 canvas style height = unifiedSize
 canvas style width = WIDTH_RATIO * unifiedSize
 */
function convertRatioToAbs(ratio) {
    return unifiedSize * ratio
}
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
}

let unifiedSize = 500
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

class AbsCnvPos extends Pos{
    constructor(x, y, w, h) {
        super(x, y, w, h)
    }
}
