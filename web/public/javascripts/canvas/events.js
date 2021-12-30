/*
 Translates mouse clientX, clientY position into ones relative to the canvas
 */
function getMouseAbsCnvPos(canvas, evt) {
    const rect = canvas.getBoundingClientRect() // abs. size of element
    return {
        x: evt.clientX - rect.left, // scale mouse coordinates after they have
        y: evt.clientY - rect.top, // been adjusted to be relative to element
    }
}
/*
 translates position, which is relative to canvas to coords, relative to page (like pageX, pageY)
 */
function canvasRelPosToPagePos(absCnvPos) {
    const rect = canvas.getBoundingClientRect() // abs. size of element
    return {
        x: absCnvPos.x + rect.left + window.scrollX,
        y: absCnvPos.y + rect.top + window.scrollY,
        w: absCnvPos.w,
        h: absCnvPos.h,
    }
}

function isPosInRect(pos, rect) {
    // pos = {x: int, y: int}, rect = {x: int, y: int, width: int, height: int}
    return (
        rect.x <= pos.x &&
        pos.x <= rect.x + rect.w &&
        rect.y <= pos.y &&
        pos.y <= rect.y + rect.h
    )
}
function isSelected(mousePos, elem) {
    return elem && isPosInRect(mousePos, elem.absCnvPos)
}

window.addEventListener('click', function (event) {
    const mouseAbsCnvPos = getMouseAbsCnvPos(canvas, event)

    if (isSelected(mouseAbsCnvPos, elems.board)) {
        board.processClick(mouseAbsCnvPos)
    } else {
        board.processNotClick()
    }
    if (isSelected(mouseAbsCnvPos, elems.joinGameBtn)) {
        const inputAbsPos = gameChoosingElem.fieldID.absCnvPos
        addGameIdInput(canvasRelPosToPagePos(inputAbsPos))

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
    const clickPos = getMouseAbsCnvPos(canvas, event)
    for (const [name, elem] of Object.entries(elems)) {
        if (elem.state) {
            if (isPosInRect(clickPos, elem.absCnvPos)) {
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
