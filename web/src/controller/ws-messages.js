const createWelcomeMessage = (settings) => ({
    type: 'welcome',
    settings: settings
})

const createErrorMessage = (message) => ({
    type: 'error',
    message: message
})

module.exports = { createWelcomeMessage, createErrorMessage }
