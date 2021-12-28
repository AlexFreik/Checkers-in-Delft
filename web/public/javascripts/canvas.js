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
function drawHomeScreen() {
    drawRect(ctx, elems.background)
    drawRect(ctx, elems.createGameBtn)
    drawRect(ctx, elems.joinGameBtn)
    drawRect(ctx, elems.titleDesc)
}

function drawGameScreen() {
    drawRect(ctx, elems.background)
    drawRect(ctx, elems.settingsBtn)
    drawRect(ctx, elems.adviceBtn)
    drawRect(ctx, elems.undoBtn)
    drawRect(ctx, elems.homeBtn)
}

function drawScreen() {
    if (game.screen === SCREEN_STATES.HOME) {
        drawHomeScreen()
    } else if (game.screen === SCREEN_STATES.INSIDE_GAME) {
        drawGameScreen()
    }
}

let unifiedSize = 500
const canvas = document.getElementById('canvas-game')
canvas.style.width = WIDTH_RATIO * unifiedSize + 'px'
canvas.style.height = unifiedSize + 'px'

const ctx = setupCanvas(canvas)

drawScreen()
