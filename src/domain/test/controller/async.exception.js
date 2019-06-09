const Exception = require('../../../exception')

//
//
//

const asyncException = async (req, res) => {
  throw Exception.of(Exception.Cause.INTERNAL_SERVER_ERROR)
}

//
//
//

module.exports = asyncException
