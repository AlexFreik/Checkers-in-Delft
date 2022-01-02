const connections = new Map()

/**
 * Associates given player token with given connection.
 * Allows messages to be sent to this player.
 * @param playerToken {string}
 * @param connection {Connection}
 */
function registerConnection(playerToken, connection) {
    connection.playerToken = playerToken
    connections.set(playerToken, connection)
}

/**
 * Sends a message to given players
 * @param playerTokens {string[]} receivers
 * @param message {object} message to send
 */
function sendMessage(playerTokens, message) {
    playerTokens.forEach(token => {
        const connection = connections.get(token)
        if (!connection) return
        connection.sendMessage(message)
    })
}

module.exports = { registerConnection, sendMessage }
