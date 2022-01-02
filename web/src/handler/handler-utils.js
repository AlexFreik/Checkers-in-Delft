const ApiError = require('../util/api-error')

/**
 * Returns token of the player this connection is associated with
 * @param connection {Connection}
 * @returns {string}
 */
function requirePlayerToken(connection) {
    const token = connection.playerToken
    if (!token) throw new ApiError('Not logged in')
    return token
}

module.exports = { requirePlayerToken }
