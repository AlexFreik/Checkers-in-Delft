const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http = require('http')
const websocket = require('ws')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

function createApp(port) {
    const app = express()

    app.set('port', port)

    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, '../public')))

    app.use('/api/', apiRouter)
    app.use('/', indexRouter)

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404))
    })

    // error handler TODO
    // app.use(function (err, req, res, next) {
    //     // set locals, only providing error in development
    //     res.locals.message = err.message
    //     res.locals.error = req.app.get('env') === 'development' ? err : {}
    //
    //     // render the error page
    //     res.status(err.status || 500)
    //     res.render('error')
    // })

    return app
}

function createWebsocketServer(httpServer) {
    const wss = new websocket.Server({ server: httpServer })

    wss.on('connection', function(ws) {
        /*
         * let's slow down the server response time a bit to
         * make the change visible on the client side
         */
        console.log('Connection state: ' + ws.readyState)

        ws.on('message', function incoming(message) {
            console.log('[LOG] ' + message)
            let inMsg = JSON.parse(message)
            if (inMsg.type === 'MOVE') {
                let x = parseInt(inMsg.x)
                ws.send(JSON.stringify({ type: 'MOVE', x: x + 1 }))
            }
        })
    })
}

function createServer(port) {
    const app = createApp(port)
    const server = http.createServer(app)
    createWebsocketServer(server)

    return server
}

module.exports = createServer
