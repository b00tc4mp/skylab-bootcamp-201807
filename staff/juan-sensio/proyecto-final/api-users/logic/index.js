'use strict'

const { ObjectId } = require('mongodb')

const logic = {
    _users: null,
    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },
    register(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                return this._users.findOne({ username })
            })
            .then(user => {
                if (user) throw new LogicError(`user ${username} already exists`)
                const _user = { username, password, data: {} }
                return this._users.insertOne(_user)
            })
            .then(() => true)
    },
    authenticate(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                return this._users.findOne({ username })
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                return user._id
            })
    },
    delete(id, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateStringField('password', password)
                return this._users.findOne(ObjectId(id))
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                return this._users.removeOne({_id: ObjectId(id)})
            })
            .then( () => true)
    },
    update(id, password, newUsername, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                this._validateStringField('password', password)
                this._validateStringField('newUsername', newUsername)
                this._validateStringField('newPassword', newPassword)
                return this._users.findOne({username: newUsername})
            })
            .then(user => {
                if(user && user._id.toString() != id) throw new LogicError(`user ${newUsername} already exists`)
                return this._users.findOne(ObjectId(id))
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                return this._users.updateOne({_id: ObjectId(id)}, {$set: {username: newUsername, password: newPassword}})
            })
            .then(() => true)
    },
    save(id, data) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                if(!(data instanceof Object) || Object.keys(data).length === 0) throw new LogicError('empty data')
                return this._users.findOne(ObjectId(id))
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                return this._users.updateOne({ _id: ObjectId(id) }, { $set: { data } })
            })
            .then(() => true)
    },
    retrieve(id) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('id', id)
                return this._users.findOne(ObjectId(id))
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                return user.data
            })
    }

}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }