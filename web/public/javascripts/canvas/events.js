function getMousePosRelativeCanvas(canvas, evt) {
    const rect = canvas.getBoundingClientRect() // abs. size of element
    return {
        x: evt.clientX - rect.left, // scale mouse coordinates after they have
        y: evt.clientY - rect.top, // been adjusted to be relative to element
    }
}
function canvasRelPosToPagePos(pos) {
    const rect = canvas.getBoundingClientRect() // abs. size of element
    return {
        x: pos.x + rect.left + window.scrollX,
        y: pos.y + rect.top + window.scrollY,
        w: pos.w,
        h: pos.h,
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
    return elem && isPosInRect(mousePos, elem.pos.toAbsCord())
}

function removeGameIdInput() {
    const input = document.getElementById('gameID')
    if (input) {
        input.remove()
        return true
    }
    return false
}
window.addEventListener('click', function (event) {
    const mousePos = getMousePosRelativeCanvas(canvas, event)

    if (isSelected(mousePos, elems.board)) {
        board.processClick(mousePos)
    } else {
        board.processNotClick()
    }
    if (isSelected(mousePos, elems.joinGameBtn)) {
        addInput(
            canvasRelPosToPagePos(gameChoosingElem.fieldID.pos.toAbsCord())
        )
        elems = gameChoosingElem
    }

    if (isSelected(mousePos, elems.forceJumpsChoseBtn)) {
        const txt = elems.forceJumpsChoseBtn.figs[1]
        txt.val = txt.val === 'ON' ? 'OFF' : 'ON'
    }
    if (isSelected(mousePos, elems.startBtn)) {
        const forceJumps = elems.forceJumpsChoseBtn.figs[1].val === 'ON'
        game = new Game(forceJumps)
        elems = gameScreenElems
    }
    if (isSelected(mousePos, elems.createGameBtn)) {
        elems = gameSettingElems
    }

    if (isSelected(mousePos, elems.homeBtn)) {
        removeGameIdInput()
        elems = homeScreenElems
    }
    if (isSelected(mousePos, elems.soundBtn)) {
        const emoji = elems.soundBtn.figs[1]
        emoji.val = emoji.val === '\uf028' ? '\uf026' : '\uf028'
    }

    requestAnimationFrame(drawScreen)
})

window.addEventListener('mousemove', function (event) {
    const clickPos = getMousePosRelativeCanvas(canvas, event)
    for (const [name, elem] of Object.entries(elems)) {
        if (elem.state) {
            if (isPosInRect(clickPos, elem.pos.toAbsCord())) {
                elem.state = 'ON'
            } else {
                elem.state = 'OFF'
            }
        }
    }
    requestAnimationFrame(drawScreen)
})
