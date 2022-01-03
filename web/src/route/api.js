const express = require('express')
const router = express.Router()

const { createGame, joinGame } = require('../service/game-service')
const ApiError = require('../util/api-error')

// prettier-ignore
router.post('/create-game', handle((req, res) => {
    const settings = req.body.settings

    const gameId = createGame(settings)
    const playerId = joinGame(gameId)

    res.send({
        gameId: gameId,
        playerId: playerId,
    })
}))

// prettier-ignore
router.post('/join-game', handle((req, res) => {
    const gameId = req.body.gameId
    if (gameId === undefined) throw new ApiError('gameId is missing')

    const playerId = joinGame(gameId)

    res.send({
        playerId: playerId,
    })
}))

function handle(handler) {
    return (req, res) => {
        try {
            handler(req, res)
        } catch (e) {
            if (!(e instanceof ApiError)) throw e
            res.status(400).send({
                message: e.message,
            })
        }
    }
}

module.exports = router
