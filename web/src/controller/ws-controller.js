const { createErrorMessage, createWelcomeMessage } = require('./ws-messages')
const { getGameByPlayer, sendGameState } = require('../services/game-service')

const connections = new Map()

function handleMessage(ws, rawMessage) {
    try {
        console.log('< ' + rawMessage)
        const data = JSON.parse(rawMessage)
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

function handleLoginMessage(ws, message) {
    const token = message.playerToken

    const game = getGameByPlayer(token)
    if (!game) throw Error('Invalid player token')

    connections.set(token, ws)
    sendMessageToSocket(ws, createWelcomeMessage(game.settings))
    sendGameState(token)
}

function handleMoveMessage(ws, message) {
    const token = requireToken(ws)
    // TODO
}

function requireToken(ws) {
    const playerToken = ws.playerToken
    if (!playerToken) throw Error('Not logged in')
    return playerToken
}

function sendMessage(playerToken, message) {
    const ws = connections.get(playerToken)
    sendMessageToSocket(ws, message)
}

function sendMessageToSocket(ws, message) {
    const rawMessage = JSON.stringify(message)
    console.log('> ' + rawMessage)
    ws.send(rawMessage)
}

module.exports = { handleMessage, sendMessage }
