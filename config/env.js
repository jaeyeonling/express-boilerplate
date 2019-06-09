const dotenv = require('dotenv')

//
//
//

const get = (key, failback) => {
  const value = process.env[key]
  if (value) {
    return value
  }

  return failback
}

const getInt = (key, failback) => {
  const value = get(key, failback)
  if (value) {
    return parseInt(value)
  }

  return failback
}

const getBoolean = (key, failback) => {
  const value = get(key, failback)
  if (value) {
    try {
      return JSON.parse(value)
    } catch (ignore) { }
  }

  return failback
}

const getArray = (key, failback) => {
  const value = get(key, failback)
  if (value) {
    return value.split(',')
  }

  return failback
}

dotenv.config()

//
//
//

module.exports = {
  get,
  getInt,
  getBoolean,
  getArray
}
