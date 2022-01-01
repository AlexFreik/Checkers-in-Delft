const background = new Elem(
    (ratioPos = new RatioCnvPos(0, 0, WIDTH_RATIO, 1)),
    [new Rect(ratioPos, '#333333', 0.01, '#a9abad')]
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
clickSound = new Audio('../data/click.wav')
