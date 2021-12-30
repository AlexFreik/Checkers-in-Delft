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
/*
 drawable rectangle with fill and stroke
 */
function Rect(pos, fillStyle, lineWidth, strokeStyle) {
    this.pos = pos
    this.fillStyle = fillStyle
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
    this.draw = function () {
        const absPos = this.pos.toAbsCord()

        ctx.fillStyle = this.fillStyle
        ctx.fillRect(absPos.x, absPos.y, absPos.w, absPos.h)

        ctx.beginPath()
        ctx.rect(absPos.x, absPos.y, absPos.w, absPos.h)
        ctx.lineWidth = convert(this.lineWidth)
        ctx.strokeStyle = this.strokeStyle
        ctx.stroke()
    }
}
/*
 basically a rectangle with animation when hovered
 */
function Button(pos, fillStyle, lineWidth, strokeStyle) {
    this.rect = new Rect(pos, fillStyle, lineWidth, strokeStyle)
    this.fillStyle = fillStyle
    this.draw = function (state) {
        this.rect.fillStyle = state === 'ON' ? 'rgba(0,0,0,0)' : this.fillStyle
        this.rect.draw()
    }
}
/*
 one-line text, which is centered in rectangle of pos
 */
function Text(pos, val, fillStyle, font) {
    this.pos = pos
    this.val = val
    this.fillStyle = fillStyle
    this.font = font
    this.draw = function () {
        const absPos = this.pos.toAbsCord()

        ctx.fillStyle = this.fillStyle
        ctx.font = this.font
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
            this.val,
            absPos.x + absPos.w / 2,
            absPos.y + absPos.h / 2,
            absPos.w
        )
    }
}
/*
 represents some drawable entity.
 figs -- array of drawable figures (rectangles, texts, etc)
 state -- whether it is hovered or not
 */
function Elem(pos, figs, draw, state = 'OFF') {
    this.pos = pos
    this.figs = figs
    this.draw = draw
    if (!this.draw) {
        this.draw = () => {
            for (const fig of this.figs) {
                fig.draw(this.state)
            }
        }
    }
    this.state = state
}
