let inProgressGamesNum = 'undefined'
let finishedGamesNum = 'undefined'

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
                '25px Arial'
            ),
            new Text(
                ratioPos.shift(0, -0.1),
                'THE BEST CHECKERS IN DELFT',
                '#fff',
                '25px Arial'
            ),
            new Text(ratioPos.shift(0, 0.03), '', '#fff', '20px Arial'),
            new Text(ratioPos.shift(0, 0.1), '', '#fff', '20px Arial'),
            new Text(ratioPos.shift(0, 0.17), '', '#fff', '20px Arial'),
        ],
        function () {
            this.drawDynamicTxt(3, 'finished games: ' + finishedGamesNum)
            this.drawDynamicTxt(4, 'in progress games: ' + inProgressGamesNum)
            this.drawDynamicTxt(5, 'some third stat: ')
        }
    ),
}

let currScreenElems = homeScreenElems

homeScreenElems.createGameBtn.onclick = () => {
    currScreenElems = createGameScreenElems
}
homeScreenElems.joinGameBtn.onclick = () => {
    addGameIdInput(joiningScreenElems.fieldID.absCnvPos.toAbsPagePos())
    currScreenElems = joiningScreenElems
}

// ===== stats processing =====
window.onload = () => {
    processStats()
}
function processStats() {
    fetch('/data/stats.json')
      .then((res) => res.json())
      .then((data) => this.setStats(data))
      .catch((e) => console.log(e))
}
function setStats(stats) {
    inProgressGamesNum = stats.inProgressGamesNum
    finishedGamesNum = stats.finishedGamesNum
    window.requestAnimationFrame(drawScreen)
}
