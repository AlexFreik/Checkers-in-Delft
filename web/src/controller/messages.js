/**
 * @param settings {object}
 * @returns {object}
 */
const createWelcomeMessage = (settings) => ({
    type: 'welcome', settings
})

/**
 * @param state {string} game state
 * @param currentPlayer {string} current player's token
 * @param winnerId winner player's token
 * @returns {object}
 */
const createGameStateMessage = (state, currentPlayer, winnerId) => ({
    type: 'game-state', state, currentPlayer, winnerId
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
