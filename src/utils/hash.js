const crypto = require('crypto')

//
//
//

const hash = (password, salt, digest) => new Promise(
  (resolve, reject) => crypto.pbkdf2(password, salt, 100000, 64, digest, (err, key) => {
    if (err) {
      return reject(err)
    }

    return resolve(key.toString('base64'))
  })
)

const sha512 = async (password, salt) => {
  return await hash(
    password,
    salt,
    'sha512'
  )
}

const salt = () => crypto.randomBytes(64).toString()

//
//
//

module.exports = {
  hash,
  sha512,
  salt
}
