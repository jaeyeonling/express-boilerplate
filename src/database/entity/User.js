const UserStatusType = require('../../type/user.status')

//
//
//

module.exports = (
  sequelize,
  DataTypes
) => {
  const name = {
    type: DataTypes.STRING,
    allowNull: false
  }
  const email = {
    type: DataTypes.STRING,
    allowNull: true
  }
  const profileImage = {
    type: DataTypes.STRING,
    allowNull: true
  }
  const status = {
    type: DataTypes.ENUM,
    values: Object.keys(UserStatusType),
    allowNull: false,
    defaultValue: UserStatusType.ACTIVE
  }

  const columns = {
    name,
    email,
    status,
    profileImage
  }

  const User = sequelize.define(
    'User',
    columns
  )

  return User
}
