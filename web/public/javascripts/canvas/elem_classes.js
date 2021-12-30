class Rect {
    constructor(absCnvPos, fillStyle, lineWidth, strokeStyle) {
        this.absCnvPos = absCnvPos
        this.fillStyle = fillStyle
        this.lineWidth = lineWidth
        this.strokeStyle = strokeStyle
    }
    draw = () => {
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
    constructor(pos, fillStyle, lineWidth, strokeStyle) {
        this.rect = new Rect(pos, fillStyle, lineWidth, strokeStyle)
        this.fillStyle = fillStyle
    }
    draw = (state) => {
        this.rect.fillStyle = state === 'ON' ? 'rgba(0,0,0,0)' : this.fillStyle
        this.rect.draw()
    }
}
function getCornerBtnElem(emoji, { left, down }) {
    const x = left === true ? 0.03 : WIDTH_RATIO - 0.13
    const y = down === true ? 1 - 0.13 : 0.03
    return new Elem((pos = new RatioCnvPos(x, y, 0.1, 0.1).toAbsCnvPos()), [
        new Button(pos, '#3c3f41', convertRatioToAbs(0.01), '#a9abad'),
        new Text(pos, emoji, '#fff', '25px FontAwesome'),
    ])
}
function getDefaultBtnElem(pos, txtVal) {
    return new Elem(pos, [
        new Button(pos, '#3c3f41', convertRatioToAbs(0.01), '#a9abad'),
        new Text(pos, txtVal, '#fff', '20px Arial'),
    ])
}

/**
 * One-line text, which is centered in rectangle of pos.
 */
class Text {
    constructor(absCnvPos, val, fillStyle, font) {
        this.absCnvPos = absCnvPos
        this.val = val
        this.fillStyle = fillStyle
        this.font = font
    }
    draw = () => {
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

/**
 * represents some drawable entity.
 * @param absCnvPos
 * @param {array} figs -- array of drawable figures (rectangles, texts, etc)
 * @param draw
 * @param {string} state -- whether it is hovered or not
 */
class Elem {
    constructor(absCnvPos, figs, draw, state = 'OFF') {
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
}
