require('should')

const env = require('../../config/env')

//
//
//

describe('환경변수 테스트', () => {
  const key = 'HELLO'

  describe('get', () => {
    const value = 'hello'

    describe('값이 있을 때', () => {
      before(() => process.env[key] = value)

      it('환경변수에 있는 값을 반환한다.', () => {
        env.get(key).should.equal(value)
        env.get(key, 'failback').should.equal(value)
      })
    })

    describe('값이 없을 때', () => {
      it('undefined를 반환한다.', () => {
        should(env.get('afsdsafdsad')).be.undefined()
        should(env.get('dsfgsfdgfdfsgs', undefined)).be.undefined()
      })
      it('환경변수에 값이 없다면 failback 값을 반환한다.', () => {
        env.get('serghvj23ftf3wb', value).should.equal(value)
      })
    })
  })

  describe('getInt', () => {
    const value = 100

    describe('값이 있을 때', () => {
      before(() => process.env[key] = value)

      it('환경변수에 있는 값을 반환한다.', () => {
        env.getInt(key).should.equal(value)
        env.getInt(key, 'failback').should.equal(value)
      })
    })

    describe('값이 없을 때', () => {
      it('undefined를 반환한다.', () => {
        should(env.getInt('afsdsafdsad')).be.undefined()
        should(env.getInt('dsfgsfdgfdfsgs', undefined)).be.undefined()
      })
      it('환경변수에 값이 없다면 failback 값을 반환한다.', () => {
        env.getInt('serghvj23ftf3wb', value).should.equal(value)
      })
    })
  })

  describe('getBoolean', () => {
    const value = true

    describe('값이 있을 때', () => {
      before(() => process.env[key] = value)

      it('환경변수에 있는 값을 반환한다.', () => {
        env.getBoolean(key).should.equal(value)
        env.getBoolean(key, 'failback').should.equal(value)
      })
    })

    describe('값이 없을 때', () => {
      it('undefined를 반환한다.', () => {
        should(env.getBoolean('afsdsafdsad')).be.undefined()
        should(env.getBoolean('dsfgsfdgfdfsgs', undefined)).be.undefined()
      })
      it('환경변수에 값이 없다면 failback 값을 반환한다.', () => {
        env.getBoolean('serghvj23ftf3wb', value).should.equal(value)
      })
    })
  })
})
