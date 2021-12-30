function convert(ratio) {
    return unifiedSize * ratio
}

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
function Button(pos, fillStyle, lineWidth, strokeStyle) {
    this.rect = new Rect(pos, fillStyle, lineWidth, strokeStyle)
    this.fillStyle = fillStyle
    this.draw = function (state) {
        this.rect.fillStyle = state === 'ON' ? 'rgba(0,0,0,0)' : this.fillStyle
        this.rect.draw()
    }
}
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

function addInput(pos) {
    const input = document.createElement('input')

    input.id = 'gameID'
    input.type = 'text'
    input.style.position = 'absolute'
    input.style.left = pos.x + 'px'
    input.style.top = pos.y + 'px'
    input.style.width = Math.floor(pos.w) + 'px'
    input.style.height = Math.floor(pos.h) + 'px'

    input.style.background = 'rgba(0,0,0,0)'
    input.style.color = '#eee'
    input.style['font-size'] = '25px'
    input.onkeydown = function handleEnter(event) {
        if (event.key === 'Enter') {
            document.body.removeChild(this)
            game = new Game('ON') // TODO
            elems = gameScreenElems
            requestAnimationFrame(drawScreen)
        }
    }

    document.body.appendChild(input)
}

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

function getCornerBtnElem(emoji, { left, down }) {
    const x = left === true ? 0.03 : WIDTH_RATIO - 0.13
    const y = down === true ? 1 - 0.13 : 0.03
    return new Elem((pos = new Pos(x, y, 0.1, 0.1)), [
        new Button(pos, '#3c3f41', 0.01, '#a9abad'),
        new Text(pos, emoji, '#fff', '25px FontAwesome'),
    ])
}
