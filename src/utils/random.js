const digits = '0123456789'
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lower = upper.toLowerCase()

const alphaNumberic = digits + upper + lower

const randomString = length => {
  let randomString = ''
  for (let i = 0; i < length; i++) {
    randomString += alphaNumberic.charAt(Math.floor(Math.random() * alphaNumberic.length))
  }

  return randomString
}

//
//
//

module.exports = {
  randomString
}
