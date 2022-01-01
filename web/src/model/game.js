class Game {
    static STATE_WAITING_FOR_START = 'waiting-for-start'
    static STATE_IN_PROGRESS = 'in-progress'
    static STATE_FINISHED = 'finished'

    constructor(gameId, settings) {
        this.gameId = gameId
        this.settings = settings
        this.state = Game.STATE_WAITING_FOR_START
        this.players = []
    }

    addPlayer(playerToken) {
        this.players.push(playerToken)
    }

    start() {
        this.state = Game.STATE_IN_PROGRESS
        this.currentPlayer = this.players[0]
    }
}

module.exports = Game
