const gameService = require('../service/game-service')
const { requirePlayerId } = require('./handler-utils')
const Pos = require('../model/pos')

/**
 * @param connection {Connection}
 * @param message {object}
 */
function handleMove(connection, message) {
    const playerId = requirePlayerId(connection)
    const from = new Pos(message.from.col, message.from.row)
    const to = new Pos(message.to.col, message.to.row)
    gameService.performMove(playerId, from, to)
}

module.exports = handleMove
