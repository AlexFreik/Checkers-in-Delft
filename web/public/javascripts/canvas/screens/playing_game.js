const gameScreenElems = {
    background: background,
    soundBtn: soundBtn,
    adviceBtn: getCornerBtnElem('\uf0eb', { left: false, down: true }),
    homeBtn: homeBtn,
    undoBtn: getCornerBtnElem('\uf0e2', { left: true, down: true }),

    board: new Elem(
        (pos = new RatioCnvPos(
            (WIDTH_RATIO - (1 - 0.1 * 2)) / 2,
            0.1,
            1 - 0.1 * 2,
            1 - 0.1 * 2
        ).toAbsCnvPos()),
        [new Board(pos, 1, '#ddd')]
    ),
}

const board = gameScreenElems.board.figs[0]


gameScreenElems.board.onclick = (event) => {
    board.processClick(AbsCnvPos.constructFromEvent(event))
}
