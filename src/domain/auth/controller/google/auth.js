const passport = require('passport')

const config = require('../../../../../config')

//
//
//

const auth = passport.authenticate('google', {
  scope: config.passport.google.scope
})

//
//
//

module.exports = auth
