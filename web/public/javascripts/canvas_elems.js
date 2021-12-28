function convert(ratio) {
    const dpr = window.devicePixelRatio || 1
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
function Text(val, fillStyle, font) {
    this.val = val
    this.fillStyle = fillStyle
    this.font = font
}
function Elem(pos, state, fillStyle, lineWidth, strokeStyle, text) {
    this.pos = pos
    this.state = state
    this.fillStyle = fillStyle
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
    this.text = text
}
const elementsRectRatios = {
    titleDesc: { x: 0.15, y: 0.1, w: 0.7, h: 0.5 },
}

// pos.x == 0 at the center of window
// pos vals is ratios is related to unifiedSize (canvas height)
const elems = {
    background: new Elem(
        new Pos(0 * WIDTH_RATIO, 0, 1 * WIDTH_RATIO, 1),
        'OFF',
        '#333333',
        0.01,
        '#a9abad'
    ),
    createGameBtn: new Elem(
        new Pos(0.35 * WIDTH_RATIO, 0.6, 0.3 * WIDTH_RATIO, 0.1),
        'OFF',
        '#3c3f41',
        0.01,
        '#a9abad',
        (text = new Text('Create New Game', '#fff', '20px Arial')),
    ),
    joinGameBtn: new Elem(
        new Pos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1),
        'OFF',
        '#3c3f41',
        0.01,
        '#a9abad',
        (text = new Text('Join Existing Game', '#fff', '20px Arial'))
    ),
    titleDesc: new Elem(
        new Pos(0.15 * WIDTH_RATIO, 0.1, 0.7 * WIDTH_RATIO, 0.45),
        'OFF',
        '#3c3f41',
        0.01,
        '#a9abad',
        (text = new Text('THE BEST CHECKERS IN DELFT', '#fff', '25px Arial'))
    ),
    settingsBtn: new Elem(
        new Pos(WIDTH_RATIO - 0.13, 0.03, 0.1, 0.1),
        'OFF',
        '#3c3f41',
        0.01,
        '#a9abad',
        (text = new Text('\uf013', '#fff', '25px FontAwesome'))
    ),
    adviceBtn: new Elem(
        new Pos(WIDTH_RATIO - 0.13, 1 - 0.13, 0.1, 0.1),
        'OFF',
        '#3c3f41',
        0.01,
        '#a9abad',
        (text = new Text('\uf0eb', '#fff', '25px FontAwesome'))
    ),
    homeBtn: new Elem(
        new Pos(0.03, 0.03, 0.1, 0.1),
        'OFF',
        '#3c3f41',
        0.01,
        '#a9abad',
        (text = new Text('\uf015', '#fff', '25px FontAwesome'))
    ),
    undoBtn: new Elem(
        new Pos(0.03, 1 - 0.13, 0.1, 0.1),
        'OFF',
        '#3c3f41',
        0.01,
        '#a9abad',
        (text = new Text('\uf0e2', '#fff', '25px FontAwesome'))
    ),
}

function drawRect(ctx, elem) {
    const absPos = elem.pos.toAbsCord()

    if (elem.state === 'OFF') {
        ctx.fillStyle = elem.fillStyle
        ctx.fillRect(absPos.x, absPos.y, absPos.w, absPos.h)
    }

    if (elem.text) {
        ctx.fillStyle = elem.text.fillStyle
        ctx.font = elem.text.font
        ctx.textAlign = "center"
        ctx.textBaseline = 'middle'
        ctx.fillText(elem.text.val, absPos.x + absPos.w / 2, absPos.y + absPos.h / 2, absPos.w)
    }

    ctx.beginPath()
    ctx.rect(absPos.x, absPos.y, absPos.w, absPos.h)
    ctx.lineWidth = convert(elem.lineWidth)
    ctx.strokeStyle = elem.strokeStyle
    ctx.stroke()
}
