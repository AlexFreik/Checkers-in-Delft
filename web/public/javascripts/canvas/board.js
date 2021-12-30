function Board(pos, lineWidth, strokeStyle) {
    this.pos = pos
    this.n = ROW_COL_NUM // n -- number of rows & columns
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
    this.choosenPiece = undefined

    this._toAbsPiecePos = function (coords) {
        const d = this.pos.w / this.n
        const x = this.pos.x + coords.x * d
        const y = this.pos.y + this.pos.h - (coords.y + 1) * d
        return new Pos(x, y, d, d).toAbsCord()
    }
    this._toCoords = function (pos) {
        // pos: position {x, y} on canvas
        const absGridPos = this.pos.toAbsCord()
        return {
            x: Math.floor(
                ((pos.x - absGridPos.x) / absGridPos.w) * ROW_COL_NUM
            ),
            y:
                ROW_COL_NUM -
                Math.floor(((pos.y - this.pos.y) / absGridPos.h) * ROW_COL_NUM),
        }
    }
    this._drawPiece = function (piece) {
        const absPos = this._toAbsPiecePos(piece.coords)
        ctx.fillStyle = piece.color[piece.player]
        ctx.beginPath()
        ctx.arc(
            absPos.x + absPos.w / 2,
            absPos.y + absPos.w / 2,
            absPos.w / 2 / 1.5,
            0,
            2 * Math.PI
        )
        ctx.closePath()
        ctx.strokeStyle = piece.player === Setup.PLAYER_0 ? '#333' : '#eee'
        ctx.lineWidth = 5
        ctx.stroke()
        ctx.fill()
    }
    this._drawPieces = function () {
        for (const piece of game.pieces) {
            this._drawPiece(piece)
        }
    }
    this.draw = function () {
        const absPos = this.pos.toAbsCord()

        ctx.beginPath()
        for (let x = 0; x <= absPos.w; x += absPos.w / this.n) {
            ctx.moveTo(absPos.x + x, absPos.y)
            ctx.lineTo(absPos.x + x, absPos.y + absPos.h)
        }

        for (let y = 0; y <= absPos.h; y += absPos.h / this.n) {
            ctx.moveTo(absPos.x, absPos.y + y)
            ctx.lineTo(absPos.x + absPos.w, absPos.y + y)
        }

        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.strokeStyle
        ctx.closePath()
        ctx.stroke()

        this._drawPieces()
    }

    this.processClick = function (pos) {
        const coords = this._toCoords(pos)
        console.log(coords)
        const chosenPiece = game.pieces.filter(
            (piece) =>
                piece.coords.x === coords.x && piece.coords.y === coords.y
        )
        console.log(chosenPiece)
        if (chosenPiece.length === 0) {
            if (this.choosenPiece === undefined) return
            this.choosenPiece.coords = coords
            this.choosenPiece = undefined
        } else {
            console.assert(chosenPiece.length === 1)
            this.choosenPiece = chosenPiece[0]
        }
    }
    this.processNotClick = function () {
        this.choosenPiece = undefined
    }
}
