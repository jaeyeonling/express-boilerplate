// TODO: remove production

require('should')

const request = require('supertest')

const server = require('../../../src/http/server')
const Exception = require('../../../src/exception')

//
//
//

describe('/test/sync-exception', () => {
  it('Exception 처리', done => {
    request(server)
      .get('/test/sync-exception')
      .expect(Exception.Cause.INTERNAL_SERVER_ERROR.status)
      .end((err, res) => {
        res.body.code.should.equals(Exception.Cause.INTERNAL_SERVER_ERROR.code)
        res.body.message.should.equals(Exception.Cause.INTERNAL_SERVER_ERROR.message)
        done()
      })
  })
})
