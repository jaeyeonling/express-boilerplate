module.exports = (
  sequelize,
  DataTypes
) => {
  const originalName = {
    type: DataTypes.STRING,
    allowNull: false
  }
  const url = {
    type: DataTypes.STRING,
    allowNull: false
  }
  const owner = {
    type: DataTypes.BIGINT,
    allowNull: false
  }
  const columns = {
    originalName,
    url,
    owner
  }

  const AttachFile = sequelize.define(
    'AttachFile',
    columns
  )

  return AttachFile
}
