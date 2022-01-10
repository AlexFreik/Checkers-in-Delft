class Rect {
    /**
     *
     * @param {RatioCnvPos} ratioPos
     * @param {string} fillStyle
     * @param {number} lineWidth
     * @param {string} strokeStyle
     */
    constructor(ratioPos, fillStyle, lineWidth, strokeStyle) {
        this.ratioPos = ratioPos
        this.fillStyle = fillStyle
        this.lineWidth = RatioCnvPos.ratioToAbs(lineWidth)
        this.strokeStyle = strokeStyle
    }
    get absCnvPos() {
        return this.ratioPos.toAbsCnvPos()
    }
    draw = () => {
        ctx.fillStyle = this.fillStyle
        ctx.fillRect(this.absCnvPos.x, this.absCnvPos.y, this.absCnvPos.w, this.absCnvPos.h)

        ctx.beginPath()
        ctx.rect(this.absCnvPos.x, this.absCnvPos.y, this.absCnvPos.w, this.absCnvPos.h)
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
    static DEFAULT_COLOR = '#ddd'

    /**
     *
     * @param {string} size
     * @return {string}
     * @private
     */
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
    /**
     *
     * @param {RatioCnvPos} ratioPos
     * @param {string} val
     * @param {string} fillStyle
     * @param {string} font
     */
    constructor(ratioPos, val, fillStyle, font) {
        this.ratioPos = ratioPos
        this.val = val
        this.fillStyle = fillStyle
        this.font = font
    }
    get absCnvPos() {
        return this.ratioPos.toAbsCnvPos()
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
