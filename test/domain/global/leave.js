require('should')

const request = require('supertest')
const HttpStatus = require('http-status')

const server = require('../../../src/http/server')
const config = require('../../../config')
const Exception = require('../../../src/exception')

//
//
//

describe('/leave', () => {
  describe('성공', () => {
    const signUpRequest = {
      userId: 'userIdLeave',
      email: 'email-leave@gmail.com',
      password: 'password-leave',
      name: 'name',
      profileImage: 'profileImage-leave'
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

    it('탈퇴시 204를 반환한다.', done => {
      request(server)
        .delete('/leave')
        .set(config.security.jwt.headerName, accessToken)
        .expect(HttpStatus.NO_CONTENT)
        .end(done)
    })

    it('탈퇴 요청 후 접근할 수 없다.', done => {
      request(server)
        .get('/test/security')
        .set(config.security.jwt.headerName, accessToken)
        .expect(Exception.Cause.INVALID_ACCESS_TOKEN.status)
        .end((err, res) => {
          res.body.code.should.equals(Exception.Cause.INVALID_ACCESS_TOKEN.code)
          res.body.message.should.equals(Exception.Cause.INVALID_ACCESS_TOKEN.message)
          done()
        })
    })

    it('탈퇴한 유저는 로그인할 수 없다.', done => {
      request(server)
        .post('/auth/local')
        .send({
          userId: signUpRequest.userId,
          password: signUpRequest.password
        })
        .expect(Exception.Cause.UNAUTHORIZED.status)
        .end((err, res) => {
          res.body.code.should.equals(Exception.Cause.UNAUTHORIZED.code)
          res.body.message.should.equals(Exception.Cause.UNAUTHORIZED.message)
          done()
        })
    })
  })
})
