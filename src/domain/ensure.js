const jwt = require('../security/jwt')
const asyncWrapper = require('./async.wrapper')

//
//
//

module.exports = asyncWrapper(jwt.ensure)
