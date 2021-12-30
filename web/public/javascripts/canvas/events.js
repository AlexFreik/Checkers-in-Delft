function isSelected(mousePos, elem) {
    return elem && elem.absCnvPos.isInside({x: mousePos.x, y: mousePos.y})
}

window.addEventListener('click', function (event) {
    const mouseAbsCnvPos = AbsCnvPos.constructFromEvent(event)

    if (isSelected(mouseAbsCnvPos, elems.board)) {
        board.processClick(mouseAbsCnvPos)
    } else {
        board.processNotClick()
    }
    if (isSelected(mouseAbsCnvPos, elems.joinGameBtn)) {
        addGameIdInput(gameChoosingElem.fieldID.absCnvPos.toAbsPagePos())
        elems = gameChoosingElem
    }

    if (isSelected(mouseAbsCnvPos, elems.forceJumpsChoseBtn)) {
        const txt = elems.forceJumpsChoseBtn.figs[1]
        txt.val = txt.val === 'ON' ? 'OFF' : 'ON'
    }
    if (isSelected(mouseAbsCnvPos, elems.startBtn)) {
        const forceJumps = elems.forceJumpsChoseBtn.figs[1].val === 'ON'
        game = new Game(forceJumps)
        elems = gameScreenElems
    }
    if (isSelected(mouseAbsCnvPos, elems.createGameBtn)) {
        elems = gameSettingElems
    }

    if (isSelected(mouseAbsCnvPos, elems.homeBtn)) {
        removeGameIdInput()
        elems = homeScreenElems
    }
    if (isSelected(mouseAbsCnvPos, elems.soundBtn)) {
        const emoji = elems.soundBtn.figs[1]
        emoji.val = emoji.val === '\uf028' ? '\uf026' : '\uf028'
    }

    requestAnimationFrame(drawScreen)
})

window.addEventListener('mousemove', function (event) {
    const mouseAbsCnvPos = AbsCnvPos.constructFromEvent(event)
    for (const [name, elem] of Object.entries(elems)) {
        if (elem.state) {
            if (
                elem.absCnvPos.isInside({
                    x: mouseAbsCnvPos.x,
                    y: mouseAbsCnvPos.y,
                })
            ) {
                elem.state = 'ON'
            } else {
                elem.state = 'OFF'
            }
        }
    }
    requestAnimationFrame(drawScreen)
})

window.addEventListener('keydown', function (event) {
    if (elems.fieldID && event.key === 'Enter') {
        removeGameIdInput()
        game = new Game('ON') // TODO
        elems = gameScreenElems
        requestAnimationFrame(drawScreen)
    }
})
