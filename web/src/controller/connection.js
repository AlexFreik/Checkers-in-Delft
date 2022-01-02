class Connection {
    constructor(sendMessage) {
        this.sendMessage = sendMessage
    }

    requirePlayerToken() {
        if (!this.playerToken) throw Error('Not logged in')
        return this.playerToken
    }

    setPlayerToken(playerToken) {
        this.playerToken = playerToken
    }
}

module.exports = { Connection }
