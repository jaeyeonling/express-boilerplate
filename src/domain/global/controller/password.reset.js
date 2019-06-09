const HttpStatus = require('http-status')
const qs = require('querystring')

const AuthProviderType = require('../../../type/auth.provider')
const config = require('../../../../config')
const db = require('../../../database')
const random = require('../../../../src/utils/random')
const mail = require('../../../utils/mail')
const validator = require('../../../utils/validator')
const Exception = require('../../../exception')

//
//
//

const schema = {
  type: 'object',
  required: true,
  rule: {
    email: {
      type: 'string',
      required: true,
      pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    }
  }
}

const passwordReset = async (req, res) => {
  validator.validate(req.body, schema, 'body')

  const {
    email
  } = req.body

  const user = await db.User.findOne({
    where: {
      email
    }
  })
  if (!user) {
    throw Exception.of(Exception.Cause.USER_NOT_FOUND)
  }

  const authentication = await db.Authentication.findOne({
    where: {
      authProvider: AuthProviderType.LOCAL,
      owner: user.id
    }
  })
  if (!authentication) {
    throw Exception.of(Exception.Cause.USER_NOT_FOUND)
  }

  const secret = random.randomString(128)
  await db.PasswordResetRequest.create({
    owner: user.id,
    secret
  })

  const query = qs.stringify({ secret })
  const resetURL = `http://${config.web.host}:${config.web.port}/password-reset?${query}`

  // TODO: change message
  await mail.send({
    to: email,
    subject: '임시 비밀번호 발급 확인',
    text: `본인이 맞다면 눌러주세요: ${resetURL}`
  })

  return res.status(HttpStatus.CREATED).end()
}

//
//
//

module.exports = passwordReset
