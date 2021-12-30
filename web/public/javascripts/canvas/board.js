/*
 Board-class. It is responsible for drawing grid and pieces
 and for detecting which piece is selected, when user clicks on board
 */
function Board(pos, lineWidth, strokeStyle) {
    this.pos = pos
    this.n = ROW_COL_NUM // n -- number of rows & columns
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
    this.selectedPiece = undefined

    /*
     all pieces have coords {col: 0-7, row: 0-7}. It converts this coords into board-system pos
     */
    this._toAbsPiecePos = function (coords) {
        const d = this.pos.w / this.n
        const x = this.pos.x + coords.col * d
        const y = this.pos.y + this.pos.h - (coords.row + 1) * d
        return new Pos(x, y, d, d).toAbsCord()
    }
    /*
     it does reverse of _toAbsPiecePos
     */
    this._toCoords = function (pos) {
        // pos: position {x, y} on canvas
        const absGridPos = this.pos.toAbsCord()
        return {
            col: Math.floor(
                ((pos.x - absGridPos.x) / absGridPos.w) * ROW_COL_NUM
            ),
            row:
                ROW_COL_NUM -
                Math.floor(((pos.y - this.pos.y) / absGridPos.h) * ROW_COL_NUM),
        }
    }
    /*
     draws piece, and animates it if it is selected
     */
    this._drawPiece = function (piece, isSelected) {
        const absPos = this._toAbsPiecePos(piece.coords)
        ctx.fillStyle = piece.color[piece.player]
        ctx.beginPath()
        ctx.arc(
            absPos.x + absPos.w / 2,
            absPos.y + absPos.w / 2,
            absPos.w / 2 / (isSelected ? 1.3 : 1.5),
            0,
            2 * Math.PI
        )
        ctx.closePath()
        ctx.strokeStyle = piece.player === Setup.PLAYER_0 ? '#333' : '#eee'
        ctx.lineWidth = 5
        ctx.stroke()
        ctx.fill()
    }
    /*
     draws all pieces on the board
     */
    this._drawPieces = function () {
        for (const piece of game.pieces) {
            this._drawPiece(piece, piece === this.selectedPiece)
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

    /*
     when user clicks on board it detects at which coords this click
     was and if needed erases selection or moves piece.
     */
    this.processClick = function (pos) {
        const coords = this._toCoords(pos)
        const chosenPiece = game.pieces.filter(
            (piece) =>
                piece.coords.col === coords.col && piece.coords.row === coords.row
        )
        if (chosenPiece.length === 0) {
            if (this.selectedPiece === undefined) return
            this.selectedPiece.coords = coords
            this.selectedPiece = undefined
        } else {
            console.assert(chosenPiece.length === 1)
            this.selectedPiece = chosenPiece[0]
        }
    }
    this.processNotClick = function () {
        this.selectedPiece = undefined
    }
}
