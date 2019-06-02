require('should')

const config = require('../../config')

//
//
//

describe('설정파일 테스트', () => {
  it('환경은 test다.', () => {
    config.env.should.equal('test')
    config.test.should.be.true
  })

  it('설정 파일 테스트', () => {
    config.hello.should.equal('world')
  })
})
