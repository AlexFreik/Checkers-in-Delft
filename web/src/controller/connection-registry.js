const connections = new Map()

function registerConnection(playerToken, connection) {
    connections.set(playerToken, connection)
}

function getConnection(playerToken) {
    return connections.get(playerToken)
}

module.exports = { registerConnection, getConnection }
