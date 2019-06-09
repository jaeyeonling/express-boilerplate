const multer = require('multer')
const fs = require('fs')
const uuid = require('uuid/v4')

//
//
//

const getStorage = () => {
  return multer.diskStorage({
    destination (req, file, callback) {
      const now = new Date()
      const path = `./uploads/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`

      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {
          recursive: true
        })
      }

      return callback(null, path)
    },

    filename (req, file, callback) {
      return callback(null, uuid())
    }
  })
}

const storage = getStorage()

const upload = multer({ storage })

//
//
//

module.exports = upload
