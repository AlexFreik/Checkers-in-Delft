const createGameScreenElems = {
    background: background,
    soundBtn: soundBtn,
    homeBtn: homeBtn,
    forceJumpsChoseBtn: getDefaultBtnElem(
        (pos = new RatioCnvPos(
            ((1 - 0.15) * WIDTH_RATIO) / 2,
            0.6,
            0.15 * WIDTH_RATIO,
            0.05
        )),
        'ON'
    ),
    startBtn: getDefaultBtnElem(
        new RatioCnvPos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1),
        'Start'
    ),
}

createGameScreenElems.forceJumpsChoseBtn.onclick = (event) => {
    const txt = currScreenElems.forceJumpsChoseBtn.figs[1]
    txt.val = txt.val === 'ON' ? 'OFF' : 'ON'
}
createGameScreenElems.startBtn.onclick = () => {
    let status
    fetch('/api/create-game', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(getGameSettingsInput()),
    })
        .then((res) => {
            status = res.status
            return res.json()
        })
        .then((data) => createGame(status, data))
        .catch((e) => console.log(e))
}

function createGame(status, data) {
    if (status === 200) {
        game = new Game(data.gameId)
        playerToken = data.playerToken
        websocket = initFrontendWS()

        currScreenElems = gameScreenElems
        window.requestAnimationFrame(drawScreen)
    }
}

function getGameSettingsInput() {
    return {
        forceJumps:
            createGameScreenElems.forceJumpsChoseBtn.figs[1].val === 'ON',
    }
}
