module.exports = (
  sequelize,
  DataTypes
) => {
  const originalName = {
    type: DataTypes.STRING,
    allowNull: false
  }
  const saveName = {
    type: DataTypes.STRING,
    allowNull: false
  }
  const owner = {
    type: DataTypes.BIGINT,
    allowNull: false
  }
  const columns = {
    originalName,
    saveName,
    owner
  }

  const AttachFile = sequelize.define(
    'AttachFile',
    columns
  )

  return AttachFile
}
