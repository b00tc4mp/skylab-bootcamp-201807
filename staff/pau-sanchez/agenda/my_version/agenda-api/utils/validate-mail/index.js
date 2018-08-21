
emailValidate = (email) => {
    const { SuperError } = require('../../logic')
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
      return true
    } else {
        debugger
        throw new SuperError('invalid email')
    }
}

module.exports = emailValidate