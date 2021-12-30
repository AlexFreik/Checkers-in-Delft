// pos vals is ratios is related to unifiedSize (canvas height)
function getDefaultBtnElem(pos, txtVal) {
    return new Elem(pos, [
        new Button(pos, '#3c3f41', 0.01, '#a9abad'),
        new Text(pos, txtVal, '#fff', '20px Arial'),
    ])
}
const background = new Elem((pos = new Pos(0, 0, WIDTH_RATIO, 1)), [
    new Rect(pos, '#333333', 0.01, '#a9abad'),
])
const soundBtn = getCornerBtnElem('\uf028', { left: false, down: false })
const homeBtn = getCornerBtnElem('\uf015', { left: true, down: false })

const homeScreenElems = {
    background: background,
    soundBtn: soundBtn,
    createGameBtn: getDefaultBtnElem(
        new Pos(0.35 * WIDTH_RATIO, 0.6, 0.3 * WIDTH_RATIO, 0.1),
        'Create New Game'
    ),
    joinGameBtn: getDefaultBtnElem(
        new Pos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1),
        'Join Existing Game'
    ),
    titleDesc: new Elem(
        (pos = new Pos(0.15 * WIDTH_RATIO, 0.1, 0.7 * WIDTH_RATIO, 0.45)),
        [
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, 'THE BEST CHECKERS IN DELFT', '#fff', '25px Arial'),
        ]
    ),
}

const gameSettingElems = {
    background: background,
    soundBtn: soundBtn,
    homeBtn: homeBtn,
    forceJumpsChoseBtn: getDefaultBtnElem(
        (pos = new Pos(
            ((1 - 0.15) * WIDTH_RATIO) / 2,
            0.6,
            0.15 * WIDTH_RATIO,
            0.05
        )),
        'ON'
    ),
    startBtn: getDefaultBtnElem(
        (pos = new Pos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1)),
        'Start'
    ),
}

const gameChoosingElem = {
    background: background,
    homeBtn: homeBtn,
    soundBtn: soundBtn,

    fieldID: new Elem(
        (pos = new Pos(0.35 * WIDTH_RATIO, 0.5, 0.3 * WIDTH_RATIO, 0.1)),
        [
            new Rect(pos, '#3c3f41', 0.01, '#a9abad'),
            new Text(pos, '', '#fff', '25px Arial'),
            new Text(pos.shift(0, -0.1), 'Game ID:', '#fff', '25px Arial'),
        ]
    ),
}

const gameScreenElems = {
    background: background,
    soundBtn: soundBtn,
    adviceBtn: getCornerBtnElem('\uf0eb', { left: false, down: true }),
    homeBtn: homeBtn,
    undoBtn: getCornerBtnElem('\uf0e2', { left: true, down: true }),

    board: new Elem(
        (pos = new Pos(
            (WIDTH_RATIO - (1 - 0.1 * 2)) / 2,
            0.1,
            1 - 0.1 * 2,
            1 - 0.1 * 2
        )),
        [new Board(pos, 1, '#ddd')]
    ),
}

const board = gameScreenElems.board.figs[0]
let elems = homeScreenElems
