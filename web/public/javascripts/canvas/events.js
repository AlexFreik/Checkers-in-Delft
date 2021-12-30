function isSelected(mousePos, elem) {
    return elem && elem.absCnvPos.isInside(mousePos.x, mousePos.y)
}


window.addEventListener('click', function (event) {
    const mouseAbsCnvPos = AbsCnvPos.constructFromEvent(event)

    if (isSelected(mouseAbsCnvPos, currScreenElems.board)) {
        board.processClick(mouseAbsCnvPos)
    } else {
        board.processNotClick()
    }
    if (isSelected(mouseAbsCnvPos, currScreenElems.joinGameBtn)) {
        addGameIdInput(gameChoosingElem.fieldID.absCnvPos.toAbsPagePos())
        currScreenElems = gameChoosingElem
    }

    if (isSelected(mouseAbsCnvPos, currScreenElems.forceJumpsChoseBtn)) {
        const txt = currScreenElems.forceJumpsChoseBtn.figs[1]
        txt.val = txt.val === 'ON' ? 'OFF' : 'ON'
    }
    if (isSelected(mouseAbsCnvPos, currScreenElems.startBtn)) {
        const forceJumps = currScreenElems.forceJumpsChoseBtn.figs[1].val === 'ON'
        game = new Game(forceJumps)
        currScreenElems = gameScreenElems
    }
    if (isSelected(mouseAbsCnvPos, currScreenElems.createGameBtn)) {
        currScreenElems = gameSettingElems
    }

    if (isSelected(mouseAbsCnvPos, currScreenElems.homeBtn)) {
        removeGameIdInput()
        currScreenElems = homeScreenElems
    }
    if (isSelected(mouseAbsCnvPos, currScreenElems.soundBtn)) {
        const emoji = currScreenElems.soundBtn.figs[1]
        emoji.val = emoji.val === '\uf028' ? '\uf026' : '\uf028'
    }

    requestAnimationFrame(drawScreen)
})

window.addEventListener('mousemove', function (event) {
    const mouseAbsCnvPos = AbsCnvPos.constructFromEvent(event)
    for (const [name, elem] of Object.entries(currScreenElems)) {
        if (elem.state) {
            if (elem.absCnvPos.isInside(mouseAbsCnvPos.x, mouseAbsCnvPos.y)) {
                elem.state = 'ON'
            } else {
                elem.state = 'OFF'
            }
        }
    }
    requestAnimationFrame(drawScreen)
})

window.addEventListener('keydown', function (event) {
    if (currScreenElems.fieldID && event.key === 'Enter') {
        removeGameIdInput()
        game = new Game('ON') // TODO
        currScreenElems = gameScreenElems
        requestAnimationFrame(drawScreen)
    }
})
