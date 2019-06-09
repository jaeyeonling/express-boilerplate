const Exception = require('../../../exception')

//
//
//

const syncException = (req, res) => {
  throw Exception.of(Exception.Cause.INTERNAL_SERVER_ERROR)
}

//
//
//

module.exports = syncException
