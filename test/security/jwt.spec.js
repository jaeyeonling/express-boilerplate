require('should')

const jwt = require('../../src/security/jwt')

//
//
//

describe('JWT', () => {
  const user = {
    id: 0,
    name: 'jaeyeon',
    email: 'jaeyeonling@gmail.com'
  }
  const authentication = {
    userId: 'userId'
  }

  it('Sign시 Access Token을 발급한다.', done => {
    jwt.sign({
      ...user,
      ...authentication
    }).then(result => {
      result.should.be.not.null
      done()
    })

  })
  it('Verify시 토큰 Claims를 리턴한다.', done => {
    jwt.sign({
      ...user,
      ...authentication
    })
    .then(token => {
      jwt.verify(token)
        .then(security => {
          security.id.should.equals(user.id)
          security.name.should.equals(user.name)
          security.email.should.equals(user.email)
          security.sub.should.equals(authentication.userId)
          done()
        })
    })
  })
})
