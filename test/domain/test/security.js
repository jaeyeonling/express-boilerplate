// TODO: remove production

require('should')

const request = require('supertest')
const HttpStatus = require('http-status')

const server = require('../../../src/http/server')
const config = require('../../../config')
const Exception = require('../../../src/exception')

//
//
//

describe('/test/security', () => {
  describe('성공', () => {
    const signUpRequest = {
      userId: 'userIdSecurity',
      email: 'emailSecurity@gmail.com',
      password: 'password',
      name: 'name',
      profileImage: 'profileImage'
    }

    let accessToken
    before(done => {
      request(server)
        .post('/sign-up')
        .send(signUpRequest)
        .expect(HttpStatus.CREATED)
        .end(
          () => request(server)
            .post('/auth/local')
            .send({
              userId: signUpRequest.userId,
              password: signUpRequest.password
            })
            .expect(HttpStatus.OK)
            .end((err, res) => {
              accessToken = res.header[config.security.jwt.headerName]
              done()
            })
        )
    })

    it('AccessToken으로 인증한다.', done => {
      request(server)
        .get('/test/security')
        .set(config.security.jwt.headerName, accessToken)
        .expect(HttpStatus.OK)
        .end(done)
    })
  })

  describe('실패', () => {
    it('AccessToken이 없으면 인증에 실패한다.', done => {
      request(server)
        .get('/test/security')
        .expect(Exception.Cause.UNAUTHORIZED.status)
        .end((err, res) => {
          res.body.code.should.equals(Exception.Cause.UNAUTHORIZED.code)
          res.body.message.should.equals(Exception.Cause.UNAUTHORIZED.message)
          done()
        })
    })

    it('AccessToken이 올바르지 않으면 인증에 실패한다.', done => {
      request(server)
        .get('/test/security')
        .set(config.security.jwt.headerName, 'Bearer reg5t34gretnjyhregbnyjth6regbdfgnjtyrhy5etwftrhy54t')
        .expect(Exception.Cause.INVALID_ACCESS_TOKEN.status)
        .end((err, res) => {
          res.body.code.should.equals(Exception.Cause.INVALID_ACCESS_TOKEN.code)
          res.body.message.should.equals(Exception.Cause.INVALID_ACCESS_TOKEN.message)
          done()
        })
    })
  })
})
