const KakaoStrategy = require('passport-kakao').Strategy

const db = require('../../database')
const config = require('../../../config')

//
//
//

const callback = async (accessToke, refreshToken, profile, done) => {
  const {
    provider: authProvider,
    username: name,
    _json: {
      id: userId,
      properties: {
        profile_image: profileImage
      }
    }
  } = profile

  let transaction
  try {
    let authentication = await db.Authentication.findOne({
      where: {
        authProvider,
        userId
      }
    })
    if (authentication) {
      const user = await db.User.findOne({
        where: {
          id: authentication.owner
        }
      })

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

    transaction = await db.sequelize.transaction()
    const options = { transaction }

    const user = await db.User.create(
      {
        name,
        profileImage
      },
      options
    )

    authentication = await db.Authentication.create(
      {
        authProvider,
        userId,
        owner: user.id
      },
      options
    )

    await transaction.commit()

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
  } catch (e) {
    if (transaction) {
      await transaction.rollback()
    }

    if (e.name === 'SequelizeUniqueConstraintError') {
      return done(Exception.of(Exception.Cause.ALREADY_EXISTS_USER))
    }

    return done(e)
  }
}

const strategy = new KakaoStrategy(
  config.passport.kakao,
  callback
)

//
//
//

module.exports = passport => passport.use(strategy)
