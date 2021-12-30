/*
 Board-class. It is responsible for drawing grid and pieces
 and for detecting which piece is selected, when user clicks on board
 */
class Board {
    constructor(absCnvPos, lineWidth, strokeStyle) {
        this.absCnvPos = absCnvPos
        this.n = ROW_COL_NUM
        this.lineWidth = lineWidth
        this.strokeStyle = strokeStyle
        this.selectedPiece = undefined
    }
    _toAbsPiecePos = (coords) => {
        const d = this.absCnvPos.w / this.n
        const x = this.absCnvPos.x + coords.col * d
        const y = this.absCnvPos.y + this.absCnvPos.h - (coords.row + 1) * d
        return new AbsCnvPos(x, y, d, d)
    }

    _toCoords = (absCnvPos) => {
        return {
            col: Math.floor(
                ((absCnvPos.x - this.absCnvPos.x) / this.absCnvPos.w) *
                    ROW_COL_NUM
            ),
            row: Math.floor(
                (1 - (absCnvPos.y - this.absCnvPos.y) / this.absCnvPos.h) *
                    ROW_COL_NUM
            ),
        }
    }
    _drawPiece = (piece, isSelected) => {
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
    _drawAllPieces = () => {
        for (const piece of game.pieces) {
            this._drawPiece(piece, piece === this.selectedPiece)
        }
    }
    draw = () => {
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

        this._drawAllPieces()
    }

    /*
     when user clicks on board it detects at which coords this click
     was and if needed erases selection or moves piece.
     */
    processClick = (absCnvPos) => {
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
    processNotClick = function () {
        this.selectedPiece = undefined
    }
}
