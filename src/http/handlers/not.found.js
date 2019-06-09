const Exception = require('../../exception')

//
//
//


const notFound = () => {
  throw Exception.of(Exception.Cause.NOT_FOUND)
}

//
//
//

module.exports = notFound
