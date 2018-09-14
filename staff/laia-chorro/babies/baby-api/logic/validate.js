'use strict'

const validateEmail = require('../utils/validate-email')
const validateBase64Image = require('../utils/validate-base64-img')
const LogicError = require('./LogicError.js')
const mongoose = require('mongoose')


const validate = {

    _objectField(name, value) {
        if (!(value instanceof constructor)) throw new LogicError(`invalid ${name}`)
    },
    
    _stringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _email(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    _password(name, field) {
        this._stringField(name, field)
        if (field.length < 6) throw new LogicError(`${name} length is too short`)
        if (/\s/.test(field)) throw new LogicError(`${name} cannot contain any space`)
    },

    _dateField(name, field) {
        if (!(field instanceof Date)) throw new LogicError(`invalid ${name}`)
    },

    _enumField(name, field, maxEnum) {
        if (!(Number(field) === field && field % 1 === 0 && field >= 0 && field <= maxEnum)) 
            throw new LogicError(`invalid ${name}`)
    },

    //Check that longitude is above -180 and below 180 and latitude is above -90 and below 90
    _location(location) { 
        if (location[0] < -180 || location[0] > 180 || location[1] < -90 || location[1] > 90)
            throw new LogicError(`invalid location with longitude ${location[0]} and latitude ${location[1]}`)
    },

    //Check that latitude is above -90 and below 90
    _latitude(latitude) { 
        if (latitude < -90 || latitude > 90)
            throw new LogicError(`invalid latitude ${latitude}`)
    },

    //Check that longitude is above -180 and below 180
    _longitude(longitude) { 
        if (longitude < -180 || longitude > 180)
            throw new LogicError(`invalid longitude ${longitude}`)
    },

    _intField(name, field, min, max) {
        if (!(Number(field) === field && field % 1 === 0 && field >= min && field <= max)) 
            throw new LogicError(`invalid ${name}`)
    },

    _floatField(name, field, min, max) {
        if (!(Number(field) === field && field >= min && field <= max)) 
            throw new LogicError(`invalid ${name}`)
    },

    _objectId(name, field) {
        if (!mongoose.Types.ObjectId.isValid(field)) 
            throw new LogicError(`invalid id in ${name}`)
    },

    _base64Image(base64Img) {
        if (!validateBase64Image(base64Img))  throw new LogicError('invalid base 64 format image')
    }

}

module.exports = validate