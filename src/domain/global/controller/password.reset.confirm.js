const HttpStatus = require('http-status')

const AuthProviderType = require('../../../type/auth.provider')
const db = require('../../../database')
const Exception = require('../../../exception')
const random = require('../../../utils/random')
const mail = require('../../../utils/mail')
const passwordEncoder = require('../../../utils/password.encoder')
const validator = require('../../../utils/validator')

//
//
//

const schema = {
  type: 'object',
  required: true,
  rule: {
    secret: {
      type: 'string',
      required: true
    }
  }
}

const passwordResetConfirm = async (req, res) => {
  validator.validate(req.query, schema, 'query')

  const {
    secret
  } = req.query

  const passwordResetRequest = await db.PasswordResetRequest.findOne({
    where: {
      secret
    }
  })
  if (!passwordResetRequest) {
    throw Exception.of(Exception.Cause.BAD_REQUEST)
  }
  if (passwordResetRequest.reset) {
    throw Exception.of(Exception.Cause.BAD_REQUEST)
  }

  // TODO: time check?

  passwordResetRequest.reset = true

  const user = await db.User.findOne({
    where: {
      id: passwordResetRequest.owner
    }
  })
  const authentication = await db.Authentication.findOne({
    where: {
      authProvider: AuthProviderType.LOCAL,
      owner: user.id
    }
  })

  const randomPassword = random.randomString(20)

  authentication.password = await passwordEncoder.encode(randomPassword, authentication.salt)

  let transaction
  try {
    transaction = await db.sequelize.transaction()
    const options = { transaction }

    // TODO: change message
    await mail.send({
      to: user.email,
      subject: '임시 비밀번호',
      text: `임시 비밀번호: ${randomPassword}`
    })

    await user.save(options)
    await authentication.save(options)

    await transaction.commit()

    return res.status(HttpStatus.OK).send('임시 비밀번호 발급 완료')
  } catch (e) {
    if (transaction) {
      await transaction.rollback()
    }

    throw e
  }
}

//
//
//

module.exports = passwordResetConfirm
