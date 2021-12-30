/*
 For convince I store positions in relative units (pos.x == 1 means pos.x is unifiedSize pixels)
 canvas style height = unifiedSize
 canvas style width = WIDTH_RATIO * unifiedSize
 */
function convert(ratio) {
    return unifiedSize * ratio
}
/*
 represents a rectangle.
 x, y -- coords of leftmost topmost corner
 w -- width
 h -- height
 */
function Pos(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.toAbsCord = function () {
        return new Pos(
            convert(this.x),
            convert(this.y),
            convert(this.w),
            convert(this.h)
        )
    }
    this.shift = function (x, y) {
        return new Pos(this.x + x, this.y + y, this.w, this.h)
    }
}