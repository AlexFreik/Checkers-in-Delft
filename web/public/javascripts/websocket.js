//set up WebSocket
function initFrontendWS() {
    const socket = new WebSocket(Setup.WEB_SOCKET_URL)

    socket.onmessage = function (event) {
        console.log(event)
        let inMsg = JSON.parse(event.data)
        if (inMsg.type === 'move') {

        }

        // target.innerHTML = parseInt(event.data)
        // let inMsg = JSON.parse(event.data)
        // let outgoingMsg = { success: true, data: 'hello world' }
        // socket.send(JSON.stringify(outgoingMsg))
    }

    socket.onopen = function () {
        socket.send(
            JSON.stringify({ type: 'HELLO', data: 'Hello from the client!' })
        )
        console.log('frontend connection log')
    }

    // server sends a close event only if the game was aborted from some side
    socket.onclose = function () {
        console.log('game aborted')
    }

    socket.onerror = function () {}

    return socket
}
let websocket = undefined