const validateEmail = require('../utils/validate-email')
const validateBase64Image = require('../utils/validate-base64-img')

const validate = {

    _objectField(name, value) {
        //if (!(value instanceof constructor)) throw new Error(`invalid ${name}`)
        if (typeof value !== 'object') throw new Error(`invalid ${name}`)
    },
    
    _stringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new Error(`invalid ${name}`)
    },

    _email(email) {
        if (!validateEmail(email)) throw new Error('invalid email')
    },

    _password(name, field) {
        this._stringField(name, field)
        if (field.length < 6) throw new Error(`${name} length is too short`)
        if (/\s/.test(field)) throw new Error(`${name} cannot contain any space`)
    },

    _dateField(name, field) {
        if (!(field instanceof Date)) throw new Error(`invalid ${name}`)
    },

    _enumField(name, field, maxEnum) {
        if (!(Number(field) === field && field % 1 === 0 && field >= 0 && field <= maxEnum)) 
            throw new Error(`invalid ${name}`)
    },

    //Check that longitude is above -180 and below 180 and latitude is above -90 and below 90
    _location(location) { 
        if (location[0] < -180 || location[0] > 180 || location[1] < -90 || location[1] > 90)
            throw new Error(`invalid location with longitude ${location[0]} and latitude ${location[1]}`)
    },

    //Check that latitude is above -90 and below 90
    _latitude(latitude) { 
        if (latitude < -90 || latitude > 90)
            throw new Error(`invalid latitude ${latitude}`)
    },

    //Check that longitude is above -180 and below 180
    _longitude(longitude) { 
        if (longitude < -180 || longitude > 180)
            throw new Error(`invalid longitude ${longitude}`)
    },

    _intField(name, field, min, max) {
        if (!(Number(field) === field && field % 1 === 0 && field >= min && field <= max)) 
            throw new Error(`invalid ${name}`)
    },

    _floatField(name, field, min, max) {
        if (!(Number(field) === field && field >= min && field <= max)) 
            throw new Error(`invalid ${name}`)
    },

    _base64Image(base64Img) {
        if (!validateBase64Image(base64Img))  throw new Error('invalid base 64 format image')
    }

}

module.exports = validate