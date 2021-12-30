const background = new Elem(
    (pos = new RatioCnvPos(0, 0, WIDTH_RATIO, 1).toAbsCnvPos()),
    [new Rect(pos, '#333333', convertRatioToAbs(0.01), '#a9abad')]
)
const soundBtn = getCornerBtnElem('\uf028', { left: false, down: false })
const homeBtn = getCornerBtnElem('\uf015', { left: true, down: false })

soundBtn.onclick = (event) => {
    const emoji = currScreenElems.soundBtn.figs[1]
    emoji.val = emoji.val === '\uf028' ? '\uf026' : '\uf028'
}
homeBtn.onclick = (event) => {
    removeGameIdInput()
    currScreenElems = homeScreenElems
}
