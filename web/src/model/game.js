class Game {
    static STATE_WAITING_FOR_START = 'waiting-for-start'
    static STATE_IN_PROGRESS = 'in-progress'
    static STATE_FINISHED = 'finished'

    /**
     * Creates a new game
     * @param gameId {string}
     * @param settings {object}
     */
    constructor(gameId, settings) {
        this.gameId = gameId
        this.settings = settings
        this.state = Game.STATE_WAITING_FOR_START
        this.players = []
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
     * TODO Pick the first player randomly
     */
    start() {
        this.state = Game.STATE_IN_PROGRESS
        this.currentPlayer = this.players[0]
    }
}

module.exports = Game
