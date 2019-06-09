const LocalStrategy = require('passport-local').Strategy

const db = require('../../database')
const AuthProviderType = require('../../type/auth.provider')
const UserStatusType = require('../../type/user.status')
const passwordEncoder = require('../../utils/password.encoder')
const Exception = require('../../exception')

//
//
//

const options = {
  usernameField: 'userId',
  passwordField: 'password',
  session: false,
  passReqToCallback: false
}

const callback = async (userId, password, done) => {
  if (!userId) {
    return done(Exception.of(Exception.Cause.BAD_REQUEST))
  }
  if (!password) {
    return done(Exception.of(Exception.Cause.BAD_REQUEST))
  }

  const authentication = await db.Authentication.findOne({
    where: {
      authProvider: AuthProviderType.LOCAL,
      userId
    }
  })

  if (!authentication) {
    return done(Exception.of(Exception.Cause.UNAUTHORIZED))
  }

  const isMatchPassword = await passwordEncoder.matchesByAuthentication(password, authentication)
  if (!isMatchPassword) {
    return done(Exception.of(Exception.Cause.UNAUTHORIZED))
  }

  const user = await db.User.findOne({
    where: {
      id: authentication.owner
    }
  })
  if (user.status === UserStatusType.LEAVE) {
    return done(Exception.of(Exception.Cause.UNAUTHORIZED))
  }
  if (user.status === UserStatusType.BLOCK) {
    return done(Exception.of(Exception.Cause.ACCESS_DENIED))
  }

  return done(
    null,
    {
      id: user.id,
      userId,
      name: user.name,
      email: user.email,
      status: user.status
    }
  )
}

const strategy = new LocalStrategy(
  options,
  callback
)

//
//
//

module.exports = passport => passport.use(strategy)
