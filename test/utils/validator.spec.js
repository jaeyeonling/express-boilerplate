require('should')

const validator = require('../../src/utils/validator')

//
//
//

describe('Validator', () => {
  it('값을 입력하지 않으면 실패한다.', () => {
    (() => {
      validator.validate()
    }).should.throw()
  })

  it('string 검증에 성공한다.', () => {
    validator.validate('string', { type: 'string' })
  })

  it('number 검증에 성공한다.', () => {
    validator.validate(1, { type: 'number' })
  })

  it('object 검증에 성공한다.', () => {
    validator.validate({}, { type: 'object', rule: { } })
  })

  it('array 검증에 성공한다.', () => {
    validator.validate([], { type: 'array' })
  })

  it('datetime 검증에 성공한다.', () => {
    validator.validate('20190101123000', { type: 'datetime', format: 'YYYYMMDDHHmmss' })
  })

  it('buffer 검증에 성공한다.', () => {
    validator.validate('hello', { type: 'buffer', encoding: 'EUC-KR' })
  })

  it('다른 타입 입력시 실패한다.', () => {
    (() => {
      validator.validate('string', { type: 'object' })
    }).should.throw()
  })
})
