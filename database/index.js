const path = require('path')
const Sequelize = require('sequelize')

const config = require('../config')
const modelLoader = require('./model.loader')

//
//
//

const sequelize = new Sequelize(config.database)

const modelPath = path.join(__dirname, 'models')
const models = modelLoader.load({
  sequelize,
  basePath: modelPath
})

modelLoader.sync({
  sequelize
})

//
//
//

module.exports = {
  Sequelize,
  sequelize,
  ...models
}
