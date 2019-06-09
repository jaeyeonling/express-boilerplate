require('should')

const request = require('supertest')
const HttpStatus = require('http-status')

const server = require('../../../src/http/server')

//
//
//

describe('/health', () => {
  it('200을 반환한다.', done => {
    request(server)
      .get('/health')
      .expect(HttpStatus.OK)
      .end(done)
  })
})
