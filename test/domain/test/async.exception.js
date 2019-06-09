// TODO: remove production

require('should')

const request = require('supertest')

const server = require('../../../src/http/server')
const Exception = require('../../../src/exception')

//
//
//

describe('/test/async-exception', () => {
  it('Exception 처리', done => {
    request(server)
      .get('/test/async-exception')
      .expect(Exception.Cause.INTERNAL_SERVER_ERROR.status)
      .end((err, res) => {
        res.body.code.should.equals(Exception.Cause.INTERNAL_SERVER_ERROR.code)
        res.body.message.should.equals(Exception.Cause.INTERNAL_SERVER_ERROR.message)
        done()
      })
  })
})
