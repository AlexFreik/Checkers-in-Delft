class Rect {
    constructor(ratioPos, fillStyle, lineWidth, strokeStyle) {
        this.ratioPos = ratioPos
        this.fillStyle = fillStyle
        this.lineWidth = RatioCnvPos.ratioToAbs(lineWidth)
        this.strokeStyle = strokeStyle
    }
    get absCnvPos() {
        return this.ratioPos.toAbsCnvPos()
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
class Font {
    static FONTS_SIZES = {
        small: 10,
        Small: 15,
        middle: 20,
        Middle: 25,
        big: 30,
        Big: 35,
    }
    static DEFAULT_FONT = 'Arial'
    static _getFont(size) {
        return Font.FONTS_SIZES[size] + 'px ' + Font.DEFAULT_FONT
    }
    static get small() {
        return Font._getFont('small')
    }
    static get Small() {
        return Font._getFont('Small')
    }
    static get middle() {
        return Font._getFont('middle')
    }
    static get Middle() {
        return Font._getFont('Middle')
    }
    static get big() {
        return Font._getFont('big')
    }
    static get Big() {
        return Font._getFont('Big')
    }
}

/**
 * One-line text, which is centered in rectangle of pos.
 */
class Text {
    constructor(ratioPos, val, fillStyle, font) {
        this.ratioPos = ratioPos
        this.val = val
        this.fillStyle = fillStyle
        this.font = font
    }
    get absCnvPos() {
        return this.ratioPos.toAbsCnvPos()
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
}

/**
 * represents some drawable entity.
 * @param absCnvPos
 * @param {array} figs -- array of drawable figures (rectangles, texts, etc)
 * @param draw
 * @param {string} state -- whether it is hovered or not
 */
class Elem {
    constructor(ratioPos, figs, draw = this._draw) {
        this.ratioPos = ratioPos
        this.figs = figs
        this.draw = draw
        this.eventListeners = {
            click: [this._onclick],
            mousemove: [],
            resize: [],
            keydown: [],
        }
    }
    get absCnvPos() {
        return this.ratioPos.toAbsCnvPos()
    }
    addEventListener(type, func) {
        this.eventListeners[type].push(func)
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
    _onclick = (event) => {
        for (const fig of this.figs) {
            if (fig.onclick) fig.onclick(event)
        }
    }
}

class Button extends Elem {
    constructor(rect, text) {
        super(rect.ratioPos, [rect, text])
        this.fillStyle = rect.fillStyle
        this.text = text
        this.eventListeners.click.push(() => {
            Button.clickSound.play()
        })
        this.eventListeners.mousemove.push(this._onmousemove)
    }
    static clickSound = (() => {
        const audio = new Audio('../data/click.wav')
        audio.volume = 0.15
        return audio
    })()
    static mute() {
        Button.clickSound.volume = 0
    }
    static unmute() {
        Button.clickSound.volume = 0.15
    }
    _onmousemove = (event) => {
        const mousePos = AbsCnvPos.constructFromEvent(event)
        if (this.absCnvPos.isInside(mousePos.x, mousePos.y)) {
            this.figs[0].fillStyle = 'rgba(0,0,0,0)'
        } else {
            this.figs[0].fillStyle = this.fillStyle
        }
    }
}
function getCornerBtnElem(emoji, { left, down }) {
    const x = left === true ? 0.03 : WIDTH_RATIO - 0.13
    const y = down === true ? 1 - 0.13 : 0.03
    let ratioPos = new RatioCnvPos(x, y, 0.1, 0.1)
    return new Button(
        new Rect(ratioPos, '#3c3f41', 0.01, '#a9abad'),
        new Text(ratioPos, emoji, '#fff', '25px FontAwesome')
    )
}

function getDefaultBtnElem(ratioPos, txtVal) {
    return new Button(
        new Rect(ratioPos, '#3c3f41', 0.01, '#a9abad'),
        new Text(ratioPos, txtVal, '#fff', Font.middle)
    )
}

class AlertMsg extends Elem {
    constructor(titleTxt, bodyTxt, onremove) {
        let ratioPos
        super(
            (ratioPos = new RatioCnvPos(
                0.25 * WIDTH_RATIO,
                0.25,
                0.5 * WIDTH_RATIO,
                0.5
            )),
            [
                new Rect(ratioPos, '#333333', 0.01, '#a9abad'),
                new Text(
                    ratioPos.shift(0, -0.15),
                    titleTxt,
                    '#ddd',
                    Font.Middle
                ),
                new Text(ratioPos.shift(0, 0), bodyTxt, '#ddd', Font.Small),
            ]
        )
        this.onremove = onremove
    }
}
