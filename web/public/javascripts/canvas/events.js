canvas.addEventListener('mousemove', (event) => {
    for (const [name, elem] of Object.entries(currScreenElems)) {
        for (const listener of elem.eventListeners['mousemove']) listener(event)
    }
    window.requestAnimationFrame(drawScreen)
})
canvas.addEventListener('click', (event) => {
    const mousePos = AbsCnvPos.constructFromEvent(event)
    for (const [name, elem] of Object.entries(currScreenElems)) {
        if (elem.absCnvPos.isInside(mousePos.x, mousePos.y)) {
            for (const listener of elem.eventListeners['click']) listener(event)
        }
    }
    processAlert()
    window.requestAnimationFrame(drawScreen)
})
window.addEventListener('keydown', function (event) {
    for (const [name, elem] of Object.entries(currScreenElems)) {
        for (const listener of elem.eventListeners['keydown']) listener(event)
    }
    window.requestAnimationFrame(drawScreen)
})
window.addEventListener('resize', function () {
    for (const [name, elem] of Object.entries(currScreenElems)) {
        for (const listener of elem.eventListeners['resize']) listener(event)
    }
    resizeCanvas()
    window.requestAnimationFrame(drawScreen)
})
function processAlert() {
    const alert = currScreenElems.alertMsg
    if (alert) {
        alert.onremove()
        delete currScreenElems.alertMsg
    }
}
