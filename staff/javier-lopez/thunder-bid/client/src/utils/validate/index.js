const validate = {
    
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length || value.indexOf(' ') === 0 || value.indexOf(' ') === value.length-1) throw new Error(`invalid ${name}`)
    },

    _validateEmail(email) {
        let res = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
        if (!res) throw new Error('Invalid email')
    },

    _validateNumber(number){
        if (typeof number !== 'number') throw Error('The value is not a number')
    },

    _validateQueryString(name, value) {
        if (typeof value !== 'string' || !value.length || value.indexOf(' ') === 0) throw new Error(`Invalid ${name}`)
    },

    _validateBoolean(name, value){
        if(typeof value !== 'boolean') throw new Error(`Invalid ${name}`)
    }
}

 module.exports = { validate }
 