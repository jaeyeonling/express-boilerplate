const path = require('path')
const Sequelize = require('sequelize')

const config = require('../../config')
const entityLoader = require('./entity.loader')

//
//
//

const sequelize = new Sequelize(config.database)

const modelPath = path.join(__dirname, 'entity')
const entities = entityLoader.load({
  sequelize,
  basePath: modelPath
})

entityLoader.sync({
  sequelize
})

//
//
//

module.exports = {
  Sequelize,
  sequelize,
  ...entities
}
