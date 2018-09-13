const User = require('../data/models/user')
const mongoose = require('mongoose')
const validateEmail = require('../utils/validate-email')

/** Bussines logic from Reciclatge-api */
const logic = {

    /** This is the function to validate string field
    * @param {string} name - The name of the field
    * @param {string} value - The value of the field
    */
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    /** This is the function to validate the email
     * @param {string} email - The user email
     */
    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    /** This is the function to register a user
     * @param {string} email - The email form the user
     * @param {string} password - The password from the user
     * @return {promise} - If the user is correctly create to the database
     */
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

    /** This is the function to login a user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @return {promise} - If the user is login correctly
     */
    login(email, password) {
        return Promise.resolve()
            .then(() => {
                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)
                if (user.password !== password) throw new LogicError(`wrong password`)
                return user.id
            })
    },

    /** This is the function to update the user password
     * @param {string} email - The email of the user
     * @param {string} password - The old password of the user
     * @param {string} newPassword - The new password of the user
     * @return {promise} - If the user is updated correctly
     */
    update(email, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)
                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exists`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                if (password === newPassword) throw new LogicError('new password cannot be same as current password')
                return User.updateOne({ _id: user._id }, { $set: { password: newPassword } })
            })
    },

    /** This is the function to delete a user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @return {promise} - If the user is deleted correctly
     */
    delete(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                return User.findOne({ email })
            })
            .then(user => {
                if (user.password !== password) throw new LogicError(`wrong password`)
                return User.deleteOne({ _id: user._id })
            })
    }
}

/** The class LogicError, to handle the errors */
class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }

