const gameService = require('../services/game-service')
const { createWelcomeMessage } = require('../controller/messages')
const connectionRegistry = require('../controller/connection-registry')
const ApiError = require('../util/api-error')

/**
 * @param connection {Connection}
 * @param message {object}
 */
function handleLogin(connection, message) {
    const token = message.playerToken

    const game = gameService.getGameByPlayer(token)
    if (!game) throw new ApiError('Invalid player token')

    connectionRegistry.registerConnection(token, connection)
    connectionRegistry.sendMessage([token], createWelcomeMessage(game.settings))
    gameService.sendGameState(token, game)
}

module.exports = handleLogin
