module.exports = (
  sequelize,
  DataTypes
) => {
  const name = DataTypes.STRING
  const columns = {
    name
  }

  const User = sequelize.define(
    'User',
    columns
  )

  return User
}
