const hash = require('./hash')

//
//
//

const encode = async (password, salt) => await hash.sha512(password, salt)

const matches = async (plainPassword, encodedPassword, salt) => {
  return await encode(plainPassword, salt) === encodedPassword
}

const matchesByAuthentication = async (plainPassword, authentication) => {
  return await matches(plainPassword, authentication.password, authentication.salt)
}

//
//
//

module.exports = {
  encode,
  matches,
  matchesByAuthentication
}
