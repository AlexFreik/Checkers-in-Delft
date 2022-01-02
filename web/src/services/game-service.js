const { v4: uuid } = require('uuid')
const Game = require('../model/game')
const { sendMessage } = require('../controller/connection-registry')
const { createGameStateMessage, createMoveMessage, createWelcomeMessage } = require('../controller/messages')
const ApiError = require('../util/api-error')

const MAX_GAME_ID = 9999
const MAX_GAMES = 10

const games = new Map()
const players = new Map()

/**
 * Creates a new game
 * @param settings {object} game params
 * @returns id of the new game
 * @throws {Error} if game could not be created
 */
function createGame(settings) {
    if (games.size >= MAX_GAMES) throw new ApiError('Too many games')

    const gameId = createNewGameId()
    const game = new Game(gameId, settings)
    games.set(gameId, game)

    return gameId
}

function createNewGameId() {
    const id = Math.floor(Math.random() * MAX_GAME_ID) + 1
    return games.has(id) ? createNewGameId() : id.toString()
}

/**
 * Joins an existing game
 * @param gameId {string} id of the game to join
 * @returns player id
 * @throws {Error} if joining was impossible
 */
function joinGame(gameId) {
    const game = games.get(gameId)
    if (!game) throw new ApiError('Game does not exist')

    if (game.state !== Game.STATE_WAITING_FOR_START) throw new ApiError('Game already started')

    const playerId = uuid()
    players.set(playerId, gameId)

    game.addPlayer(playerId)

    if (game.players.length === 2) startGame(game)

    return playerId
}

/**
 * Starts a game
 * @param game {Game} game to start
 */
function startGame(game) {
    console.log("Game started: " + game.gameId)
    game.start(Math.random() < 0.5 ? Game.SIDE_A : Game.SIDE_B)
    sendGameState(game.players, game)
}

/**
 * Performs a move
 * @param playerId {string} player performing the move
 * @param from {Pos} origin
 * @param to {Pos} target
 * @throws {Error} if move was impossible
 */
function performMove(playerId, from, to) {
    const game = getGameByPlayer(playerId)
    if (!game || game.state !== Game.STATE_IN_PROGRESS) throw new ApiError('Game not in progress')
    if (game.currentSideId !== game.getPlayerSide(playerId)) throw new ApiError('Move not possible now')
    // TODO Implement move validation
    sendMessage(game.players, createMoveMessage(from, to))
}

/**
 * Returns the game the player is participating in
 * @param playerId {string} token of the player to check
 * @returns {Game | undefined}
 */
function getGameByPlayer(playerId) {
    const gameId = players.get(playerId)
    if (!gameId) return undefined
    return games.get(gameId)
}

/**
 * Sends the welcome message to the specified player
 * @param playerId {string}
 * @param game {Game}
 */
function sendWelcome(playerId, game) {
    sendMessage([playerId], createWelcomeMessage(game.settings, game.getPlayerSide(playerId)))
}

/**
 * Sends the current game state to the specified players
 * @param playerIds {string[]}
 * @param game {Game}
 */
function sendGameState(playerIds, game) {
    sendMessage(playerIds, createGameStateMessage(game.state, game.currentSideId, game.winnerSideId))
}

module.exports = { createGame, joinGame, performMove, getGameByPlayer, sendWelcome, sendGameState }
