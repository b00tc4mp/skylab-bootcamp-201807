'use strict'

const { User } = require('../mongoose/models')
const fs = require('fs')
var rimraf = require('rimraf');

const dataPath = './data'
const modelsPath = './data/models'

if (!fs.existsSync(dataPath))
    fs.mkdirSync(dataPath)

if (!fs.existsSync(modelsPath))
    fs.mkdirSync(modelsPath)

const logic = {

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },

    register(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                return User.findOne({ username })
            })
            .then(user => {
                if (user) throw new LogicError(`user ${username} already exists`)
                return User.create({ username, password })
            })
            .then(user => {
                if (fs.existsSync(`${dataPath}/${user.id}`)) throw new Error(`data folder for user ${user.id} already exists`)
                fs.mkdirSync(`${dataPath}/${user.id}`)
                fs.mkdirSync(`${dataPath}/${user.id}/videos`)
                fs.mkdirSync(`${dataPath}/${user.id}/data-sets`)
                fs.mkdirSync(`${dataPath}/${user.id}/results`)
                return true
            })
    },

    authenticate(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                return User.findOne({ username })
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                return user.id
            })
    },
    
    updateUsername(id, password, newUsername) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateStringField('password', password)
                this._validateStringField('newUsername', newUsername)
                return User.findOne({username: newUsername})
            })
            .then(user => {
                if(user && user.id !== id) throw new LogicError(`user ${newUsername} already exists`)
                return User.findById(id)
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                return User.findByIdAndUpdate(id, {$set: {username: newUsername}})
            })
            .then(() => true)
    },

    updatePassword(id, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateStringField('password', password)
                this._validateStringField('newPassword', newPassword)
                return User.findById(id)
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                if (user.password === newPassword) throw new LogicError('new password must be different')
                return User.findByIdAndUpdate(id, {$set: {password: newPassword}})
            })
            .then(() => true)
    }, 
    
    delete(id, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateStringField('password', password)
                return User.findById(id)
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                return User.findByIdAndRemove(id)
            })
            .then(() => {
                rimraf(`${dataPath}/${id}`, () => {})
                return true
            })
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }