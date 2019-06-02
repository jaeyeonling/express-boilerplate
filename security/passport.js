const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

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

const initLocalStrategy = () => passport.use(
  new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, userId, password, done) => {

    }
  )
)

const initGoogleStrategy = () => {
  // TODO:
}

const isInitialized = false
const init = () => {
  if (isInitialized) {
    return
  }

  initSerializeUser()
  initDeserializeUser()
  initLocalStrategy()
  initGoogleStrategy()

  isInitialized = true
}

//
//
//

module.exports = {
  init
}
