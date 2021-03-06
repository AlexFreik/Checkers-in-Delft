const WEB_SOCKET_URL = 'ws://localhost:3000'

//set up WebSocket
function initFrontendWS() {
    const socket = new WebSocket(WEB_SOCKET_URL)

    socket.onopen = () => {
        sendMsg(createLoginMsg(game.playerId))
    }

    socket.onmessage = (event) => {
        let data = JSON.parse(event.data)
        console.log('server >> ' + JSON.stringify(data))
        handlers[data.type](data)
        window.requestAnimationFrame(drawScreen)
    }

    // server sends a close event only if the game was aborted from some side
    socket.onclose = () => {
        console.log('game aborted')
    }

    socket.onerror = () => {}

    return socket
}
const handlers = {
    welcome: handleWelcomeMsg,
    move: handleMoveMsg,
    'game-state': handleGameStateMsg,
    error: () => {},
}

/**
 *
 * @param {{type: 'welcome', settings: {forceJumps: boolean}, sideId: {number}}} data
 */
function handleWelcomeMsg(data) {
    game.settings = data.settings
    game.sideId = data.sideId

    currScreenElems = gameScreenElems
    window.requestAnimationFrame(drawScreen)
}

/**
 *
 * @param {{type: 'move', from: {col: number, row: number}, to: {col: number, row: number}, eatenPiece: {col: number, row: number}, becameKing: boolean}} data
 */
function handleMoveMsg(data) {
    game.movePiece(data.from, data.to)
    if (data.eatenPiece) game.removePiece(data.eatenPiece)
    if (data.becameKing) game.makeKing(data.to)
}

/**
 *
 * @param {{type: 'game-state', state: {string}, currentSideId: {number}, currentPlayerId: {string}, winnerSideId: {number}}} data
 */
function handleGameStateMsg(data) {
    if (data.state === 'in-progress') game.currentSideId = data.currentSideId
    if (data.state === 'finished') {
        currScreenElems.alertMsg = new AlertMsg(
            'GAME OVER',
            'You ' + (game.sideId === data.winnerSideId ? 'won!' : 'lost...'),
            function () {
                game = undefined
                currScreenElems = homeScreenElems
            }
        )
    }
}

const senders = {
    move: sendMoveMsg,
}

/**
 *
 * @param {Coords} from
 * @param {Coords} to
 */
function sendMoveMsg(from, to) {
    sendMsg(createMoveMsg(from, to))
}

/**
 *
 * @param {{type: string, }}msg
 */
function sendMsg(msg) {
    console.log('server << ' + JSON.stringify(msg))
    websocket.send(JSON.stringify(msg))
}
let websocket = undefined
