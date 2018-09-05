'use strict'

const { User, Video } = require('../mongoose/models')
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

    // user management

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
                return User.findOne({ username: newUsername })
            })
            .then(user => {
                if (user && user.id !== id) throw new LogicError(`user ${newUsername} already exists`)
                return User.findById(id)
            })
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.password !== password) throw new LogicError('wrong credentials')
                return User.findByIdAndUpdate(id, { $set: { username: newUsername } })
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
                return User.findByIdAndUpdate(id, { $set: { password: newPassword } })
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
                rimraf(`${dataPath}/${id}`, () => { })
                return true
            })
    },

    // video management

    getVideoPath(id, name) {
        return `${dataPath}/${id}/videos/${name}`
    },

    saveVideo(id, name, file) {
        return Video.create({ name })
            .then(video => {
                const path = this.getVideoPath(id, name)
                fs.writeFileSync(path, file)
                return User.findById(id)
                    .then(user => {
                        if (!user) throw new LogicError(`user ${username} does not exist`)
                        user.videos.push(video.id)
                        user.save()
                    })
            })
    },

    deleteVideo(id, videoId) {
        return User.findById(id)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                const index = user.videos.indexOf(videoId)
                if (index > -1) {
                    user.videos.splice(index, 1)
                    user.save()
                    return Video.findById(videoId)
                        .then(video => {
                            const path = this.getVideoPath(id, video.name)
                            fs.unlink(path, err => {
                                if (err)
                                    throw new Error('video not found')
                            })
                            video.remove()
                        })
                } else {
                    throw new Error('video not found')
                }
            })
    },

    retrieveVideos(id) {
        return User.findById(id)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                return user.videos
            })
    },

    retrieveVideo(id, videoId) {
        return User.findById(id)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.videos.indexOf(videoId) > -1)
                    return Video.findById(videoId)
                        .then(video => {
                            if (!video) throw new LogicError(`video not found`)
                            return this.getVideoPath(id, video.name)
                        })
                else
                    throw new Error('video not found')
            })
    }

}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }