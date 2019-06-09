const express = require('express')
const path = require('path')

const router = require('./router')

//
//
//

const server = express()

server.disable('x-powered-by')
server.use('/uploads', express.static(path.join(path.dirname(require.main.filename), '/uploads')))
server.use(router)


//
//
//

module.exports = server
