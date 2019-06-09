const express = require('express')

const router = require('./router')

//
//
//

const server = express()

server.disable('x-powered-by')
server.use(router)

//
//
//

module.exports = server
