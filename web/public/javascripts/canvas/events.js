function getMousePosScale(canvas, evt) {
    const rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    }
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect() // abs. size of element
    return {
        x: evt.clientX - rect.left, // scale mouse coordinates after they have
        y: evt.clientY - rect.top, // been adjusted to be relative to element
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
window.addEventListener('click', function (event) {
    const mousePos = getMousePos(canvas, event)

    if (isSelected(mousePos, elems.board)) {
        board.processClick(mousePos)
    } else {
        board.processNotClick()
    }
    if (isSelected(mousePos, elems.joinGameBtn)) {
        elems = gameScreenElems
    }
    if (isSelected(mousePos, elems.homeBtn)) {
        elems = homeScreenElems
    }
    requestAnimationFrame(drawScreen)
})
window.addEventListener('mousemove', function (event) {
    const clickPos = getMousePos(canvas, event)
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
