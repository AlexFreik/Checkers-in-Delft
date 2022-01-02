const gameService = require('../services/game-service')
const { createWelcomeMessage } = require('../controller/ws-messages')
const outputGateway = require('../controller/output-gateway')
const connectionRegistry = require('../controller/connection-registry')

function handleLogin(connection, message) {
    const token = message.playerToken

    const game = gameService.getGameByPlayer(token)
    if (!game) throw Error('Invalid player token')

    connection.setPlayerToken(token)
    connectionRegistry.registerConnection(token, connection)
    outputGateway.sendMessage(token, createWelcomeMessage(game.settings))
    gameService.sendGameState(token, game)
}

module.exports = handleLogin
