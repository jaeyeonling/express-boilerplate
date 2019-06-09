const local = require('./local')
const google = require('./google')
const kakao = require('./kakao')

//
//
//

module.exports = {
  local,
  googleAuth: google.auth,
  googleCallback: google.callback,
  kakaoAuth: kakao.auth,
  kakaoCallback: kakao.callback
}
