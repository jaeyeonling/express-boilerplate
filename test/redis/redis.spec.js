require('should')

const redis = require('../../src/redis')

//
//
//

describe('Redis', () => {
  const key = 'key'
  const value = 'value'
  const jsonValue = {
    hello: 'world',
    greet: 12345
  }
  const expireIn = 1

  it('문자열 정보를 저장한다.', done => {
    redis.set(key, value, expireIn).then(done)
  })

  it('문자열 정보를 조회한다.', done => {
    redis.get(key).then(result => {
      result.should.equals(value)
      done()
    })
  })

  it('문자열 정보를 만료 전 조회한다.', done => {
    redis.set(key, value, expireIn).then(() => {
      redis.get(key).then(result => {
        result.should.equals(value)
        done()
      })
    })
  })

  it('문자열 정보를 만료 후 조회 시 데이터는 없다.', done => {
    redis.set(key, value, expireIn)
      .then(() => {
        setTimeout(() => {
          redis.get(key).then(result => {
            should(result).be.null()
            done()
          })
        }, expireIn * 2000)
      })
  })
  .timeout(expireIn * 5 * 1000)

  it('JSON 정보를 저장한다.', done => {
    redis.setJSON(key, jsonValue, expireIn).then(done)
  })

  it('JSON 정보를 조회한다.', done => {
    redis.getJSON(key).then(result => {
      result.should.have.property('hello', jsonValue.hello)
      result.should.have.property('greet', jsonValue.greet)

      done()
    })
  })

  it('JSON 정보를 만료 전 조회한다.', done => {
    redis.setJSON(key, jsonValue, expireIn).then(() => {
      redis.getJSON(key).then(result => {
        result.should.have.property('hello', jsonValue.hello)
        result.should.have.property('greet', jsonValue.greet)

        done()
      })
    })
  })

  it('JSON 정보를 만료 후 조회 시 데이터는 없다.', done => {
    redis.setJSON(key, jsonValue, expireIn)
      .then(() => {
        setTimeout(() => {
          redis.getJSON(key).then(result => {
            should(result).be.null()
            done()
          })
        }, expireIn * 2000)
      })
  })
  .timeout(expireIn * 5 * 1000)
})
