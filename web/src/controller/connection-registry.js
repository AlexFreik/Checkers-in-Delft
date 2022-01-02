const connections = new Map()

/**
 * Associates given player token with given connection.
 * Allows messages to be sent to this player.
 * @param playerId {string}
 * @param connection {Connection}
 */
function registerConnection(playerId, connection) {
    connection.playerId = playerId
    connections.set(playerId, connection)
}

/**
 * Sends a message to given players
 * @param playerIds {string[]} receivers
 * @param message {object} message to send
 */
function sendMessage(playerIds, message) {
    playerIds.forEach(id => {
        const connection = connections.get(id)
        if (!connection) return
        connection.sendMessage(message)
    })
}

module.exports = { registerConnection, sendMessage }
