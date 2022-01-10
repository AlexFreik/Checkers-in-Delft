const gameScreenElems = {
    background: background,
    soundBtn: soundBtn,
    homeBtn: homeBtn,

    board: new Board(new RatioCnvPos((WIDTH_RATIO - 0.8) / 2, 0.1, 0.8, 0.8), 1, '#ddd'),
    turn: new Elem(
        (ratioPos = new RatioCnvPos(0, 0, WIDTH_RATIO, 0.1)),
        [new Text(ratioPos, '', '#ddd', Font.middle)],
        function () {
            this.drawDynamicTxt(0, 'Turn: ' + game.turn)
        }
    ),
    eatenPiecesStat: new Elem(
        (ratioPos = new RatioCnvPos(0, 0, (WIDTH_RATIO - 0.8) / 2, 1)),
        [
            new Text(ratioPos, 'Eaten:', '#ddd', Font.middle),
            new Text(ratioPos.shift(0, 0.05), '', '#ddd', Font.middle),
            new Text(ratioPos.shift(0, 0.1), '', '#ddd', Font.middle),
        ],
        function () {
            this.drawDynamicTxt(1, 'you - ' + game.getEatenPiecesNum(game.sideId))
            this.drawDynamicTxt(2, 'opp - ' + game.getEatenPiecesNum(2 - game.sideId))
        }
    ),
    gameId: new Elem(
        (ratioPos = new RatioCnvPos(0, 0.9, WIDTH_RATIO, 0.1)),
        [new Text(ratioPos, '', '#ddd', Font.middle)],
        function () {
            this.drawDynamicTxt(0, 'gameId: ' + game.gameId)
        }
    ),
}
gameScreenElems.board.addEventListener('click', (event) => {
    gameScreenElems.board.processClick(AbsCnvPos.constructFromEvent(event))
})

homeBtn.addEventListener('click', () => {
  console.log(currScreenElems, gameScreenElems)
})
