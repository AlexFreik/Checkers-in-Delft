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
        new RatioCnvPos(
            0.35 * WIDTH_RATIO,
            0.75,
            0.3 * WIDTH_RATIO,
            0.1
        ),
        'Start'
    ),
}

createGameScreenElems.startBtn.onclick = (event) => {
    websocket = initFrontendWS()

    const forceJumps = currScreenElems.forceJumpsChoseBtn.figs[1].val === 'ON'
    game = new Game({forceJumps})
    currScreenElems = gameScreenElems
}
createGameScreenElems.forceJumpsChoseBtn.onclick = (event) => {
    const txt = currScreenElems.forceJumpsChoseBtn.figs[1]
    txt.val = txt.val === 'ON' ? 'OFF' : 'ON'
}
createGameScreenElems.startBtn.onkeydown = (event) => {
    const settings = getGameSettingsInput()
    if (event.key === 'Enter') {
        fetch('/api/create-game', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        })
            .then((res) => res.json())
            .then((data) => (playerToken = data.playerToken))
            .catch((e) => console.log(e))

        removeGameIdInput()
        game = new Game(true) // TODO
        currScreenElems = gameScreenElems

        const websocket = initFrontendWS()
    }
}

function getGameSettingsInput() {
    return {
        forceJumps: createGameScreenElems.forceJumpsChoseBtn.figs[1].val === 'ON'
    }
}