const AuthProviderType = require('../../../type/auth.provider')
const passport = require('../../../security/passport')

//
//
//

const authCallback = passport.authenticate({
  provider: AuthProviderType.LOCAL,
  options: { session: false }
})

//
//
//

module.exports = authCallback
