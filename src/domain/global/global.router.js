const express = require('express')

const globalController = require('./controller')
const asyncWrapper = require('../async.wrapper')
const ensure = require('../ensure')
const upload = require('../../http/middlewares/upload')

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
router.post('/attach', ensure, upload.array('files'), asyncWrapper(globalController.attach))

//
//
//

module.exports = router
