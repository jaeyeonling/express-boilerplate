const AuthProviderType = require('../../type/auth.provider')

//
//
//

module.exports = (
  sequelize,
  DataTypes
) => {
  const authProvider = {
    type: DataTypes.ENUM,
    values: Object.keys(AuthProviderType),
    allowNull: false,
    defaultValue: AuthProviderType.LOCAL
  }
  const userId = {
    type: DataTypes.STRING,
    allowNull: false
  }
  const password = {
    type: DataTypes.STRING,
    allowNull: true
  }
  const salt = {
    type: DataTypes.STRING,
    allowNull: true
  }
  const owner = {
    type: DataTypes.BIGINT,
    allowNull: false
  }
  const columns = {
    authProvider,
    userId,
    password,
    salt,
    owner
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
