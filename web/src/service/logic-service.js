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
        moves.push(...getLegalOrdinaryMovesInDirection(game, piece, new Pos(-1, -1)))
        moves.push(...getLegalOrdinaryMovesInDirection(game, piece, new Pos(1, -1)))
        moves.push(...getLegalOrdinaryMovesInDirection(game, piece, new Pos(-1, 1)))
        moves.push(...getLegalOrdinaryMovesInDirection(game, piece, new Pos(1, 1)))
    } else {
        moves.push(...getLegalKingMovesInDirection(game, piece, new Pos(-1, -1)))
        moves.push(...getLegalKingMovesInDirection(game, piece, new Pos(1, -1)))
        moves.push(...getLegalKingMovesInDirection(game, piece, new Pos(-1, 1)))
        moves.push(...getLegalKingMovesInDirection(game, piece, new Pos(1, 1)))
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
 * @return {Move[]}
 */
function getLegalOrdinaryMovesInDirection(game, piece, direction) {
    const eatingOnly = !isMoveForward(piece, direction)
    const ourSide = piece.sideId

    const nearPos = piece.pos.plus(direction)
    if (!isInTheBoard(nearPos)) return []

    const nearPiece = game.getPieceAt(nearPos)
    if (nearPiece === undefined && !eatingOnly) {
        return [new Move(nearPos)]
    }
    else if (nearPiece !== undefined && isEnemy(nearPiece, ourSide)) {
        const farPos = nearPos.plus(direction)
        if (!isInTheBoard(farPos)) return []

        const farPiece = game.getPieceAt(farPos)
        if (farPiece === undefined) {
            farPos.eating = true
            return [new Move(farPos, nearPiece)]
        }
    }

    return []
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
    return move.target.y === kingLine
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
    const pieceAfterMove = piece.cloneWithNewPos(move.target)
    return getLegalMoves(game, pieceAfterMove, true).length !== 0
}

/**
 * Returns whether the position is in the boundaries of the board
 * @param pos {Pos}
 * @return {boolean}
 */
function isInTheBoard(pos) {
    return pos.x >= 0 && pos.y >= 0 && pos.x < 8 && pos.y < 8
}

/**
 * Returns whether a move in given direction is a forward move for a given piece
 * @param piece {Piece}
 * @param direction {Pos}
 * @returns {boolean}
 */
function isMoveForward(piece, direction) {
    return piece.sideId === Game.SIDE_A
        ? direction.y > 0
        : direction.y < 0
}

/**
 * Returns whether this piece belongs to the opponent of the given side
 * @param piece {Piece}
 * @param sideId {number}
 * @returns {boolean}
 */
function isEnemy(piece, sideId) {
    return piece.sideId !== sideId
}

module.exports = { isAnyEatingPossible, getLegalMoves, isBecomingKing, canContinueAfterMove }
