const homeScreenElems = {
    background: background,
    soundBtn: soundBtn,
    createGameBtn: getDefaultBtnElem(
        new RatioCnvPos(0.35 * WIDTH_RATIO, 0.6, 0.3 * WIDTH_RATIO, 0.1),
        'Create New Game'
    ),
    joinGameBtn: getDefaultBtnElem(
        new RatioCnvPos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1),
        'Join Existing Game'
    ),
    titleDesc: new Elem(
        (ratioPos = new RatioCnvPos(
            0.15 * WIDTH_RATIO,
            0.1,
            0.7 * WIDTH_RATIO,
            0.45
        )),
        [
            new Rect(ratioPos, '#3c3f41', 0.01, '#a9abad'),
            new Text(
                ratioPos.shift(0, -0.1),
                'THE BEST CHECKERS IN DELFT',
                '#fff',
                '25px Arial'
            ),
            new Text(
                ratioPos.shift(0, -0.1),
                'THE BEST CHECKERS IN DELFT',
                '#fff',
                '25px Arial'
            ),
            new Text(
                ratioPos.shift(0, 0.03),
                'finished games: ',
                '#fff',
                '20px Arial'
            ),
            new Text(
                ratioPos.shift(0, 0.1),
                'in progress games: ',
                '#fff',
                '20px Arial'
            ),
            new Text(
                ratioPos.shift(0, 0.17),
                'some third stat: ',
                '#fff',
                '20px Arial'
            ),
        ]
    ),
}

let currScreenElems = homeScreenElems

homeScreenElems.createGameBtn.onclick = () => {
    currScreenElems = createGameScreenElems
}
homeScreenElems.joinGameBtn.onclick = () => {
    addGameIdInput(joiningScreenElems.fieldID.absCnvPos.toAbsPagePos())
    currScreenElems = joiningScreenElems
}
