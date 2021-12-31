const express = require('express')
const router = express.Router()

const { createGame, joinGame } = require('../services/game-service')

router.post('/create-game', function(req, res) {
    const settings = req.body.settings

    const gameId = createGame(settings)
    if (!gameId) return res.sendStatus(400)

    const playerToken = joinGame(gameId)
    if (!playerToken) return res.sendStatus(400)

    res.send({
        "gameId": gameId,
        "playerToken": playerToken
    })
})

router.post('/join-game', function(req, res) {
    const gameId = req.body.gameId
    if (!gameId) return res.sendStatus(400)

    const playerToken = joinGame(gameId)
    if (!playerToken) return res.sendStatus(400)

    res.send({
        "playerToken": playerToken
    })
})

module.exports = router
