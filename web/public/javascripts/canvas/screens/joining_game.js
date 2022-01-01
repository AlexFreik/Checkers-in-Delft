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
            new Text(ratioPos.shift(0, -0.1), 'Game ID:', '#fff', '25px Arial'),
        ]
    ),
}

joiningScreenElems.fieldID.onkeydown = (event) => {
    const gameId = getGameIdInputTxt()
    if (event.key === 'Enter') {
        fetch('/api/join-game', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId: gameId }),
        })
            .then((res) => res.json())
            .then((data) => joinGame(data))
            .catch((e) => console.log(e))
    }
}

function joinGame(data) {
    game = new Game(data.gameId)
    websocket = initFrontendWS()

    removeGameIdInput()
    currScreenElems = gameScreenElems
    window.requestAnimationFrame(drawScreen)
}
