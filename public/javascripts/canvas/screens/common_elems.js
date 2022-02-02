const background = new Elem((ratioPos = new RatioCnvPos(0, 0, WIDTH_RATIO, 1)), [
    new Rect(ratioPos, '#333333', 0.01, '#a9abad'),
])
const soundBtn = getCornerBtnElem(EMOJIS.SOUND, { left: false, down: false })
const homeBtn = getCornerBtnElem(EMOJIS.HOME, { left: true, down: false })

soundBtn.addEventListener('click', () => {
    const emoji = currScreenElems.soundBtn.figs[1]
    if (emoji.val === EMOJIS.SOUND) {
        Button.mute()
        emoji.val = EMOJIS.NO_SOUND
    } else {
        Button.unmute()
        emoji.val = EMOJIS.SOUND
    }
})
homeBtn.addEventListener('click', () => {
    removeGameIdInput()
    delete currScreenElems.alertMsg
    closeWS()
    game = undefined
    currScreenElems = homeScreenElems
})
function closeWS() {
    if (currScreenElems === gameScreenElems) {
        if (websocket) {
            websocket.close()
            websocket = undefined
        }
    }
}
