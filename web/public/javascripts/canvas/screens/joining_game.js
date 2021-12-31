const joiningScreenElems = {
    background: background,
    homeBtn: homeBtn,
    soundBtn: soundBtn,

    fieldID: new Elem(
        (ratioPos = new RatioCnvPos(
            0.35 * WIDTH_RATIO,
            0.5,
            0.3 * WIDTH_RATIO,
            0.1
        )),
        [
            new Rect(ratioPos, '#3c3f41', 0.01, '#a9abad'),
            new Text(ratioPos, '', '#fff', '25px Arial'),
            new Text(
                ratioPos.shift(0,-0.1),
                'Game ID:',
                '#fff',
                '25px Arial'
            ),
        ]
    ),
}

joiningScreenElems.fieldID.onkeydown = (event) => {
    if (event.key === 'Enter') {
        removeGameIdInput()
        game = new Game(true) // TODO
        currScreenElems = gameScreenElems

        const websocket = initFrontendWS()
    }
}