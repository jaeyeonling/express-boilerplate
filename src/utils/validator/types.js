const moment = require('moment')
const iconv = require('iconv-lite')

const exceptionMaker = require('./exception.maker')

//
//
//

const string = (value, rule, name) => {
  if (!value && !rule.required) {
    return
  }
  if (typeof value !== 'string') {
    return exceptionMaker.make(`invalid ${name}`)
  }
  if (rule.required && value.length === 0) {
    return exceptionMaker.make(`invalid ${name}`)
  }
  if (rule.fixedLength && value.length !== rule.fixedLength) {
    return exceptionMaker.make(`${name} is not equal to fixed length: ${rule.fixedLength}`)
  }
  if (rule.minLength && value.length < rule.minLength) {
    return exceptionMaker.make(`${name} is shorter than min length: ${rule.minLength}`)
  }
  if (rule.maxLength && value.length > rule.maxLength) {
    return exceptionMaker.make(`${name} is longer than max length: ${rule.maxLength}`)
  }
  if (rule.pattern && !rule.pattern.test(value)) {
    return exceptionMaker.make(`${name} is not matched with pattern: ${rule.pattern}`)
  }
}

const number = (value, rule, name) => {
  if (typeof value !== 'number') {
    return exceptionMaker.make(`${name} not in number type`)
  }
  if (rule.fixedLength && value.length !== rule.fixedLength) {
    return exceptionMaker.make(`${name} is less than min value: ${rule.fixedLength}`)
  }
  if (rule.minLength && value.length < rule.minLength) {
    return exceptionMaker.make(`${name} is less than min value: ${rule.minLength}`)
  }
  if (rule.maxLength && value.length > rule.maxLength) {
    return exceptionMaker.make(`${name} is greater than max value: ${rule.maxLength}`)
  }
}

const object = (value, rule, name) => {
  if (typeof value !== 'object') {
    return exceptionMaker.make(`${name} not in object type`)
  }
}

const array = (value, rule, name) => {
  if (!value && !rule.required) {
    return
  }
  if (!Array.isArray(value)) {
    return exceptionMaker.make(`${name} not in array type`)
  }
  if (rule.required && value.length === 0) {
    return exceptionMaker.make(`invalid ${name}`)
  }
  if (rule.fixedLength && value.length !== rule.fixedLength) {
    return exceptionMaker.make(`${name} is not qual to fixed length: ${rule.fixedLength}`)
  }
  if (rule.minLength && value.length < rule.minLength) {
    return exceptionMaker.make(`${name} is shorter than min value: ${rule.minLength}`)
  }
  if (rule.maxLength && value.length > rule.maxLength) {
    return exceptionMaker.make(`${name} is longer than max value: ${rule.maxLength}`)
  }
}

const datetime = (value, rule, name) => {
  if (typeof value !== 'string') {
    return exceptionMaker.make(`${name} not in datetime type`)
  }
  if (!moment(value, rule.format, true).isValid()) {
    return exceptionMaker.make(`${name} is not matched with format: ${rule.format}`)
  }
}

const buffer = (value, rule, name) => {
  let stringValue
  if (rule.encoding && typeof value === 'string') {
    stringValue = value
    value = iconv.encode(value, rule.encoding)
  }
  if (!Buffer.isBuffer(value)) {
    return exceptionMaker.make(`${name} not in buffer type`)
  }
  if (rule.required && value.length === 0) {
    return exceptionMaker.make(`invalid ${name}`)
  }
  if (rule.minLength && value.length < rule.minLength) {
    return exceptionMaker.make(`${name} is shorter than min value: ${rule.minLength}`)
  }
  if (rule.maxLength && value.length > rule.maxLength) {
    return exceptionMaker.make(`${name} is longer than max value: ${rule.maxLength}`)
  }
  if (stringValue && iconv.decode(value, rule.encoding) !== stringValue) {
    return exceptionMaker.make(`${name} out of character set`)
  }
}

const types = {
  string,
  number,
  object,
  array,
  datetime,
  buffer
}


//
//
//

module.exports = types
