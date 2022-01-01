class Rect {
    constructor(ratioPos, fillStyle, lineWidth, strokeStyle) {
        this.absCnvPos = ratioPos.toAbsCnvPos()
        this.fillStyle = fillStyle
        this.lineWidth = RatioCnvPos.ratioToAbs(lineWidth)
        this.strokeStyle = strokeStyle
    }
    draw() {
        ctx.fillStyle = this.fillStyle
        ctx.fillRect(
            this.absCnvPos.x,
            this.absCnvPos.y,
            this.absCnvPos.w,
            this.absCnvPos.h
        )

        ctx.beginPath()
        ctx.rect(
            this.absCnvPos.x,
            this.absCnvPos.y,
            this.absCnvPos.w,
            this.absCnvPos.h
        )
        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.strokeStyle
        ctx.stroke()
    }
}
class Button {
    constructor(ratioPos, fillStyle, lineWidth, strokeStyle) {
        this.rect = new Rect(ratioPos, fillStyle, lineWidth, strokeStyle)
        this.fillStyle = fillStyle
    }
    draw(state) {
        this.rect.fillStyle = state === 'ON' ? 'rgba(0,0,0,0)' : this.fillStyle
        this.rect.draw()
    }
    onclick() {
        clickSound.play()
    }
}
function getCornerBtnElem(emoji, { left, down }) {
    const x = left === true ? 0.03 : WIDTH_RATIO - 0.13
    const y = down === true ? 1 - 0.13 : 0.03
    let ratioPos
    return new Elem((ratioPos = new RatioCnvPos(x, y, 0.1, 0.1)), [
        new Button(ratioPos, '#3c3f41', 0.01, '#a9abad'),
        new Text(ratioPos, emoji, '#fff', '25px FontAwesome'),
    ])
}
function getDefaultBtnElem(ratioPos, txtVal) {
    return new Elem(ratioPos, [
        new Button(ratioPos, '#3c3f41', 0.01, '#a9abad'),
        new Text(ratioPos, txtVal, '#fff', '20px Arial'),
    ])
}

/**
 * One-line text, which is centered in rectangle of pos.
 */
class Text {
    constructor(ratioPos, val, fillStyle, font) {
        this.absCnvPos = ratioPos.toAbsCnvPos()
        this.val = val
        this.fillStyle = fillStyle
        this.font = font
    }
    draw() {
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
    dynamicDraw(state, val) {
        this.val = val
        this.draw()
    }
}

/**
 * represents some drawable entity.
 * @param absCnvPos
 * @param {array} figs -- array of drawable figures (rectangles, texts, etc)
 * @param draw
 * @param {string} state -- whether it is hovered or not
 */
class Elem {
    constructor(relPos, figs, draw = this._draw, state = 'OFF') {
        this.absCnvPos = relPos.toAbsCnvPos()
        this.figs = figs
        this.draw = draw
        this.state = state
    }
    _draw() {
        for (const fig of this.figs) {
            fig.draw(this.state)
        }
    }
    drawDynamicTxt(id, txtVal) {
        this.figs[id].val = txtVal
        this._draw()
    }
}
