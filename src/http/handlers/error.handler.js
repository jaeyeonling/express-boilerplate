const Exception = require('../../exception')

//
//
//


const errorHandler = (err, req, res, next) => {
  const failure = Exception.toFailure(err)

  return res.status(failure.httpStatus)
    .json(failure.body)
}

//
//
//

module.exports = errorHandler
