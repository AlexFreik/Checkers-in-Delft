const gameService = require('../services/game-service')
const { requirePlayerToken } = require('./handler-utils')

/**
 * @param connection {Connection}
 * @param message {object}
 */
function handleMove(connection, message) {
    const token = requirePlayerToken(connection)
    const from = new Pos(message.from.col, message.from.row)
    const to = new Pos(message.to.col, message.to.row)
    gameService.performMove(token, from, to)
}

module.exports = handleMove
