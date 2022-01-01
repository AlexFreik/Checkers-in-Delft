//set up WebSocket
function initFrontendWS() {
    const socket = new WebSocket(Setup.WEB_SOCKET_URL)

    socket.onopen = function () {
        sendMsg(createLoginMsg(game.playerToken))
    }

    socket.onmessage = function (event) {
        console.log(event)
        let data = JSON.parse(event.data)
        handlers[data.type](data)
    }

    // server sends a close event only if the game was aborted from some side
    socket.onclose = function () {
        console.log('game aborted')
    }

    socket.onerror = function () {}

    return socket
}
const handlers = {
    welcome: handleWelcomeMsg,
    move: handleMoveMsg,
    'game-state': handleGameStateMsg,
    error: () => {},
}

function handleWelcomeMsg(data) {
    game.settings = data.settings
    game.side = data.side
}
function handleMoveMsg(data) {
    game.movePiece(data.from, data.to)
    if (data.eatenPiece) game.removePiece(data.eatenPiece)
}
function handleGameStateMsg(data) {
    if (data.state === 'in-progress') game.currentPlayer = data.currentPlayer
    if (data.state === 'finished') {
        currScreenElems.alertMsg = new AlertMsg(
            'GAME OVER',
            'You' + game.side === data.winnerId ? 'won!' : 'lost...',
            function () {
                game = undefined
                currScreenElems = homeScreenElems
            }
        )
    }
}

function sendMsg(msg) {
    websocket.send(JSON.stringify(msg))
}
let websocket = undefined
