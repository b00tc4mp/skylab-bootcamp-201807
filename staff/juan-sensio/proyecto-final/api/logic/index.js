'use strict'

const { User, Video, Dataset, Model, Result } = require('../mongoose/models')
const fs = require('fs')
const rimraf = require('rimraf');
const posenet = require('./posenet')
const pix2pix = require('./pix2pix')

const dataPath = './data'
if (!fs.existsSync(dataPath))
    fs.mkdirSync(dataPath)

const modelsPath = './models'
const freeModelsFile = './logic/freeModels.json'

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

                // cuando user se logea se cargan los modelos gratis
                const models = JSON.parse(fs.readFileSync(freeModelsFile, 'utf8'))
                user.models = models
                user.save()

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
                return Promise.all(user.videos.map(id => Video.findByIdAndRemove(id)))
                    .then(() => Promise.all(user.datasets.map(id => Dataset.findByIdAndRemove(id))))
            })
            .then(() => User.findByIdAndRemove(id))
            .then(() => {
                rimraf(`${dataPath}/${id}`, () => { })
                return true
            })
    },

    // video management

    getVideoPath(userId, videoName) {
        return `${dataPath}/${userId}/videos/${videoName}`
    },

    saveVideo(id, name, file) {
        return Video.create({ name })
            .then(video => {
                const path = this.getVideoPath(id, name)
                const exist = fs.existsSync(path)
                fs.writeFileSync(path, file)
                if (!exist) {
                    return User.findById(id)
                        .then(user => {
                            if (!user) throw new LogicError(`user ${username} does not exist`)
                            user.videos.push(video.id)
                            user.save()
                        })
                }
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
    },

    // dataset management

    getDatasetPath(userId, datasetName) {
        return `${dataPath}/${userId}/data-sets/${datasetName}`
    },

    buildDataset(userId, videoId, settings) {
        return User.findById(userId)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.videos.indexOf(videoId) > -1)
                    return Video.findById(videoId)
                        .then(video => {
                            if (!video) throw new LogicError(`video not found`)
                            const videoPath = this.getVideoPath(userId, video.name)
                            const datasetPath = this.getDatasetPath(userId, video.name)
                            const exist = fs.existsSync(datasetPath)
                            return posenet.buildDataset(videoPath, datasetPath, `./data/${userId}`, settings)
                                .then(() => {
                                    if (!exist)
                                        return Dataset.create({ name: video.name })
                                            .then(dataset => {
                                                user.datasets.push(dataset.id)
                                                user.save()
                                            })
                                })
                                .catch(err => {
                                    throw new LogicError(err)
                                })



                        })

                else
                    throw new Error('video not found')
            })
    },

    retrieveDatasets(userId) {
        return User.findById(userId)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                return user.datasets
            })
    },

    deleteDataset(userId, datasetId) {
        return User.findById(userId)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                const index = user.datasets.indexOf(datasetId)
                if (index > -1) {
                    user.datasets.splice(index, 1)
                    user.save()
                    return Dataset.findById(datasetId)
                        .then(dataset => {
                            const path = this.getDatasetPath(userId, dataset.name)
                            fs.unlink(path, err => {
                                if (err)
                                    throw new Error('dataset not found')
                            })
                            dataset.remove()
                        })
                } else {
                    throw new Error('dataset not found')
                }
            })
    },

    retrieveDataset(id, datasetId) {
        return User.findById(id)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.datasets.indexOf(datasetId) > -1)
                    return Dataset.findById(datasetId)
                        .then(dataset => {
                            if (!dataset) throw new LogicError(`dataset not found`)
                            return this.getDatasetPath(id, dataset.name)
                        })
                else
                    throw new Error('dataset not found')
            })
    },

    // results managemenet

    getResultsPath(userId, resultName) {
        return `${dataPath}/${userId}/results/${resultName}`
    },

    buildResult(userId, datasetId, modelId, settings) {
        // de momento, copiar el data-set como result

        return User.findById(userId)
            .then(user => Dataset.findById(datasetId)
                .then(({ name }) => {
                    return Model.findById(modelId)
                        .then(model => {
                            const userPath = `./data/${userId}`
                            const datasetPath = this.getDatasetPath(userId, name)
                            const modelPath = `./models/${model.name}`

                            let modelSourceArray = model.source.split('.')
                            modelSourceArray.pop()
                            
                            const resultName = modelSourceArray.join('.') + '-' + name
                            const resultPath = this.getResultsPath(userId, resultName)

                            const exist = fs.existsSync(resultPath)
                            return pix2pix.buildResult(userPath, datasetPath, modelPath, resultPath, settings)
                                .then(() => {
                                    if (!exist)
                                        return Result.create({ name: resultName })
                                            .then(result => {
                                                user.results.push(result.id)
                                                user.save()
                                            })
                                })
                        })
                })
            )
            .catch(err => {
                throw new LogicError(err)
            })
    },

    retrieveResults(userId) {
        return User.findById(userId)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                return user.results
            })
    },

    deleteResult(userId, resultId) {
        return User.findById(userId)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                const index = user.results.indexOf(resultId)
                if (index > -1) {
                    user.results.splice(index, 1)
                    user.save()
                    return Result.findById(resultId)
                        .then(result => {
                            const path = this.getResultsPath(userId, result.name)
                            fs.unlink(path, err => {
                                if (err)
                                    throw new Error('result not found')
                            })
                            result.remove()
                        })
                } else {
                    throw new Error('result not found')
                }
            })
    },

    retrieveResult(id, resultId) {
        return User.findById(id)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.results.indexOf(resultId) > -1)
                    return Result.findById(resultId)
                        .then(result => {
                            if (!result) throw new LogicError(`result not found`)
                            return this.getResultsPath(id, result.name)
                        })
                else
                    throw new Error('result not found')
            })
    },

    // models managament

    retrieveModels(userId) {
        return User.findById(userId)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                return user.models
            })
    },

    retrieveModel(id, modelId) {
        return User.findById(id)
            .then(user => {
                if (!user) throw new LogicError(`user ${username} does not exist`)
                if (user.models.indexOf(modelId) > -1)
                    return Model.findById(modelId)
                        .then(model => {
                            if (!model) throw new LogicError(`model not found`)
                            return `${modelsPath}/${model.source}`
                        })
                else
                    throw new Error('model not found')
            })
    },
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }