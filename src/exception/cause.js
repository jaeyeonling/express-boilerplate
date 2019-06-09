const HttpStatus = require('http-status')

//
//
//

const Cause = {
  BAD_REQUEST: { code: -101, message: 'Bad Request', status: HttpStatus.BAD_REQUEST },
  NOT_FOUND: { code: -102, message: 'Not Found', status: HttpStatus.NOT_FOUND },
  INTERNAL_SERVER_ERROR: { code: -103, message: 'Internal Server Error', status: HttpStatus.INTERNAL_SERVER_ERROR },
  UNAUTHORIZED: { code: -104, message: 'Unauthorized', status: HttpStatus.UNAUTHORIZED },
  ACCESS_TOKEN_EXPIRED: { code: -105, message: 'Access Token Expired', status: HttpStatus.UNAUTHORIZED },
  INVALID_ACCESS_TOKEN: { code: -106, message: 'Invalid Access Token', status: HttpStatus.UNAUTHORIZED },
  ACCESS_DENIED: { code: -107, message: 'Access Denied', status: HttpStatus.FORBIDDEN },
  LOGGED_IN_FROM_ANOTHER_DEVICE: { code: -108, message: 'Logged In From Another Device', status: HttpStatus.UNAUTHORIZED },

  ALREADY_EXISTS_USER: { code: -201, message: 'Already Exists User', status: HttpStatus.CONFLICT },
  USER_NOT_FOUND: { code: -202, message: 'User Not Found', status: HttpStatus.NOT_FOUND },
}

//
//
//

module.exports = Cause
