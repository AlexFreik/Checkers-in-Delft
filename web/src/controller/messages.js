/**
 * @param settings {object}
 * @returns {object}
 */
const createWelcomeMessage = (settings) => ({
    type: 'welcome', settings
})

/**
 * @param state {string} game state
 * @param currentPlayerId {string=} current player's id
 * @param winnerId {string=} winner player's id
 * @returns {object}
 */
const createGameStateMessage = (state, currentPlayerId, winnerId) => ({
    type: 'game-state', state, currentPlayerId, winnerId
})

/**
 * @param from {Pos}
 * @param to {Pos}
 * @param eaten {Pos=}
 * @returns {object}
 */
const createMoveMessage = (from, to, eaten) => ({
    type: 'move',
    from: {
        col: from.x,
        row: from.y
    },
    to: {
        col: to.x,
        row: to.y
    },
    eatenPiece: eaten ? {
        col: eaten.x,
        row: eaten.y
    } : undefined
})

/**
 * @param message {string}
 * @returns {object}
 */
const createErrorMessage = (message) => ({
    type: 'error', message
})

module.exports = { createWelcomeMessage, createGameStateMessage, createMoveMessage, createErrorMessage }
