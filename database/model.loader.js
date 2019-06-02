const fs = require('fs')
const path = require('path')

const env = require('../config/env')

//
//
//

const load = ({
  sequelize,
  basePath
}) => {
  const models = { }

  if (!fs.existsSync(basePath)) {
    return models
  }

  fs.readdirSync(basePath)
    .filter(file => file.includes('.js'))
    .forEach(file => {
      const modelPath = path.join(basePath, file)
      const model = sequelize.import(modelPath)
      const modelName = model.name

      models[modelName] = model
    })

  Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models))

  return models
}

const sync = async ({
  sequelize,
  options = {
    force: !env.production
  }
}) => await sequelize.sync(options)

//
//
//

module.exports = {
  load,
  sync
}
