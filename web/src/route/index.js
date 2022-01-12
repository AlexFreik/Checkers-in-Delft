const express = require('express')
const { stats } = require('../service/game-service')
const router = express.Router()

/* GET home page */
router.get("/", function(req, res) {
    res.status(200).render("index.ejs", stats);
});

module.exports = router
