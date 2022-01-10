/**
 * The problem this function solves --- blurriness on hdpi screens.
 * Because now one pixel have more than one real pixels inside
 * (window.devicePixelRatio^2 to be consise), we need to scale our canvas.
 */
function setupCanvas() {
    const dpr = window.devicePixelRatio || 1
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect()
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
}
function setupContext() {
    setupCanvas()
    const dpr = window.devicePixelRatio || 1
    ctx = canvas.getContext('2d')
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr)
}

function drawScreen() {
    for (const [name, elem] of Object.entries(currScreenElems)) {
        elem.draw()
    }
}

function resizeCanvas() {
    const canvasDiv = document.getElementById('canvas-holder')
    const rect = canvasDiv.getBoundingClientRect()
    RatioCnvPos.unifiedSize = rect.width / WIDTH_RATIO - 30
    RatioCnvPos.unifiedSize = Math.max(RatioCnvPos.unifiedSize, 500 / WIDTH_RATIO)
    RatioCnvPos.unifiedSize = Math.min(RatioCnvPos.unifiedSize, 850 / WIDTH_RATIO)
    canvas.style.width = Math.floor(RatioCnvPos.ratioToAbs(WIDTH_RATIO)) + 'px'
    canvas.style.height = Math.floor(RatioCnvPos.ratioToAbs(1)) + 'px'

    setupCanvas()
    setupContext()
}

const canvas = document.getElementById('canvas-game')
let ctx
