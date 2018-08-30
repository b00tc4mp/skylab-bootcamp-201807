const moment = require('moment')
const  User = require('../data/models/user')


const logic = {
    register(email, password) {
        return Promise.resolve()
            .then(() => {
                return User.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`user with ${email} email already exist`)

                return User.create({ email, password })
            })
            .then(() => true)
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {


                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return true
            })
    },

    updatePassword(email, password, newPassword) {
        return Promise.resolve()
            .then(() => {


                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                if (password === newPassword) throw new LogicError('new password must be different to old password')

                user.password = newPassword

                return user.save()
            })
            .then(() => true)
    },

    unregisterUser(email, password) {
        return Promise.resolve()
            .then(() => {


                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return User.deleteOne({ _id: user._id })
            })
            .then(() => true)
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }

