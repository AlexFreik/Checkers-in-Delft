const Game = require('../model/game')
const Pos = require('../model/pos')
const Move = require('../model/move')

/**
 * Checks whether for a current player there is any eating move possible
 * @param game {Game}
 */
function isAnyEatingPossible(game) {
    return game.pieces.some((piece) => getLegalMoves(game, piece, true).length !== 0)
}

/**
 * Returns all possible moves for a given piece in a given game
 * @param game {Game}
 * @param piece {Piece}
 * @param onlyEating {boolean}
 * @return {Move[]}
 */
function getLegalMoves(game, piece, onlyEating) {
    let moves = []
    if (!piece.king) {
        moves.push(...getLegalOrdinaryMovesInDirection(game, piece, getForwardLeftOffset(piece), false))
        moves.push(...getLegalOrdinaryMovesInDirection(game, piece, getForwardRightOffset(piece), false))
        moves.push(...getLegalOrdinaryMovesInDirection(game, piece, getBackwardLeftOffset(piece), true))
        moves.push(...getLegalOrdinaryMovesInDirection(game, piece, getBackwardRightOffset(piece), true))
    } else {
        moves.push(...getLegalKingMovesInDirection(game, piece, getForwardLeftOffset(piece)))
        moves.push(...getLegalKingMovesInDirection(game, piece, getForwardRightOffset(piece)))
        moves.push(...getLegalKingMovesInDirection(game, piece, getBackwardLeftOffset(piece)))
        moves.push(...getLegalKingMovesInDirection(game, piece, getBackwardRightOffset(piece)))
    }

    if (onlyEating) {
        moves = moves.filter((move) => move.eating)
    }

    return moves
}

/**
 * Returns all possible moves for an ordinary piece at given position in given direction
 * @param game {Game}
 * @param piece {Piece}
 * @param direction {Pos}
 * @param eatingOnly {boolean}
 * @return {Move[]}
 */
function getLegalOrdinaryMovesInDirection(game, piece, direction, eatingOnly) {
    const moves = []
    const nearPos = piece.pos.plus(direction)
    if (isInTheBoard(nearPos)) {
        const nearPiece = game.getPieceAt(nearPos)
        if (!nearPiece) {
            if (!eatingOnly) moves.push(new Move(nearPos))
        } else if (nearPiece.sideId !== piece.sideId) {
            const farPos = nearPos.plus(direction)
            if (isInTheBoard(farPos)) {
                const farPiece = game.getPieceAt(farPos)
                if (!farPiece) {
                    farPos.eating = true
                    moves.push(new Move(farPos, nearPiece))
                }
            }
        }
    }
    return moves
}

/**
 * Returns all possible moves for a king piece at given position in given direction
 * @param game {Game}
 * @param piece {Piece}
 * @param direction {Pos}
 * @return {Pos[]}
 */
function getLegalKingMovesInDirection(game, piece, direction) {
    const moves = []
    let currentPos = piece.pos.plus(direction)
    let metOpponentPiece = undefined
    while (isInTheBoard(currentPos)) {
        const currentPiece = game.getPieceAt(currentPos)
        if (currentPiece) {
            if (metOpponentPiece !== undefined || currentPiece.sideId === piece.sideId) break
            metOpponentPiece = currentPiece
        } else {
            moves.push(new Move(currentPos, metOpponentPiece))
        }
        currentPos = currentPos.plus(direction)
    }
    return moves
}

/**
 * Returns whether the piece after the move becomes a king. Returns false if the piece already is a king
 * @param game {Game}
 * @param piece {Piece}
 * @param move {Move}
 * @return {boolean}
 */
function isBecomingKing(game, piece, move) {
    if (piece.king) return false
    const kingLine = piece.sideId === Game.SIDE_A ? 7 : 0
    return move.pos.y === kingLine
}

/**
 * Returns whether the current player can continue (make another move in the same turn) after making this move
 * @param game {Game}
 * @param piece {Piece}
 * @param move {Move}
 * @return {boolean}
 */
function canContinueAfterMove(game, piece, move) {
    if (!move.eating) return false
    const pieceAfterMove = piece.withPos(move.pos)
    return getLegalMoves(game, pieceAfterMove, true).length !== 0
}

/**
 * Returns forward-left offset for a piece. The actual value depends on the side the piece belongs to
 * @param piece {Piece}
 * @return {Pos}
 */
function getForwardLeftOffset(piece) {
    return piece.sideId === Game.SIDE_A ? new Pos(-1, 1) : new Pos(1, -1)
}

/**
 * Returns forward-right offset for a piece. The actual value depends on the side the piece belongs to
 * @param piece {Piece}
 * @return {Pos}
 */
function getForwardRightOffset(piece) {
    return piece.sideId === Game.SIDE_A ? new Pos(1, 1) : new Pos(-1, -1)
}

/**
 * Returns backward-left offset for a piece. The actual value depends on the side the piece belongs to
 * @param piece {Piece}
 * @return {Pos}
 */
function getBackwardLeftOffset(piece) {
    return piece.sideId === Game.SIDE_A ? new Pos(-1, -1) : new Pos(1, 1)
}

/**
 * Returns backward-right offset for a piece. The actual value depends on the side the piece belongs to
 * @param piece {Piece}
 * @return {Pos}
 */
function getBackwardRightOffset(piece) {
    return piece.sideId === Game.SIDE_A ? new Pos(1, -1) : new Pos(-1, 1)
}

/**
 * Returns whether the position is in the boundaries of the board
 * @param pos {Pos}
 * @return {boolean}
 */
function isInTheBoard(pos) {
    return pos.x >= 0 && pos.y >= 0 && pos.x < 8 && pos.y < 8
}

module.exports = { isAnyEatingPossible, getLegalMoves, isBecomingKing, canContinueAfterMove }
