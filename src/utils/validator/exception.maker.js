const HttpStatus = require('http-status')
const Exception = require('../../exception')

//
//
//

const make = message => {
  return Exception.of({
    code: -101,
    message,
    status: HttpStatus.BAD_REQUEST
  })
}

//
//
//

module.exports = {
  make
}
