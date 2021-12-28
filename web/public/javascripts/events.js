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

window.addEventListener('click', function (event) {
    const clickPos = getMousePos(canvas, event)
    if (game.screen === SCREEN_STATES.HOME)
        if (isPosInRect(clickPos, elems.joinGameBtn.pos.toAbsCord())) {
            game.screen = SCREEN_STATES.INSIDE_GAME
        }
    requestAnimationFrame(drawScreen)
})
window.addEventListener('mousemove', function (event) {
    const clickPos = getMousePos(canvas, event)
    if (game.screen === SCREEN_STATES.HOME) {
        if (isPosInRect(clickPos, elems.joinGameBtn.pos.toAbsCord())) {
            elems.joinGameBtn.state = 'ON'
        } else {
            elems.joinGameBtn.state = 'OFF'
        }
        if (isPosInRect(clickPos, elems.createGameBtn.pos.toAbsCord())) {
            elems.createGameBtn.state = 'ON'
        } else {
            elems.createGameBtn.state = 'OFF'
        }
    }
    requestAnimationFrame(drawScreen)
})

