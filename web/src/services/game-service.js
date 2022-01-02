const { v4: uuid } = require('uuid')
const Game = require('../model/game')
const { sendMessage } = require('../controller/connection-registry')
const { createGameStateMessage } = require('../controller/messages')

const MAX_GAME_ID = 9999
const MAX_GAMES = 10

const games = new Map()
const players = new Map()

/**
 * Creates a new game
 * @param settings {object} game params
 * @returns id of the new game or null if it could not be created
 */
function createGame(settings) {
    if (games.size >= MAX_GAMES) return null

    const gameId = createNewGameId()
    const game = new Game(gameId, settings)
    games.set(gameId, game)

    return gameId
}

function createNewGameId() {
    const id = Math.floor(Math.random() * (MAX_GAME_ID + 1))
    return games.has(id) ? createNewGameId() : id
}

/**
 * Joins an existing game
 * @param gameId {number} id of the game to join
 * @returns player token or null if joining was impossible
 */
function joinGame(gameId) {
    const game = games.get(gameId)
    if (!game) return null

    if (game.state !== Game.STATE_WAITING_FOR_START) return

    const playerToken = uuid()
    players.set(playerToken, gameId)

    game.addPlayer(playerToken)

    if (game.players.length === 2) startGame(game)

    return playerToken
}

function startGame(game) {
    console.log("Game started: " + game.gameId)
    game.start()
    sendGameState(game.players, game)
}

function getGameByPlayer(playerToken) {
    const gameId = players.get(playerToken)
    return games.get(gameId)
}

function sendGameState(playerTokens, game) {
    sendMessage(playerTokens, createGameStateMessage(game.state, game.currentPlayer, game.winnerId))
}

module.exports = { createGame, joinGame, getGameByPlayer, sendGameState }
