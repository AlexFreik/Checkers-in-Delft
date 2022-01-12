/**
 * @type {Map<string, Connection>}
 */
const connections = new Map()

/**
 * Associates given player id with given connection.
 * Allows messages to be sent to this player.
 * @param playerId {string}
 * @param connection {Connection}
 */
function registerConnection(playerId, connection) {
    connection.playerId = playerId
    connections.set(playerId, connection)
}

/**
 * Unregisters given player
 * @param playerId {string}
 */
function unregisterConnection(playerId) {
    connections.delete(playerId)
}

/**
 * Sends a message to given players
 * @param playerIds {string[]} receivers
 * @param message {object} message to send
 */
function sendMessage(playerIds, message) {
    playerIds.forEach((id) => {
        const connection = connections.get(id)
        if (!connection) return
        connection.sendMessage(message)
    })
}

function kickOut(playerIds) {
    playerIds.forEach((id) => {
        const connection = connections.get(id)
        if (!connection) return
        connection.close()
        connections.delete(id)
    })
}

module.exports = { registerConnection, unregisterConnection, sendMessage, kickOut }
