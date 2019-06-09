const express = require('express')

const authController = require('./controller')
const asyncWrapper = require('../async.wrapper')

//
//
//

const router = express.Router()

router.post('/local', asyncWrapper(authController.local))
router.get('/google', authController.googleAuth)
router.get('/google/callback', authController.googleCallback)
router.get('/kakao', authController.kakaoAuth)
router.get('/kakao/callback', authController.kakaoCallback)

//
//
//

module.exports = router
