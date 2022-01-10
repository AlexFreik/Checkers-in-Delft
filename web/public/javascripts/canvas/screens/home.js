let inProgressGamesNum = 'undefined'
let finishedGamesNum = 'undefined'
let waitingForStartGamesNum = 'undefined'

const homeScreenElems = {
    background: background,
    soundBtn: soundBtn,
    createGameBtn: getDefaultBtnElem(
        new RatioCnvPos(0.35 * WIDTH_RATIO, 0.6, 0.3 * WIDTH_RATIO, 0.1),
        'Create New Game'
    ),
    joinGameBtn: getDefaultBtnElem(
        new RatioCnvPos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1),
        'Join Existing Game'
    ),
    titleDesc: new Elem(
        (ratioPos = new RatioCnvPos(
            0.15 * WIDTH_RATIO,
            0.1,
            0.7 * WIDTH_RATIO,
            0.45
        )),
        [
            new Rect(ratioPos, '#3c3f41', 0.01, '#a9abad'),
            new Text(
                ratioPos.shift(0, -0.1),
                'THE BEST CHECKERS IN DELFT',
                '#fff',
                Font.Middle
            ),
            new Text(ratioPos.shift(0, 0.03), '', '#fff', Font.middle),
            new Text(ratioPos.shift(0, 0.1), '', '#fff', Font.middle),
            new Text(ratioPos.shift(0, 0.17), '', '#fff', Font.middle),
        ],
        function () {
            this.drawDynamicTxt(2, 'Finished games: ' + finishedGamesNum)
            this.drawDynamicTxt(3, 'In progress games: ' + inProgressGamesNum)
            this.drawDynamicTxt(
                4,
                'Waiting for start games: ' + waitingForStartGamesNum
            )
        }
    ),
}

homeScreenElems.createGameBtn.addEventListener('click', () => {
    currScreenElems = createGameScreenElems
})
homeScreenElems.joinGameBtn.addEventListener('click', () => {
    addGameIdInput(joiningScreenElems.fieldID.absCnvPos.toAbsPagePos())
    currScreenElems = joiningScreenElems
})

// ===== stats processing =====
window.addEventListener('load', () => {
    processStats()
    resizeCanvas()
    window.requestAnimationFrame(drawScreen)
})

function processStats() {
    inProgressGamesNum = document.getElementById('inProgressGamesNum').innerHTML
    finishedGamesNum = document.getElementById('finishedGamesNum').innerHTML
    waitingForStartGamesNum = document.getElementById(
        'waitingForStartGamesNum'
    ).innerHTML
}

let currScreenElems = homeScreenElems
