const jwt = require('jsonwebtoken')

const config = require('../../config')
const random = require('../utils/random')
const Exception = require('../exception')
const UserStatusType = require('../type/user.status')
const redis = require('../redis')

//
//
//

const getAuthentication = req => req.headers[config.security.jwt.headerName]

const verify = async token => {
  const security = await jwt.verify(
    token,
    config.security.jwt.secret,
    {
      ignoreExpiration: true
    }
  )

  const accessToken = await redis.getJSON(
    redis.getAccessTokenKey(security.id)
  )

  if (!accessToken) {
    throw Exception.of(Exception.Cause.INVALID_ACCESS_TOKEN)
  }
  if (accessToken !== token) {
    throw Exception.of(Exception.Cause.LOGGED_IN_FROM_ANOTHER_DEVICE)
  }

  return security
}

const sign = async ({
  id,
  userId,
  name,
  email,
  status
}) => {
  const accessToken = jwt.sign(
    {
      id,
      name,
      email,
      status,
      apiVersion: config.application.version
    },
    config.security.jwt.secret,
    {
      algorithm: config.security.jwt.algorithm,
      keyid: id.toString(),
      expiresIn: config.security.jwt.expiresIn,
      subject: userId.toString(),
      issuer: config.application.name,
      jwtid: random.randomString(128),
      audience: name
    }
  )

  await redis.setJSON(
    redis.getAccessTokenKey(id),
    accessToken,
    config.security.jwt.expiresIn + config.security.jwt.refreshIn
  )

  return accessToken
}

const ensure = async (req, res, next) => {
  const authentication = getAuthentication(req)
  if (!authentication) {
    throw Exception.of(Exception.Cause.UNAUTHORIZED)
  }

  const accessToken = authentication.replace(/^Bearer\s/, '')

  req.security = await verify(accessToken)
  if (req.security.status === UserStatusType.LEAVE) {
    throw Exception.of(Exception.Cause.UNAUTHORIZED)
  }
  if (req.security.status === UserStatusType.BLOCK) {
    throw Exception.of(Exception.Cause.ACCESS_DENIED)
  }
  if (req.security.exp < Date.now() / 1000) {
    const newAccessToken = await jwt.sign({
      id,
      sub: userId,
      name,
      email,
      status
    } = req.security)
    res.set(config.security.jwt.headerName, `Bearer ${newAccessToken}`)
  }

  return next()
}

//
//
//

module.exports = {
  verify,
  sign,
  ensure
}
