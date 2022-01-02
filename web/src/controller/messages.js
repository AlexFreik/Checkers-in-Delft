const createWelcomeMessage = (settings) => ({
    type: 'welcome', settings
})

const createGameStateMessage = (state, currentPlayer, winnerId) => ({
    type: 'game-state', state, currentPlayer, winnerId
})

const createMoveMessage = (state, from, to) => ({
    type: 'game-state', state,
    from: {
        col: from.x,
        row: from.y
    },
    to: {
        col: to.x,
        row: to.y
    }
})

const createErrorMessage = (message) => ({
    type: 'error', message
})

module.exports = { createWelcomeMessage, createGameStateMessage, createMoveMessage, createErrorMessage }
