const AuthProviderType = require('../../../../type/auth.provider')
const passport = require('../../../../security/passport')

//
//
//

const authCallback = passport.authenticate({ provider: AuthProviderType.GOOGLE })

//
//
//

module.exports = authCallback
