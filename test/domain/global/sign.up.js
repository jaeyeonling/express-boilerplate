require('should')

const request = require('supertest')
const HttpStatus = require('http-status')

const server = require('../../../src/http/server')

//
//
//

describe('/sign-up', () => {
  const signUpRequest = {
    userId: 'userId10',
    email: 'email@gmail.com',
    password: 'password',
    name: 'name',
    profileImage: 'profileImage'
  }

  describe('성공', () => {
    let body
    before(done => {
      request(server)
        .post('/sign-up')
        .send(signUpRequest)
        .expect(HttpStatus.CREATED)
        .end((err, res) => {
          body = res.body
          done()
        })
    })

    it('등록된 유저 정보를 반환한다.', () => body.should.have.property('id'))
    it('입력한 정보를 반환한다.', () => {
      body.should.have.property('userId', signUpRequest.userId)
      body.should.have.property('name', signUpRequest.name)
      body.should.have.property('profileImage', signUpRequest.profileImage)
      body.should.have.property('email', signUpRequest.email)
    })
  })

  describe('실패', () => {
    it('이미 등록된 아이디는 409를 반환한다.', done => {
      request(server)
        .post('/sign-up')
        .send(signUpRequest)
        .expect(HttpStatus.CONFLICT)
        .end((err, res) => {
          body = res.body
          done()
        })
    })
  })
})
