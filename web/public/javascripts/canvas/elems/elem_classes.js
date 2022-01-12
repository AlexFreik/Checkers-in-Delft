class Elem {
    /**
     * Represents some drawable entity.
     * @param {RatioCnvPos} ratioPos
     * @param {array} figs -- array of drawable figures (rectangles, texts, etc)
     * @param {function=} draw
     */
    constructor(ratioPos, figs, draw) {
        this.ratioPos = ratioPos
        this.figs = figs
        this.draw = draw
            ? draw
            : () => {
                  this._draw()
              }
        this.eventListeners = {
            click: [
                (event) => {
                    this._listen('click', event)
                },
            ],
            mousemove: [
                (event) => {
                    this._listen('mousemove', event)
                },
            ],
            resize: [
                (event) => {
                    this._listen('resize', event)
                },
            ],
            keydown: [
                (event) => {
                    this._listen('keydown', event)
                },
            ],
        }
    }
    get absCnvPos() {
        return this.ratioPos.toAbsCnvPos()
    }

    /**
     *
     * @param {string} type
     * @param {function} func
     */
    addEventListener = (type, func) => {
        this.eventListeners[type].push(func)
    }
    _draw = () => {
        for (const fig of this.figs) {
            fig.draw()
        }
    }
    drawDynamicTxt = (id, txtVal) => {
        this.figs[id].val = txtVal
        this._draw()
    }
    _listen(type, event) {
        for (const fig of this.figs) {
            if (fig.eventListeners) for (const listener of fig.eventListeners[type]) listener(event)
        }
    }
}

class Button extends Elem {
    constructor(rect, text) {
        super(rect.ratioPos, [rect, text])
        this.fillStyle = rect.fillStyle
        this.text = text
        this.eventListeners.click.push(() => {
            Button.clickSound.play().catch((e) => console.log(e))
        })
        this.eventListeners.mousemove.push(this._onmousemove)
    }
    static clickSound = (() => {
        const audio = new Audio('../data/click.wav')
        audio.volume = 0.15
        return audio
    })()
    static mute = () => {
        Button.clickSound.volume = 0
    }
    static unmute = () => {
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
        new Text(ratioPos, txtVal, Font.DEFAULT_COLOR, Font.middle)
    )
}

class AlertMsg extends Elem {
    /**
     *
     * @param {string} titleTxt
     * @param {string} bodyTxt
     * @param {function} onaccept
     */
    constructor(titleTxt, bodyTxt, onaccept) {
        let ratioPos = new RatioCnvPos(0.25 * WIDTH_RATIO, 0.25, 0.5 * WIDTH_RATIO, 0.5)
        let buttonRatioPos = new RatioCnvPos(0.4 * WIDTH_RATIO, 0.6, 0.2 * WIDTH_RATIO, 0.1)
        super(buttonRatioPos, [
            new Rect(ratioPos, '#333333', 0.01, '#a9abad'),
            getDefaultBtnElem(buttonRatioPos, 'OK'),
            new Text(ratioPos.shift(0, -0.15), titleTxt, '#ddd', Font.Middle),
            new Text(ratioPos.shift(0, 0), bodyTxt, '#ddd', Font.Small),
        ])
        this.figs[1].addEventListener('click', () => {
            delete currScreenElems.alertMsg
            onaccept()
        })
    }
}
