require('should')

const request = require('supertest')
const HttpStatus = require('http-status')

const server = require('../../../src/http/server')
const config = require('../../../config')
const Exception = require('../../../src/exception')

//
//
//

describe('/sign-out', () => {
  describe('성공', () => {
    const signUpRequest = {
      userId: 'userIdSignOut',
      email: 'email-sign-out@gmail.com',
      password: 'password-sign-out',
      name: 'name-sign-out',
      profileImage: 'profileImage-sign-out'
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

    it('로그아웃 성공 시 204를 반환한다.', done => {
      request(server)
        .delete('/sign-out')
        .set(config.security.jwt.headerName, accessToken)
        .expect(HttpStatus.NO_CONTENT)
        .end(done)
    })
    it('로그아웃된 토큰은 사용할 수 없다.', done => {
      request(server)
        .get('/test/security')
        .expect(Exception.Cause.UNAUTHORIZED.status)
        .end((err, res) => {
          res.body.code.should.equals(Exception.Cause.UNAUTHORIZED.code)
          res.body.message.should.equals(Exception.Cause.UNAUTHORIZED.message)
          done()
        })
    })
  })

  describe('실패', () => {
    it('로그인이 안된 유저는 접근할 수 없다.', done => {
      request(server)
        .delete('/sign-out')
        .expect(Exception.Cause.UNAUTHORIZED.status)
        .end((err, res) => {
          res.body.code.should.equals(Exception.Cause.UNAUTHORIZED.code)
          res.body.message.should.equals(Exception.Cause.UNAUTHORIZED.message)
          done()
        })
    })
  })
})
