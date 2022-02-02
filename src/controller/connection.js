class Connection {
    /**
     * Creates a new connection
     * @param sendMessage {function(object)} function for sending messages
     * @param close {function()} function for closing the connection
     */
    constructor(sendMessage, close) {
        this.sendMessage = sendMessage
        this.close = close
        this.playerId = undefined
    }
}

module.exports = Connection
