const { v4: uuid } = require('uuid')
const Game = require('../model/game')

const MAX_GAME_ID = 9999
const MAX_GAMES = 10

const games = new Map()
const players = new Map()

/**
 * Creates a new game
 * @param settings game params
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
 * @param gameId id of the game to join
 * @returns player token or null if joining was impossible
 */
function joinGame(gameId) {
    const game = games.get(gameId)
    if (!game) return null

    if (game.state !== Game.STATE_WAITING_FOR_START) return
    game.playerCount++

    const playerToken = uuid()
    players.set(playerToken, gameId)

    if (game.playerCount === 2) startGame(game)

    return playerToken
}

function startGame(game) {
    console.log("Game started: " + game.gameId)
}

function getGameByPlayer(playerToken) {
    const gameId = players.get(playerToken)
    return games.get(gameId)
}

module.exports = { createGame, joinGame, getGameByPlayer }
