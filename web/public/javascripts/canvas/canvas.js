/*
 The problem this function solves --- blurriness on hdpi screens.
 Because now one pixel have more than one real pixels inside (window.devicePixelRatio^2 to be consise),
 we need to scale our canvas.
 */
function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect()
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr)
    return ctx
}
/*
 Just draws elements.
 */
function drawScreen() {
    for (const [name, elem] of Object.entries(elems)) {
        elem.draw()
    }
}

let unifiedSize = 500
const canvas = document.getElementById('canvas-game')
canvas.style.width = WIDTH_RATIO * unifiedSize + 'px'
canvas.style.height = unifiedSize + 'px'

const ctx = setupCanvas(canvas)

drawScreen()
