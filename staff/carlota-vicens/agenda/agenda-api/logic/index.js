'use strict'

const fs = require('fs')

const logic = {
    _users: null,

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },

    _validateEmail(email, emailValue) {

    },

    register(email, name, surname, password) {
        return Promise.resolve()
            .then(() => {
                //this._validateEmail('email', email)
                this._validateStringField('email', email)
                this._validateStringField('name', name)
                this._validateStringField('surname', surname)
                this._validateStringField('password', password)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`user with email ${email} already exists`)

                const _user = { email, name, surname, password }

                return this._users.insertOne(_user)
            })

    },


    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                //this._validateEmail('email', email)
                this._validateStringField('email', email)
                this._validateStringField('password', password)

                return this._users.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with email ${email} is not registered`)

                if (user.password !== password) throw new LogicError('wrong password')

                return true
            })
    }




}