const Piece = require('./piece')

class Game {
    static STATE_WAITING_FOR_START = 'waiting-for-start'
    static STATE_IN_PROGRESS = 'in-progress'
    static STATE_FINISHED = 'finished'

    static BOARD_SIZE = 8
    static PIECES_ROWS = 3

    static SIDE_A = 0
    static SIDE_B = 1

    /**
     * Creates a new game
     * @param gameId {string}
     * @param settings {object}
     */
    constructor(gameId, settings) {
        this.gameId = gameId
        this.settings = settings
        this.state = Game.STATE_WAITING_FOR_START
        this.players = [] // TODO Use Map for higher flexibility of side management
        this.pieces = createPieces()
    }

    /**
     * Adds player to the player list
     * @param playerId {string}
     */
    addPlayer(playerId) {
        this.players.push(playerId)
    }

    /**
     * Marks the game as started.
     * @param startingSideId {number}
     */
    start(startingSideId) {
        this.state = Game.STATE_IN_PROGRESS
        this.currentSideId = startingSideId
    }

    /**
     * Returns the side the player plays on
     * @param playerId {string}
     * @return {number}
     */
    getPlayerSide(playerId) {
        return this.players.indexOf(playerId)
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
