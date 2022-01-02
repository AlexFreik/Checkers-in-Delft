const connectionRegistry = require('../controller/connection-registry')

function sendMessage(playerToken, message) {
    const connection = connectionRegistry.getConnection(playerToken)
    if (!connection) return
    connection.sendMessage(message)
}

module.exports = { sendMessage }
