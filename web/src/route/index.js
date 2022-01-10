const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).sendFile('html/index.html', { root: './public' }, (err) => {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', 'index.html')
        }
    })
})

module.exports = router
