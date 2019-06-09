module.exports = (
  sequelize,
  DataTypes
) => {
  const owner = {
    type: DataTypes.BIGINT,
    allowNull: false
  }
  const secret = {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
  const reset = {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
  const columns = {
    owner,
    secret,
    reset
  }

  const PasswordResetRequest = sequelize.define(
    'PasswordResetRequest',
    columns
  )

  return PasswordResetRequest
}
