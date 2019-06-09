const fs = require('fs')
const path = require('path')

const env = require('../../config/env')

//
//
//

const load = ({
  sequelize,
  basePath
}) => {
  const entities = { }

  if (!fs.existsSync(basePath)) {
    return entities
  }

  fs.readdirSync(basePath)
    .filter(file => file.includes('.js'))
    .forEach(file => {
      const entityPath = path.join(basePath, file)
      const entity = sequelize.import(entityPath)
      const entityName = entity.name

      entities[entityName] = entity
    })

  Object.values(entities)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(entities))

  return entities
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
