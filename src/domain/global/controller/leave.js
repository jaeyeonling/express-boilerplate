const HttpStatus = require('http-status')

const UserStatusType = require('../../../type/user.status')
const db = require('../../../database')
const redis = require('../../../redis')

//
//
//

const leave = async (req, res) => {
  const {
    id
  } = req.security

  const user = await db.User.findOne({
    where: {
      id
    }
  })

  user.status = UserStatusType.LEAVE

  await user.save()
  await redis.del(redis.getAccessTokenKey(id))

  return res.status(HttpStatus.NO_CONTENT).end()
}

//
//
//

module.exports = leave
