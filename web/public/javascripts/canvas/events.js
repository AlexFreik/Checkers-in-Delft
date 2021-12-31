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
canvas.onclick = (event) => {
    const mousePos = AbsCnvPos.constructFromEvent(event)
    for (const [name, elem] of Object.entries(currScreenElems)) {
        if (elem.onclick && elem.absCnvPos.isInside(mousePos.x, mousePos.y)) {
            elem.onclick(event)
        }
    }
}
window.addEventListener('keydown', function (event) {
    for (const [name, elem] of Object.entries(currScreenElems)) {
        if (elem.onkeydown) {
            elem.onkeydown(event)
        }
    }
    requestAnimationFrame(drawScreen)
})
