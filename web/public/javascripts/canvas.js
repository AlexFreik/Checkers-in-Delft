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

function convert(ratio) {
    return canvasHeight * ratio
}
const SPLASH_DESK_WIDTH_RATIO = 0.7
const SPLASH_DESK_HEIGHT_RATIO = 0.3

let canvasWidth = 500
let canvasHeight = 500
const canvas = document.getElementById('canvas-game')
canvas.style.width = canvasWidth + 'px'
canvas.style.height = canvasHeight + 'px'

const ctx = setupCanvas(canvas)
ctx.fillStyle = 'rgb(40, 40, 40)'
ctx.fillStyle = '#333333'
ctx.fillRect(0, 0, canvas.width, canvas.height)


// ctx.beginPath()
// ctx.rect(canvasWidth / 2, canvasHeight / 2, 100, 100)
// ctx.lineWidth = 10
// ctx.strokeStyle = '#3c3f41'
// ctx.stroke()

ctx.fillStyle = '#3c3f41'
ctx.fillRect(
    (canvasWidth - convert(SPLASH_DESK_WIDTH_RATIO)) / 2,
    canvasHeight  * 2 / 10,
    convert(SPLASH_DESK_WIDTH_RATIO),
    convert(SPLASH_DESK_HEIGHT_RATIO)
)

ctx.fillStyle = 'white'
ctx.font = '30px Arial'
ctx.fillText(
    'The Best Checkers',
    (canvasWidth - convert(SPLASH_DESK_WIDTH_RATIO)) / 2,
    canvasHeight  * 3 / 10
)
ctx.fillText(
    'in Whole Dleft!!!',
    (canvasWidth - convert(SPLASH_DESK_WIDTH_RATIO)) / 2,
    canvasHeight  * 4 / 10
)


ctx.fillStyle = '#3c3f41'
ctx.fillRect(
    (canvasWidth - convert(0.7)) / 2,
    canvasHeight  * 6 / 10,
    convert(0.7),
    convert(0.1)
)
ctx.fillRect(
    (canvasWidth - convert(0.7)) / 2,
    canvasHeight  * 8 / 10,
    convert(0.7),
    convert(0.1)
)
ctx.fillStyle = '#eee'
ctx.fillText(
    'Create New Game',
    (canvasWidth - convert(0.7)) / 2,
    canvasHeight  * 7 / 10
)
ctx.fillText(
    'Join Existing Game',
    (canvasWidth - convert(0.7)) / 2,
    canvasHeight  * 9 / 10
)

window.addEventListener('click', function (event) {
    console.log(event)
})
