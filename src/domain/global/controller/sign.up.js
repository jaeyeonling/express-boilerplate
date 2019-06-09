const UserStatusType = require('../../../type/user.status')
const db = require('../../../database')
const hash = require('../../../utils/hash')
const passwordEncoder = require('../../../utils/password.encoder')
const validator = require('../../../utils/validator')
const Exception = require('../../../exception')

//
//
//

const schema = {
  type: 'object',
  required: true,
  rule: {
    userId: {
      type: 'string',
      required: true,
      pattern: /^[0-9A-Za-z\\-_]{1,32}$/
    },
    password: {
      type: 'string',
      required: true,
      minLength: 4,
      maxLength: 100
    },
    email: {
      type: 'string',
      required: true,
      pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    name: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    },
    profileImage: {
      type: 'string'
    }
  }
}

const parse = async req => {
  validator.validate(req.body, schema, 'body')

  const {
    userId,
    password,
    email,
    name,
    profileImage
  } = req.body

  const salt = hash.salt()
  const hashedPassword = await passwordEncoder.encode(password, salt)

  return {
    user: {
      name,
      email,
      profileImage,
      userStatus: UserStatusType.ACTIVE
    },
    authentication: {
      userId,
      password: hashedPassword,
      salt
    }
  }
}

const signUp = async (req, res) => {
  const request = await parse(req)

  let transaction
  try {
    transaction = await db.sequelize.transaction()
    const options = { transaction }

    const user = await db.User.create(
      request.user,
      options
    )
    const authentication = await db.Authentication.create(
      {
        owner: user.id,
        ...request.authentication
      },
      options
    )

    await transaction.commit()

    return res.status(201)
      .json({
        id: user.id,
        userId: authentication.userId,
        name: user.name,
        profileImage: user.profileImage,
        authProvider: authentication.authProvider,
        email: user.email
      })
  } catch (e) {
    if (transaction) {
      await transaction.rollback()
    }

    if (e.name === 'SequelizeUniqueConstraintError') {
      throw Exception.of(Exception.Cause.ALREADY_EXISTS_USER)
    }

    throw e
  }
}

//
//
//

module.exports = signUp
