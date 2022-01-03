/**
 *
 * @param {HTMLElement|Window} element
 * @param {string} type
 * @param {function(Event, Elem): boolean} condition
 */
function addListener(element, type, condition = () => true) {
    element.addEventListener(type, (event) => {
        for (const [name, elem] of Object.entries(currScreenElems))
            if (condition(event, elem))
                for (const listener of elem.eventListeners[type])
                    listener(event)
        window.requestAnimationFrame(drawScreen)
    })
}

addListener(canvas, 'mousemove')
addListener(canvas, 'click', (event, elem) => {
    const mousePos = AbsCnvPos.constructFromEvent(event)
    return elem.absCnvPos.isInside(mousePos.x, mousePos.y)
})
addListener(window, 'keydown')
window.addEventListener('resize', () => {
    resizeCanvas()
})
addListener(window, 'resize')
