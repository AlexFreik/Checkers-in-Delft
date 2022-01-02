const connections = new Map()

function registerConnection(playerToken, connection) {
    connection.setPlayerToken(playerToken)
    connections.set(playerToken, connection)
}

function sendMessage(playerTokens, message) {
    playerTokens.forEach(token => {
        const connection = connections.get(token)
        if (!connection) return
        connection.sendMessage(message)
    })
}

module.exports = { registerConnection, sendMessage }
