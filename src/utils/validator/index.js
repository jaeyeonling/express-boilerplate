const exceptionMaker = require('./exception.maker')
const types = require('./types')

//
//
//

const validate = (value, rule, name) => {
  if (!value && rule.required) {
    throw exceptionMaker.make(`no ${name}`)
  }
  if (rule.type in types) {
    const exception = types[rule.type](value, rule, name)
    if (exception) {
      throw exception
    }
  }
  if (rule.type === 'object') {
    const parentRule = rule.rule
    Object.keys(parentRule)
      .some(key => validate(value[key], parentRule[key], key))
  }
  if (rule.constant) {
    if (Array.isArray(rule.constant)) {
      if (!rule.constant.includes(value)) {
        throw exceptionMaker.make(`invalid ${name}`)
      }
    } else {
      if (rule.constant !== value) {
        throw exceptionMaker.make(`invalid ${name}`)
      }
    }
  }
}


//
//
//

module.exports = {
  validate
}
