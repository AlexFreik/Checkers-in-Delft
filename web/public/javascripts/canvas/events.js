canvas.onclick = (event) => {
    const mousePos = AbsCnvPos.constructFromEvent(event)
    for (const [name, elem] of Object.entries(currScreenElems)) {
        if (elem.onclick && elem.absCnvPos.isInside(mousePos.x, mousePos.y)) {
            elem.onclick(event)
        }
    }
    requestAnimationFrame(drawScreen)
}
canvas.onmousemove = (event) => {
    const mousePos = AbsCnvPos.constructFromEvent(event)
    for (const [name, elem] of Object.entries(currScreenElems)) {
        if (elem.state) {
            if (elem.absCnvPos.isInside(mousePos.x, mousePos.y)) {
                elem.state = 'ON'
            } else {
                elem.state = 'OFF'
            }
        }
    }
    requestAnimationFrame(drawScreen)
}
window.addEventListener('keydown', function (event) {
    if (currScreenElems.fieldID && event.key === 'Enter') {
        removeGameIdInput()
        game = new Game(true) // TODO
        currScreenElems = gameScreenElems
        requestAnimationFrame(drawScreen)
    }
})
