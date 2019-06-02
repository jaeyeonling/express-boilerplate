const path = require('path')

const env = require('./env')

//
//
//

const environments = env.get(
  'NODE_ENV',
  'development'
)

const configPath = env.get(
  'CONFIG_PATH',
  path.join(__dirname, 'environments', environments)
)

const config = require(configPath)

config[environments] = true
config.env = environments

//
//
//

module.exports = config
