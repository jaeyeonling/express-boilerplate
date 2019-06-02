module.exports = (
  sequelize,
  DataTypes
) => {
  const authProvider = {
    type: DataTypes.ENUM,
    values: [ 'SERVER', 'GOOGLE' ]
  }
  const userId = {
    type: DataTypes.STRING
  }
  const password = {
    type: DataTypes.STRING
  }
  const columns = {
    authProvider,
    userId,
    password
  }

  const indexes = [
    {
      unique: true,
      fields: [
        'authProvider',
        'userId'
      ]
    }
  ]
  const options = {
    indexes
  }

  const Authentication = sequelize.define(
    'Authentication',
    columns,
    options
  )

  return Authentication
}
