/*
 Board-class. It is responsible for drawing grid and pieces
 and for detecting which piece is selected, when user clicks on board
 */
function Board(absCnvPos, lineWidth, strokeStyle) {
    this.absCnvPos = absCnvPos
    this.n = ROW_COL_NUM // n -- number of rows & columns
    this.lineWidth = lineWidth
    this.strokeStyle = strokeStyle
    this.selectedPiece = undefined

    /*
     all pieces have coords {col: 0-7, row: 0-7}. It converts this coords into board-system pos
     */
    this._toAbsPiecePos = function (coords) {
        const d = this.absCnvPos.w / this.n
        const x = this.absCnvPos.x + coords.col * d
        const y = this.absCnvPos.y + this.absCnvPos.h - (coords.row + 1) * d
        return new AbsCnvPos(x, y, d, d)
    }
    /*
     it does reverse of _toAbsPiecePos
     */
    this._toCoords = function (absCnvPos) {
        const ans = {
            col: Math.floor(
                ((absCnvPos.x - this.absCnvPos.x) / this.absCnvPos.w) *
                    ROW_COL_NUM
            ),
            row: Math.floor(
                (1 - (absCnvPos.y - this.absCnvPos.y) / this.absCnvPos.h) *
                    ROW_COL_NUM
            ),
        }
        return ans
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
        ctx.beginPath()
        for (let x = 0; x <= this.absCnvPos.w; x += this.absCnvPos.w / this.n) {
            ctx.moveTo(this.absCnvPos.x + x, this.absCnvPos.y)
            ctx.lineTo(
                this.absCnvPos.x + x,
                this.absCnvPos.y + this.absCnvPos.h
            )
        }

        for (let y = 0; y <= this.absCnvPos.h; y += this.absCnvPos.h / this.n) {
            ctx.moveTo(this.absCnvPos.x, this.absCnvPos.y + y)
            ctx.lineTo(
                this.absCnvPos.x + this.absCnvPos.w,
                this.absCnvPos.y + y
            )
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
    this.processClick = function (absCnvPos) {
        const coords = this._toCoords(absCnvPos)
        const chosenPiece = game.pieces.filter(
            (piece) =>
                piece.coords.col === coords.col &&
                piece.coords.row === coords.row
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
