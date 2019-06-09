require('should')

const request = require('supertest')
const HttpStatus = require('http-status')

const server = require('../../../src/http/server')
const config = require('../../../config')

//
//
//

describe('/info', () => {
  it('200을 반환한다.', done => {
    request(server)
      .get('/info')
      .expect(HttpStatus.OK)
      .end(done)
  })

  it('서버 정보를 반환한다.', done => {
    request(server)
      .get('/info')
      .expect(HttpStatus.OK)
      .end((err, res) => {
        res.body.name.should.equals(config.application.name)
        res.body.version.should.equals(config.application.version)
        res.body.timestamp.should.not.empty

        done()
      })
  })
})
