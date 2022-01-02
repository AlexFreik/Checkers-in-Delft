const express = require('express')
const router = express.Router()

const { createGame, joinGame } = require('../services/game-service')
const ApiError = require('../util/api-error')

router.post('/create-game', handle((req, res) => {
    const settings = req.body.settings

    const gameId = createGame(settings)
    const playerToken = joinGame(gameId)

    res.send({
        'gameId': gameId,
        'playerToken': playerToken
    })
}))

router.post('/join-game', handle((req, res) => {
    const gameId = req.body.gameId
    if (!gameId) throw new ApiError('gameId is missing')

    const playerToken = joinGame(gameId)

    res.send({
        'playerToken': playerToken
    })
}))

function handle(handler) {
    return (req, res) => {
        try {
            handler(req, res)
        } catch (e) {
            if (!(e instanceof ApiError)) throw e
            res.status(400).send({
                'message': e
            })
        }
    }
}

module.exports = router
