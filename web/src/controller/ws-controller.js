const { createErrorMessage, createWelcomeMessage } = require('./ws-messages')
const { getGameByPlayer } = require('../services/game-service')
const connections = new Map()

function handleMessage(ws, message) {
    console.log('< ' + message)
    try {
        const data = JSON.parse(message)
        const type = data.type
        handlers[type](ws, data)
    } catch (e) {
        sendMessageToSocket(ws, createErrorMessage('Error: ' + e))
    }
}

const handlers = {
    'login': handleLoginMessage,
    'move': handleMoveMessage
}

function handleLoginMessage(ws, data) {
    const token = data.playerToken

    const game = getGameByPlayer(token)
    if (!game) throw Error('Invalid player token')

    connections.set(token, ws)
    sendMessageToSocket(ws, createWelcomeMessage(game.settings))
}

function handleMoveMessage(ws, data) {
    const token = requireToken(ws)
    // TODO
}

function requireToken(ws) {
    const playerToken = ws.playerToken
    if (!playerToken) throw Error('Not logged in')
    return playerToken
}

function sendMessage(playerToken, data) {
    const ws = connections.get(playerToken)
    sendMessageToSocket(ws, data)
}

function sendMessageToSocket(ws, data) {
    const message = JSON.stringify(data)
    console.log('> ' + message)
    ws.send(message)
}

module.exports = { handleMessage, sendMessage }
