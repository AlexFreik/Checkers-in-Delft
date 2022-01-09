const connectionRegistry = require('../controller/connection-registry')

/**
 * @param connection {Connection}
 * @param message {object}
 */
function handleDisconnect(connection, message) {
    const playerId = connection.playerId
    if (playerId === undefined) return

    connectionRegistry.unregisterConnection(playerId)
    // TODO Abandon the game
}

module.exports = handleDisconnect
