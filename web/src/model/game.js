class Game {
    static STATE_WAITING_FOR_START = 'waiting-for-start'
    static STATE_IN_PROGRESS = 'in-progress'
    static STATE_FINISHED = 'finished'

    constructor(gameId) {
        this.gameId = gameId
        this.state = Game.STATE_WAITING_FOR_START
        this.playerCount = 0
    }
}

module.exports = Game
