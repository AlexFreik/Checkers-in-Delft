
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
