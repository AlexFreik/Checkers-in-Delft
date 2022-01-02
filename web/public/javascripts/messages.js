/**
 *
 * @param {Coords} from
 * @param {Coords} to
 * @return {{from: {col, row}, to: {col, row}, type: string}}
 */
function createMoveMsg(from, to) {
    return {
        type: 'move',
        from: {col: from.col, row: from.row},
        to: {col: to.col, row: to.row},
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
