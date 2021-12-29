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
    this.draw = function (state = 'OFF') {
        const absPos = this.pos.toAbsCord()

        if (state !== 'ON') {
            ctx.fillStyle = this.fillStyle
            ctx.fillRect(absPos.x, absPos.y, absPos.w, absPos.h)
        }
        ctx.beginPath()
        ctx.rect(absPos.x, absPos.y, absPos.w, absPos.h)
        ctx.lineWidth = convert(this.lineWidth)
        ctx.strokeStyle = this.strokeStyle
        ctx.stroke()
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
function Elem(pos, figs, state, draw) {
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
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'Create New Game', '#fff', '20px Arial'),
        ],
        'OFF'
    ),
    joinGameBtn: new Elem(
        (pos = new Pos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1)),
        [
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'Join Existing Game', '#fff', '20px Arial'),
        ],
        'OFF'
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
    settingsBtn: new Elem(
        (pos = new Pos(WIDTH_RATIO - 0.13, 0.03, 0.1, 0.1)),
        [
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, '\uf013', '#fff', '25px FontAwesome'),
        ],
        'OFF'
    ),
    adviceBtn: new Elem(
        (pos = new Pos(WIDTH_RATIO - 0.13, 1 - 0.13, 0.1, 0.1)),
        [
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, '\uf0eb', '#fff', '25px FontAwesome'),
        ],
        'OFF'
    ),
    homeBtn: new Elem(
        (pos = new Pos(0.03, 0.03, 0.1, 0.1)),
        [
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, '\uf015', '#fff', '25px FontAwesome'),
        ],
        'OFF'
    ),
    undoBtn: new Elem(
        (pos = new Pos(0.03, 1 - 0.13, 0.1, 0.1)),
        [
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, '\uf0e2', '#fff', '25px FontAwesome'),
        ],
        'OFF'
    ),
}

let elems = homeScreenElems
