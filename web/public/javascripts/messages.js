/**
 *
 * @param {Coords} from
 * @param {Coords} to
 * @return {{from: {col, row}, to: {col, row}, type: string}}
 */
function createMoveMsg(from, to) {
    return {
        type: 'move',
        from: { col: from.col, row: from.row },
        to: { col: to.col, row: to.row },
    }
}

/**
 *
 * @param {string} playerId
 * @return {{type: string, playerId: string}}
 */
function createLoginMsg(playerId) {
    return {
        type: 'login',
        playerId: playerId,
    }
}

/**
 *
 * @return {{type: string}}
 */
function createSurrenderMsg() {
    return {
        type: 'surrender',
    }
}
