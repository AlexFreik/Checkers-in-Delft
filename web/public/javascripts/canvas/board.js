/**
 * Board-class. It is responsible for drawing grid and pieces
 * and for detecting which piece is selected, when user clicks on board
 */
class Board extends Elem {
    /**
     *
     * @param {RatioCnvPos} ratioPos
     * @param {number} lineWidth
     * @param {string} strokeStyle
     */
    constructor(ratioPos, lineWidth, strokeStyle) {
        super(ratioPos, [])
        this.ratioPos = ratioPos
        this.n = ROW_COL_NUM
        this.lineWidth = lineWidth
        this.strokeStyle = strokeStyle
        this.selectedPieceCoords = undefined
    }

    /**
     *
     * @return {AbsCnvPos}
     */
    get absCnvPos() {
        return this.ratioPos.toAbsCnvPos()
    }

    draw = () => {
        this._drawGrid()
        this._drawAllPieces()
    }

    /**
     * @private
     */
    _drawGrid = () => {
        ctx.beginPath()
        for (let x = 0; x <= Math.ceil(this.absCnvPos.w); x += this.absCnvPos.w / this.n) {
            ctx.moveTo(this.absCnvPos.x + x, this.absCnvPos.y)
            ctx.lineTo(this.absCnvPos.x + x, this.absCnvPos.y + this.absCnvPos.h)
        }

        for (let y = 0; y <= Math.ceil(this.absCnvPos.h); y += this.absCnvPos.h / this.n) {
            ctx.moveTo(this.absCnvPos.x, this.absCnvPos.y + y)
            ctx.lineTo(this.absCnvPos.x + this.absCnvPos.w, this.absCnvPos.y + y)
        }

        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.strokeStyle
        ctx.closePath()
        ctx.stroke()
    }

    /**
     * When user clicks on board it detects at which coords this click
     * was and if needed erases selection or moves piece.
     * @param {AbsCnvPos} absCnvPos
     */
    processClick = (absCnvPos) => {
        const coords = this._toCoords(absCnvPos)
        if (!game.getPiece(coords)) {
            if (this.selectedPieceCoords === undefined) return
            game.requestPieceMove(this.selectedPieceCoords, coords)
            this.selectedPieceCoords = undefined
        } else {
            this.selectedPieceCoords = coords
        }
    }

    /**
     *
     * @param {{col: number, row: number}} coords
     * @return {AbsCnvPos}
     * @private
     */
    _toAbsPiecePos = (coords) => {
        const d = this.absCnvPos.w / this.n
        const x = this.absCnvPos.x + coords.col * d
        const y = this.absCnvPos.y + this.absCnvPos.h - (coords.row + 1) * d
        return new AbsCnvPos(x, y, d, d)
    }

    /**
     *
     * @param {AbsCnvPos} absCnvPos
     * @return {{col: number, row: number}}
     * @private
     */
    _toCoords = (absCnvPos) => {
        return {
            col: Math.floor(((absCnvPos.x - this.absCnvPos.x) / this.absCnvPos.w) * ROW_COL_NUM),
            row: Math.floor((1 - (absCnvPos.y - this.absCnvPos.y) / this.absCnvPos.h) * ROW_COL_NUM),
        }
    }

    /**
     *
     * @param {Piece} piece
     * @param {boolean} isSelected
     * @private
     */
    _drawPiece = (piece, isSelected) => {
        const absPos = this._toAbsPiecePos(piece.coords)
        ctx.fillStyle = piece.color[piece.sideId]
        ctx.beginPath()
        ctx.arc(
            absPos.x + absPos.w / 2,
            absPos.y + absPos.w / 2,
            absPos.w / 2 / (isSelected ? 1.3 : 1.5),
            0,
            2 * Math.PI
        )
        ctx.closePath()
        ctx.strokeStyle = piece.sideId === SIDE_ID_1 ? '#333' : '#eee'
        ctx.lineWidth = 5
        ctx.stroke()
        ctx.fill()
    }

    /**
     * @private
     */
    _drawAllPieces = () => {
        for (const piece of game.pieces) {
            this._drawPiece(piece, this.selectedPieceCoords && piece.coordsEqual(this.selectedPieceCoords))
        }
    }
}
