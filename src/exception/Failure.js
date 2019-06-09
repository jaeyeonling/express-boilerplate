const HttpStatus = require('http-status')

//
//
//

class Failure extends Error {
  constructor (cause) {
    super(`[${cause.scode}] ${cause.message}`)

    this.code = cause.code
    this.message = cause.message
    this.status = cause.status || HttpStatus.INTERNAL_SERVER_ERROR
  }

  get body () {
    const {
      code,
      message
    } = this

    return {
      code,
      message
    }
  }

  get httpStatus () {
    return this.status
  }
}

//
//
//

module.exports = Failure
