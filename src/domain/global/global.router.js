const express = require('express')

const globalController = require('./controller')
const asyncWrapper = require('../async.wrapper')
const ensure = require('../ensure')

//
//
//

const router = express.Router()

router.get('/info', globalController.info)
router.get('/health', globalController.healthCheck)
router.post('/sign-up', asyncWrapper(globalController.signUp))
router.delete('/sign-out', ensure, asyncWrapper(globalController.signOut))
router.delete('/leave', ensure, asyncWrapper(globalController.leave))
router.post('/password-reset', asyncWrapper(globalController.passwordReset))
router.get('/password-reset', asyncWrapper(globalController.passwordResetConfirm))

//
//
//

module.exports = router
