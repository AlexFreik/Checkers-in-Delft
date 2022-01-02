const { createErrorMessage } = require('./messages')
const handleLogin = require('../handler/login-handler')
const handleMove = require('../handler/move-handler')
const Connection = require('./connection')
const ApiError = require('../util/api-error')

const handlers = {
    'login': handleLogin,
    'move': handleMove
}

function handleConnection(ws) {
    ws.connection = new Connection(message => sendMessage(ws, message))
    ws.on('message', function(message) {
        handleMessage(ws, message)
    })
}

function handleMessage(ws, rawMessage) {
    try {
        console.log('< ' + rawMessage)
        const data = JSON.parse(rawMessage)
        const type = data.type
        handlers[type](ws.connection, data)
    } catch (e) {
        if (!(e instanceof ApiError)) throw e
        sendMessage(ws, createErrorMessage('Error: ' + e.message))
    }
}

function sendMessage(ws, message) {
    const rawMessage = JSON.stringify(message)
    console.log('> ' + rawMessage)
    ws.send(rawMessage)
}

module.exports = { handleConnection }
