const asyncWrapper = callback => async (req, res, next) => callback(req, res, next).catch(next)

//
//
//

module.exports = asyncWrapper
