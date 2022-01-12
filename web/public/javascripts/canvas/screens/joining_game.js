const joiningScreenElems = {
    background: background,
    homeBtn: homeBtn,
    soundBtn: soundBtn,

    fieldID: new Elem((ratioPos = new RatioCnvPos(0.35 * WIDTH_RATIO, 0.5, 0.3 * WIDTH_RATIO, 0.1)), [
        new Rect(ratioPos, '#3c3f41', 0.01, '#a9abad'),
        new Text(ratioPos, '', '#fff', Font.Middle),
        new Text(ratioPos.shift(0, -0.1), 'Game ID:', '#fff', Font.Middle),
    ]),
}

joiningScreenElems.fieldID.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        processJoinGameEvent(getGameIdInputTxt())
    }
})
joiningScreenElems.fieldID.addEventListener('resize', () => {
    setGameInputPos(getGameIdElem(), joiningScreenElems.fieldID.absCnvPos.toAbsPagePos())
})
joiningScreenElems.fieldID.addEventListener('mousemove', () => {
    setGameInputPos(getGameIdElem(), joiningScreenElems.fieldID.absCnvPos.toAbsPagePos())
})

