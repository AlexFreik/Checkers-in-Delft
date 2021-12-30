
/*
 drawable rectangle with fill and stroke
 */
function Rect(absCnvPos, fillStyle, lineWidth, strokeStyle) {
    this.absCnvPos = absCnvPos
    this.fillStyle = fillStyle
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
    this.draw = function () {
        ctx.fillStyle = this.fillStyle
        ctx.fillRect(this.absCnvPos.x, this.absCnvPos.y, this.absCnvPos.w, this.absCnvPos.h)

        ctx.beginPath()
        ctx.rect(this.absCnvPos.x, this.absCnvPos.y, this.absCnvPos.w, this.absCnvPos.h)
        ctx.lineWidth = this.lineWidth
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
function Text(absCnvPos, val, fillStyle, font) {
    this.absCnvPos = absCnvPos
    this.val = val
    this.fillStyle = fillStyle
    this.font = font
    this.draw = function () {
        ctx.fillStyle = this.fillStyle
        ctx.font = this.font
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
            this.val,
            this.absCnvPos.x + this.absCnvPos.w / 2,
            this.absCnvPos.y + this.absCnvPos.h / 2,
            this.absCnvPos.w
        )
    }
}
/*
 represents some drawable entity.
 figs -- array of drawable figures (rectangles, texts, etc)
 state -- whether it is hovered or not
 */
function Elem(absCnvPos, figs, draw, state = 'OFF') {
    this.absCnvPos = absCnvPos
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
