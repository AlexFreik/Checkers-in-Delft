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
            new Text(ratioPos, '', '#fff', Font.Middle),
            new Text(ratioPos.shift(0, -0.1), 'Game ID:', '#fff', Font.Middle),
        ]
    ),
}

joiningScreenElems.fieldID.addEventListener('keydown', (event) => {
    const gameId = getGameIdInputTxt()
    let status
    if (event.key === 'Enter') {
        fetch('/api/join-game', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId: gameId }),
        })
            .then((res) => {
                status = res.status
                return res.json()
            })
            .then((res) => joinGame(status, res, gameId))
            .catch((e) => console.log(e))
    }
})
joiningScreenElems.fieldID.addEventListener('resize', () => {
    setGameInputPos(
        getGameIdElem(),
        joiningScreenElems.fieldID.absCnvPos.toAbsPagePos()
    )
})
joiningScreenElems.fieldID.addEventListener('mousemove', () => {
    setGameInputPos(
        getGameIdElem(),
        joiningScreenElems.fieldID.absCnvPos.toAbsPagePos()
    )
})

function joinGame(status, data, gameId) {
    if (status === 400) {
        hideGameIdElem()
        currScreenElems.alertMsg = new AlertMsg(
            'Error',
            data.message,
            showGameIdElem
        )
    } else if (status === 200) {
        game = new Game(gameId, data.playerToken)
        websocket = initFrontendWS()

        removeGameIdInput()
        currScreenElems = gameScreenElems
    }
    window.requestAnimationFrame(drawScreen)
}
