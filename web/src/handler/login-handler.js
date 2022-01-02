const gameService = require('../services/game-service')
const { createWelcomeMessage } = require('../controller/messages')
const connectionRegistry = require('../controller/connection-registry')
const ApiError = require('../util/api-error')

/**
 * @param connection {Connection}
 * @param message {object}
 */
function handleLogin(connection, message) {
    const playerId = message.playerToken

    const game = gameService.getGameByPlayer(playerId)
    if (!game) throw new ApiError('Invalid player token')

    connectionRegistry.registerConnection(playerId, connection)
    connectionRegistry.sendMessage([playerId], createWelcomeMessage(game.settings))
    gameService.sendGameState([playerId], game)
}

module.exports = handleLogin
