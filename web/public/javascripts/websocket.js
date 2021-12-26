//set up WebSocket
;(function initFrontendWS() {
    const target = document.getElementById('hello')
    console.log(target)

    const socket = new WebSocket(consts.WEB_SOCKET_URL)

    socket.onmessage = function (event) {
        target.innerHTML = event.data
        // let incomingMsg = JSON.parse(event.data)
        // let outgoingMsg = { success: true, data: 'hello world' }
        // socket.send(JSON.stringify(outgoingMsg))
    }

    socket.onopen = function () {
        socket.send('Hello from the client!')
        target.innerHTML = 'Sending a first message to the server ...'
    }

    // server sends a close event only if the game was aborted from some side
    socket.onclose = function () {
        console.log('game aborted')
    }

    socket.onerror = function () {}
})() //execute immediately
