class Connection {
    /**
     * Creates a new connection
     * @param sendMessage {function(string)} function for sending messages
     */
    constructor(sendMessage) {
        this.sendMessage = sendMessage
        this.playerId = undefined
    }
}

module.exports = Connection
