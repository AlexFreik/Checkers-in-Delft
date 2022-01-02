const ApiError = require('../util/api-error')

/**
 * Returns id of the player this connection is associated with
 * @param connection {Connection}
 * @returns {string}
 */
function requirePlayerId(connection) {
    const id = connection.playerId
    if (!id) throw new ApiError('Not logged in')
    return id
}

module.exports = { requirePlayerId }
