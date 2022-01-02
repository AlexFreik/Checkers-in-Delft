const gameService = require('../services/game-service')
const connectionRegistry = require('../controller/connection-registry')
const ApiError = require('../util/api-error')

/**
 * @param connection {Connection}
 * @param message {object}
 */
function handleLogin(connection, message) {
    const playerId = message.playerId

    const game = gameService.getGameByPlayer(playerId)
    if (!game) throw new ApiError('Invalid player id')

    connectionRegistry.registerConnection(playerId, connection)
    gameService.sendWelcome(playerId, game)
    gameService.sendGameState([playerId], game)
}

module.exports = handleLogin
