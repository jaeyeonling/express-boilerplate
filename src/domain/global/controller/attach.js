const HttpStatus = require('http-status')

const db = require('../../../database')
const Exception = require('../../../exception')

//
//
//

const attach = async (req, res) => {
  const {
    security: {
      id: owner
    },
    files
  } = req

  // TODO: limit file count

  if (files.length < 1) {
    throw Exception.of(Exception.Cause.BAD_REQUEST)
  }

  let transaction
  try {
    transaction = await db.sequelize.transaction()
    const options = { transaction }

    const attachFiles = []

    for (let i = 0; i < files.length; i++) {
      const {
        originalname: originalName,
        path: saveName
      } = files[i]

      const attachFile = await db.AttachFile.create(
        {
          originalName,
          saveName,
          owner
        },
        options
      )

      attachFiles.push(attachFile)
    }

    await transaction.commit()

    return res.status(HttpStatus.CREATED).json(attachFiles)
  } catch (e) {
    if (transaction) {
      await transaction.rollback()
    }

    throw e
  }
}

//
//
//

module.exports = attach
