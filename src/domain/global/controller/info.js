const config = require('../../../../config')

//
//
//

const info = (req, res) => {
  const timestamp = parseInt(Date.now() / 1000)

  return res.json({
    ...config.application,
    timestamp
  })
}

//
//
//

module.exports = info
