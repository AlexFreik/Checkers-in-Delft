const connectionRegistry = require('../controller/connection-registry')
const gameService = require('../service/game-service')

/**
 * @param connection {Connection}
 * @param message {object}
 */
function handleDisconnect(connection, message) {
    const playerId = connection.playerId
    if (playerId === undefined) return

    connectionRegistry.unregisterConnection(playerId)
    gameService.abandonGame(playerId)
}

module.exports = handleDisconnect
