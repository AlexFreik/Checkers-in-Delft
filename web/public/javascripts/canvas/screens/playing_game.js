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

    turn: new Elem(
        (ratioPos = new RatioCnvPos(0, 0, WIDTH_RATIO, 0.1)),
        [new Text(ratioPos, '', '#ddd', '20px Arial')],
        function () {
            this.figs[0].val = 'Turn: ' + '"' + game.turn + '"'
            this.figs[0].draw()
        }
    ),
    eatenPiecesStat: new Elem(
        (ratioPos = new RatioCnvPos(WIDTH_RATIO - 0.15, 0, 0.1, 1)),
        [
            new Text(ratioPos, 'Eaten:', '#ddd', '20px Arial'),
            new Text(ratioPos.shift(0, 0.05), '', '#ddd', '20px Arial'),
            new Text(ratioPos.shift(0, 0.1), '', '#ddd', '20px Arial'),
        ],
        function () {
            this.figs[1].val = '"1" - ' + game.getEatenPiecesNum(Setup.PLAYER_0)
            this.figs[2].val = '"2" - ' + game.getEatenPiecesNum(Setup.PLAYER_1)

            this.figs[0].draw()
            this.figs[1].draw()
            this.figs[2].draw()
        }
    ),
}

const board = gameScreenElems.board

gameScreenElems.board.onclick = (event) => {
    board.processClick(AbsCnvPos.constructFromEvent(event))
}
