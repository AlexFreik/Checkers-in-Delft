function createMoveMsg(from, to) {
    return {
        type: 'move',
        from: from,
        to: to,
    }
}
function createLoginMsg(playerToken) {
    return {
        type: 'login',
        playerToken: playerToken,
    }
}
function createSurrenderMsg() {
    return {
        type: 'surrender',
    }
}
