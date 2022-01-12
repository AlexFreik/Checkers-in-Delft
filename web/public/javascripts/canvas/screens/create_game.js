const createGameScreenElems = {
    background: background,
    soundBtn: soundBtn,
    homeBtn: homeBtn,
    // forceJumpsChoseBtn: getDefaultBtnElem(
    //     (pos = new RatioCnvPos(
    //         ((1 - 0.15) * WIDTH_RATIO) / 2,
    //         0.6,
    //         0.15 * WIDTH_RATIO,
    //         0.05
    //     )),
    //     'ON'
    // ),
    startBtn: getDefaultBtnElem(new RatioCnvPos(0.35 * WIDTH_RATIO, 0.75, 0.3 * WIDTH_RATIO, 0.1), 'Start'),
}

// createGameScreenElems.forceJumpsChoseBtn.addEventListener('click', () => {
//     const txt = currScreenElems.forceJumpsChoseBtn.figs[1]
//     txt.val = txt.val === 'ON' ? 'OFF' : 'ON'
// })
createGameScreenElems.startBtn.addEventListener('click', () => {
    processCreateGameEvent()
})

