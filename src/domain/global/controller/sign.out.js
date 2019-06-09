const HttpStatus = require('http-status')

const redis = require('../../../redis')

//
//
//

const signOut = async (req, res) => {
  const {
    id
  } = req.security

  await redis.del(redis.getAccessTokenKey(id))

  return res.status(HttpStatus.NO_CONTENT).end()
}

//
//
//

module.exports = signOut
