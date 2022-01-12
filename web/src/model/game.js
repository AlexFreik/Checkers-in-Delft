const Piece = require('./piece')
const { getOnlyKey } = require('../util/map-utils')

class Game {
    static STATE_WAITING_FOR_START = 'waiting-for-start'
    static STATE_IN_PROGRESS = 'in-progress'
    static STATE_FINISHED = 'finished'

    static BOARD_SIZE = 8
    static PIECES_ROWS = 3

    static SIDE_A = 0 // Bottom side
    static SIDE_B = 1 // Top side

    /**
     * Creates a new game
     * @param gameId {string}
     * @param settings {GameSettings}
     */
    constructor(gameId, settings) {
        this.gameId = gameId
        this.settings = settings
        this.state = Game.STATE_WAITING_FOR_START
        this.playerMap = new Map()
        this.pieces = createPieces()
    }

    /**
     * @return {string[]}
     */
    get players() {
        return Array.from(this.playerMap.values())
    }

    /**
     * @return {number}
     */
    get playersCount() {
        return this.playerMap.size
    }

    /**
     * Adds player to the player list at random (or the remaining) side
     * @param playerId {string}
     */
    addPlayer(playerId) {
        const sideId =
            this.playerMap.size === 1 ? Game.getOppositeSide(getOnlyKey(this.playerMap)) : Game.getRandomSide()
        this.playerMap.set(sideId, playerId)
    }

    /**
     * Marks the game as started
     */
    start() {
        this.state = Game.STATE_IN_PROGRESS
        this.currentSideId = Game.SIDE_A
    }

    switchSides() {
        this.currentSideId = Game.getOppositeSide(this.currentSideId)
    }

    /**
     * Removes a piece from the board
     * @param victim {Piece}
     */
    removePiece(victim) {
        this.pieces = this.pieces.filter((piece) => piece !== victim)
    }

    /**
     * Marks the game as finished and won by given player
     * @param winnerSideId {number}
     */
    finish(winnerSideId) {
        this.state = Game.STATE_FINISHED
        this.winnerSideId = winnerSideId
    }

    /**
     * Returns the side the player plays on
     * @param playerId {string}
     * @return {number | undefined}
     */
    getPlayerSide(playerId) {
        return Array.from(this.playerMap.entries())
            .find(([, p]) => p === playerId)
            ?.at(0)
    }

    /**
     * Returns the id of the opponent of the player with given id
     * @param playerId {string}
     * @return {string | undefined}
     */
    getOpponentOf(playerId) {
        const mySide = this.getPlayerSide(playerId)
        if (mySide === undefined) return undefined
        return this.playerMap.get(Game.getOppositeSide(mySide))
    }

    /**
     * Returns a piece at a given position
     * @param pos {Pos}
     * @return {Piece | undefined}
     */
    getPieceAt(pos) {
        return this.pieces.find((piece) => piece.pos.equals(pos))
    }

    /**
     * @return {number}
     */
    static getRandomSide() {
        return Math.random() < 0.5 ? Game.SIDE_A : Game.SIDE_B
    }

    /**
     * @param sideId {number}
     * @return {number}
     */
    static getOppositeSide(sideId) {
        return sideId === this.SIDE_A ? Game.SIDE_B : Game.SIDE_A
    }
}

function createPieces() {
    const pieces = []
    for (let y = 0; y < Game.PIECES_ROWS; y++) {
        for (let x = y % 2; x < Game.BOARD_SIZE; x += 2) {
            pieces.push(new Piece(x, y, Game.SIDE_A))
        }
    }
    for (let y = Game.BOARD_SIZE - Game.PIECES_ROWS; y < Game.BOARD_SIZE; y++) {
        for (let x = y % 2; x < Game.BOARD_SIZE; x += 2) {
            pieces.push(new Piece(x, y, Game.SIDE_B))
        }
    }
    return pieces
}

module.exports = Game
