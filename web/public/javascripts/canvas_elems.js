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
function Grid(pos, n, lineWidth, strokeStyle) {
    this.pos = pos
    this.n = n // n -- number of rows & columns
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle

    this.draw = function () {
        const absPos = this.pos.toAbsCord()

        for (let x = 0; x <= absPos.w; x += absPos.w / this.n) {
            ctx.moveTo(absPos.x + x, absPos.y)
            ctx.lineTo(absPos.x + x, absPos.y + absPos.h)
        }

        for (let y = 0; y <= absPos.h; y += absPos.h / this.n) {
            ctx.moveTo(absPos.x, absPos.y + y)
            ctx.lineTo(absPos.x + absPos.w, absPos.y + y)
        }

        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.strokeStyle
        ctx.stroke()
    }
}
function Elem(pos, figs, draw, state = 'OFF') {
    this.pos = pos
    this.figs = figs
    this.state = state
    this.draw = draw
    if (!this.draw)
        this.draw = () => {
            for (const fig of this.figs) {
                fig.draw(this.state)
            }
        }
}

// pos vals is ratios is related to unifiedSize (canvas height)
const homeScreenElems = {
    background: new Elem(
        (pos = new Pos(0 * WIDTH_RATIO, 0, 1 * WIDTH_RATIO, 1)),
        [new Rect(pos, '#333333', 0.01, '#a9abad')]
    ),
    createGameBtn: new Elem(
        (pos = new Pos(0.35 * WIDTH_RATIO, 0.6, 0.3 * WIDTH_RATIO, 0.1)),
        [
            new Button(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'Create New Game', '#fff', '20px Arial'),
        ]
    ),
    joinGameBtn: new Elem(
        (pos = new Pos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1)),
        [
            new Button(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'Join Existing Game', '#fff', '20px Arial'),
        ]
    ),
    titleDesc: new Elem(
        (pos = new Pos(0.15 * WIDTH_RATIO, 0.1, 0.7 * WIDTH_RATIO, 0.45)),
        [
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'THE BEST CHECKERS IN DELFT', '#fff', '25px Arial'),
        ]
    ),
}
const gameScreenElems = {
    background: new Elem(
        (pos = new Pos(0 * WIDTH_RATIO, 0, 1 * WIDTH_RATIO, 1)),
        [new Rect(pos, '#333333', 0.01, '#a9abad')]
    ),

    settingsBtn: new Elem((pos = new Pos(WIDTH_RATIO - 0.13, 0.03, 0.1, 0.1)), [
        new Button(pos, '#3c3f41', 0.01, '#a9abad'),
        new Text(pos, '\uf013', '#fff', '25px FontAwesome'),
    ]),
    adviceBtn: new Elem(
        (pos = new Pos(WIDTH_RATIO - 0.13, 1 - 0.13, 0.1, 0.1)),
        [
            new Button(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, '\uf0eb', '#fff', '25px FontAwesome'),
        ]
    ),
    homeBtn: new Elem((pos = new Pos(0.03, 0.03, 0.1, 0.1)), [
        new Button(pos, '#3c3f41', 0.01, '#a9abad'),
        new Text(pos, '\uf015', '#fff', '25px FontAwesome'),
    ]),
    undoBtn: new Elem((pos = new Pos(0.03, 1 - 0.13, 0.1, 0.1)), [
        new Button(pos, '#3c3f41', 0.01, '#a9abad'),
        new Text(pos, '\uf0e2', '#fff', '25px FontAwesome'),
    ]),

    descGrid: new Elem(
        (pos = new Pos(
            (WIDTH_RATIO - (1 - 0.1 * 2)) / 2,
            0.1,
            1 - 0.1 * 2,
            1 - 0.1 * 2
        )),
        [new Grid(pos, 8, 1, '#ddd')]
    ),
}

let elems = homeScreenElems
