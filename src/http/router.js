const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const compression = require('compression')
const morgan = require('morgan')
const statusMonitor = require('express-status-monitor')

const config = require('../../config')
const globalRouter = require('../domain/global/global.router')
const authRouter = require('../domain/auth/auth.router')
const testRouter = require('../domain/test/test.router')
const passport = require('../security/passport')
const errorHandler = require('./handlers/error.handler')
const notFound = require('./handlers/not.found')


//
//
//

passport.init()

const router = express.Router()

if (config.development) {
  router.use(statusMonitor())
}
if (!config.test) {
  router.use(morgan('dev'))
}

router.use(helmet())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride('X-HTTP-Method-Override'))
router.use(compression())

router.use('/', globalRouter)
router.use('/auth', authRouter)
router.use('/test', testRouter)
router.use('*', notFound)

router.use(errorHandler)

//
//
//

module.exports = router
