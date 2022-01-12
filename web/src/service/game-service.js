const { v4: uuid } = require('uuid')
const Game = require('../model/game')
const { sendMessage, kickOut } = require('../controller/connection-registry')
const { createGameStateMessage, createMoveMessage, createWelcomeMessage } = require('../controller/messages')
const ApiError = require('../util/api-error')
const Stats = require('../model/stats')
const { getLegalMoves, canContinueAfterMove, isAnyMovePossible, isBecomingKing } = require('./logic-service')

const MAX_GAME_ID = 9999
const MAX_GAMES = 10

/**
 * gameId -> Game
 * @type {Map<string, Game>}
 */
const games = new Map()
/**
 * playerId -> gameId
 * @type {Map<string, string>}
 */
const players = new Map()
/**
 * @type {Stats}
 */
const stats = new Stats()

/**
 * Creates a new game
 * @param settings {GameSettings} game params
 * @returns {string} id of the new game
 * @throws {Error} if game could not be created
 */
function createGame(settings) {
    if (games.size >= MAX_GAMES) throw new ApiError('Too many games')

    const gameId = createNewGameId()
    const game = new Game(gameId, settings)
    games.set(gameId, game)
    stats.waitingForStartGamesNum += 1

    return gameId
}

/**
 * Creates a new game id
 * @returns {string}
 */
function createNewGameId() {
    const id = Math.floor(Math.random() * MAX_GAME_ID) + 1
    return games.has(id) ? createNewGameId() : id.toString()
}

/**
 * Joins an existing game
 * @param gameId {string} id of the game to join
 * @returns {string} player id
 * @throws {Error} if joining was impossible
 */
function joinGame(gameId) {
    const game = games.get(gameId)
    if (!game) throw new ApiError('Game does not exist')

    if (game.state !== Game.STATE_WAITING_FOR_START) throw new ApiError('Game already started')

    const playerId = uuid()
    players.set(playerId, gameId)

    game.addPlayer(playerId)

    if (game.playersCount === 2) startGame(game)

    return playerId
}

/**
 * Starts a game
 * @param game {Game} game to start
 */
function startGame(game) {
    game.start()
    stats.waitingForStartGamesNum -= 1
    stats.inProgressGamesNum += 1
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

    const playerSide = game.getPlayerSide(playerId)
    if (game.currentSideId !== playerSide) throw new ApiError('Move not possible now')

    const movingPiece = game.getPieceAt(from)
    if (!movingPiece || movingPiece.sideId !== playerSide) throw new ApiError('Invalid piece')
    if (game.currentMovingPiece && movingPiece !== game.currentMovingPiece)
        throw new ApiError('Compound move in progress')

    const mustEat = game.currentMovingPiece !== undefined || isAnyMovePossible(game, true)
    const legalMoves = getLegalMoves(game, movingPiece, mustEat)
    const foundMove = legalMoves.find((move) => move.target.equals(to))
    if (!foundMove) throw new ApiError('Illegal move')

    movingPiece.pos = foundMove.target

    const becomingKing = isBecomingKing(game, movingPiece, foundMove)
    if (becomingKing) movingPiece.king = true

    if (foundMove.eating) game.removePiece(foundMove.eating)

    sendMove(game.players, from, to, foundMove.eating?.pos, becomingKing)

    if (!canContinueAfterMove(game, movingPiece, foundMove)) {
        game.switchSides()
        game.currentMovingPiece = undefined
        if (!isAnyMovePossible(game, false)) {
            finishGame(game, Game.getOppositeSide(game.currentSideId))
        } else {
            sendGameState(game.players, game)
        }
    } else {
        game.currentMovingPiece = movingPiece
    }
}

/**
 * Abandons the game. The opponent of the player that left wins
 * @param playerId {string} player that left
 */
function abandonGame(playerId) {
    const game = getGameByPlayer(playerId)
    if (!game || game.state !== Game.STATE_IN_PROGRESS) throw new ApiError('Game not in progress')

    finishGame(game, game.getOpponentOf(playerId))
}

/**
 * Finishes the game and cleans up
 * @param game {Game}
 * @param winnerSideId {number}
 */
function finishGame(game, winnerSideId) {
    stats.waitingForStartGamesNum -= 1
    stats.inProgressGamesNum += 1

    game.finish(winnerSideId)
    sendGameState(game.players, game)
    kickOut(game.players)

    games.delete(game.gameId)
    game.players.forEach((playerId) => players.delete(playerId))
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

/**
 * Sends the move to the specified players
 * @param playerIds {string[]}
 * @param from {Pos}
 * @param to {Pos}
 * @param eaten {Pos=}
 * @param becameKing {boolean}
 */
function sendMove(playerIds, from, to, eaten, becameKing) {
    sendMessage(playerIds, createMoveMessage(from, to, eaten, becameKing))
}

module.exports = {
    stats,
    createGame,
    joinGame,
    performMove,
    abandonGame,
    getGameByPlayer,
    sendWelcome,
    sendGameState,
}
