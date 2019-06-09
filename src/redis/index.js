const redis = require('redis')

const config = require('../../config')

//
//
//

const getClient = () => {
  if (config.test) {
    return require("redis-mock").createClient()
  }

  return redis.createClient(
    config.redis.port,
    config.redis.host
  )
}

const client = getClient()

client.on('connect', () => console.info('Redis client connected'))
client.on('error', err => console.error('Redis error: ', err))

const set = (key, value, expire) => new Promise(
  (resolve, reject) => {
    const tx = client.multi()

    tx.set(key, value)
    tx.expire(key, expire)

    return tx.exec(err => {
      if (err) {
        return reject(err)
      }

      return resolve()
    })
  }
)

const get = key => new Promise(
  (resolve, reject) => client.get(key, (err, value) => {
    if (err) {
      return reject(err)
    }

    return resolve(value)
  })
)

const setJSON = async (key, value, expire) => await set(key, JSON.stringify(value), expire)

const getJSON = async key => {
  const value = await get(key)
  if (!value) {
    return null
  }

  return JSON.parse(value)
}

const del = async key => new Promise(
  (resolve, reject) => client.del(key, err => {
    if (err) {
      return reject(err)
    }

    return resolve()
  })
)

const getAccessTokenKey = id => `ACCESS_TOKEN:${id}`

//
//
//

module.exports = {
  set,
  get,
  setJSON,
  getJSON,
  del,
  getAccessTokenKey
}
