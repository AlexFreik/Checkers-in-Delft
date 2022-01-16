const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http = require('http')
const websocket = require('ws')

const indexRouter = require('./route/index')
const apiRouter = require('./route/api')

const { handleConnection } = require('./controller/ws-controller')

function createApp(port) {
    const app = express()

    app.set('port', port)
    app.set('views', 'src/view')

    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, '../public')))

    app.use('/api/', apiRouter)
    app.use('/', indexRouter)

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404))
    })

    return app
}

function createServer(port) {
    const app = createApp(port)
    const server = http.createServer(app)
    createWebsocketServer(server)

    return server
}

function createWebsocketServer(httpServer) {
    const wss = new websocket.Server({ server: httpServer })
    wss.on('connection', handleConnection)
}

module.exports = createServer
