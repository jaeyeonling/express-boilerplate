const jwt = require('jsonwebtoken')
const passportOauth2 = require('passport-oauth2')

const Failure = require('./failure')
const Cause = require('./cause')

//
//
//

const of = cause => new Failure(cause)

const toFailure = err => {
  if (err instanceof Failure) {
    return err
  }
  if (err instanceof jwt.TokenExpiredError) {
    return of(Cause.ACCESS_TOKEN_EXPIRED)
  }
  if (err instanceof jwt.JsonWebTokenError) {
    return of(Cause.INVALID_ACCESS_TOKEN)
  }
  if (err instanceof passportOauth2.TokenError) {
    return of(Cause.INVALID_ACCESS_TOKEN)
  }

  // TODO handling

  console.error('Uncaught Error: ', err)

  return of(Cause.INTERNAL_SERVER_ERROR)
}

//
//
//

module.exports = {
  Failure,
  Cause,
  toFailure,
  of
}
