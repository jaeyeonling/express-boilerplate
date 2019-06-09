require('should')

const request = require('supertest')
const HttpStatus = require('http-status')

const server = require('../../../src/http/server')
const config = require('../../../config')

//
//
//

describe('/auth/local', () => {
  const user = {
    userId: 'userId',
    email: 'jaeyeonling@gmail.com',
    password: 'password',
    name: 'jaeyeon'
  }
  before(done => {
    request(server)
      .post('/sign-up')
      .send(user)
      .expect(HttpStatus.CREATED)
      .end(done)
  })

  it('Access Token을 반환한다.', done => {
    request(server)
        .post('/auth/local')
        .send(user)
        .expect(HttpStatus.OK)
        .end((err, res) => {
          res.header[config.security.jwt.headerName].should.be.not.empty
          done()
        })
  })
})
