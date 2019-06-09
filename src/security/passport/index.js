const passport = require('passport')
const HttpStatus = require('http-status')

const initLocalStrategy = require('./local.strategy')
const initKakaoStrategy = require('./kakao.strategy')
const initGoogleStrategy = require('./google.strategy')

const jwt = require('../jwt')
const config = require('../../../config')
const Exception = require('../../exception')

//
//
//

const initSerializeUser = () => passport.serializeUser((user, done) => {
  // Called when Strategy is successful

  // To deserializeUser
  return done(null, user)
})

const initDeserializeUser = () => passport.deserializeUser((user, done) => {
  // From serializeUser

  // To request.user
  return done(null, user)
})

let isInitialized = false
const init = () => {
  if (isInitialized) {
    return
  }

  initSerializeUser()
  initDeserializeUser()
  initLocalStrategy(passport)
  initKakaoStrategy(passport)
  initGoogleStrategy(passport)

  isInitialized = true
}

const authenticate = ({
  provider,
  options = { }
}) => async (req, res, next) => passport.authenticate(
  provider,
  options,
  async (err, user) => {
    if (err) {
      const failure = Exception.toFailure(err)
      return res.status(failure.httpStatus).json(failure.body)
    }
    if (!user) {
      const failure = Exception.of(Exception.Cause.UNAUTHORIZED)
      return res.status(failure.httpStatus).json(failure.body)
    }

    const accessToken = await jwt.sign(user)
    return res.set(config.security.jwt.headerName, `Bearer ${accessToken}`)
      .status(HttpStatus.OK)
      .json(user)
  }
)(req, res, next)

//
//
//

module.exports = {
  init,
  authenticate
}
