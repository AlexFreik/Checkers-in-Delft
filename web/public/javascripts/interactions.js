moveTest = function () {
    let x = parseInt(document.getElementById('x').innerHTML)
    let outMsg = Messages.MOVE;
    outMsg.x = x;

    console.log(websocket)
    websocket.send(JSON.stringify(outMsg))
}
