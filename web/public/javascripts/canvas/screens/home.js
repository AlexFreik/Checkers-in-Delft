const homeScreenElems = {
    background: background,
    soundBtn: soundBtn,
    createGameBtn: getDefaultBtnElem(
        new RatioCnvPos(
            0.35 * WIDTH_RATIO,
            0.6,
            0.3 * WIDTH_RATIO,
            0.1
        ).toAbsCnvPos(),
        'Create New Game'
    ),
    joinGameBtn: getDefaultBtnElem(
        new RatioCnvPos(
            0.35 * WIDTH_RATIO,
            0.75,
            0.3 * WIDTH_RATIO,
            0.1
        ).toAbsCnvPos(),
        'Join Existing Game'
    ),
    titleDesc: new Elem(
        (pos = new RatioCnvPos(
            0.15 * WIDTH_RATIO,
            0.1,
            0.7 * WIDTH_RATIO,
            0.45
        ).toAbsCnvPos()),
        [
            new Rect(pos, '#3c3f41', convertRatioToAbs(0.01), '#a9abad'),
            new Text(pos, 'THE BEST CHECKERS IN DELFT', '#fff', '25px Arial'),
        ]
    ),
}

let currScreenElems = homeScreenElems


homeScreenElems.createGameBtn.onclick = (event) => {
    currScreenElems = createGameScreenElems
}
homeScreenElems.joinGameBtn.onclick = (event) => {
    addGameIdInput(joiningScreenElems.fieldID.absCnvPos.toAbsPagePos())
    currScreenElems = joiningScreenElems
}
