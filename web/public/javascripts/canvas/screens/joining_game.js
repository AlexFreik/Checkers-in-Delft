const joiningScreenElems = {
    background: background,
    homeBtn: homeBtn,
    soundBtn: soundBtn,

    fieldID: new Elem(
        (pos = new RatioCnvPos(
            0.35 * WIDTH_RATIO,
            0.5,
            0.3 * WIDTH_RATIO,
            0.1
        ).toAbsCnvPos()),
        [
            new Rect(pos, '#3c3f41', convertRatioToAbs(0.01), '#a9abad'),
            new Text(pos, '', '#fff', '25px Arial'),
            new Text(
                pos.shift(convertRatioToAbs(0), convertRatioToAbs(-0.1)),
                'Game ID:',
                '#fff',
                '25px Arial'
            ),
        ]
    ),
}
