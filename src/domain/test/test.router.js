const express = require('express')

const testController = require('./controller')

const asyncWrapper = require('../async.wrapper')
const ensure = require('../ensure')

//
//
//

const router = express.Router()

router.get('/security', ensure, testController.security)
router.get('/sync-exception', testController.syncException)
router.get('/async-exception', asyncWrapper(testController.asyncException))

//
//
//

module.exports = router
