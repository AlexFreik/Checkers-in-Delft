const gameScreenElems = {
    background: background,
    soundBtn: soundBtn,
    homeBtn: homeBtn,

    board: new Board(
        new RatioCnvPos(
            (WIDTH_RATIO - (1 - 0.1 * 2)) / 2,
            0.1,
            1 - 0.1 * 2,
            1 - 0.1 * 2
        ),
        1,
        '#ddd'
    ),
}

const board = gameScreenElems.board

gameScreenElems.board.onclick = (event) => {
    board.processClick(AbsCnvPos.constructFromEvent(event))
}
