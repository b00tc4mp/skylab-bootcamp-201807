const validateEmail = require('../utils/validate-email')
const { Property, Owner } = require('../data/models')
const cloudinary = require('cloudinary')
const mongoose = require('mongoose')

cloudinary.config({
    cloud_name: 'locationssky',
    api_key: '669844342926842',
    api_secret: 'RvGkuR632nomFrd-_NNYe2CXt60'
})

const logic = {

    /** String field validator
     * 
     * @param {string} name The name of the value
     * @param {string} value The value of the value
     * 
     * @throws {LogicError} If string input is invalid
     * 
     */
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    /** ObjectId validator
     * 
     * @param {string} id The Id of the value
     * 
     * @throws {LogicError} If ObjectId is invalid
     * 
     */
    _validateObjectId(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new LogicError(`invalid property id: ${id}`)
    },


    /** Email validator
     * 
     * @param {string} email The owner's email
     * 
     * @throws {LogicError} If mail is invalid
     * 
     */
    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    /** Number field validator
     * 
     * @param {string} name The name of the value
     * @param {string} value The value of the value
     * 
     * @throws {LogicError} If number input is invalid
     * 
     */
    _validateNumberField(name, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${name}`)
    },


    /**
     * 
     * @param {*} base64Image 
     */
    _saveImage(base64Image) {
        return Promise.resolve()
            .then(() => {
                if (typeof base64Image !== 'string') new LogicError('base64Image is not a string')

                return new Promise((resolve, reject) => {
                    return cloudinary.v2.uploader.upload(base64Image, function (err, data) {
                        if (err) return reject(err)

                        resolve(data.url)
                    })
                })
            })
    },


    /** Register owner with email, password and name
     * 
     * @param {string} email The owner's email
     * @param {string} password The owner's password
     * @param {string} name The owner's name
     * 
     * @throws {LogicError} If owner email is already exist
     * 
     */
    register(email, password, name) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('name', name)

                return Owner.findOne({ email })
            })
            .then(owner => {
                if (owner) throw new LogicError(`owner with ${email} email already exist`)

                return Owner.create({ email, password, name })
            })
            .then(() => true)
    },


    /** Authenticate owner with email and password
     * 
     * @param {string} email The owner's email
     * @param {string} password The owner's password
     * 
     * @throws {LogicError} If owner email does not exist
     * @throws {LogicError} If wrong password
     * 
     */
    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return Owner.findOne({ email })
            })
            .then(owner => {
                if (!owner) throw new LogicError(`owner with ${email} email does not exist`)

                if (owner.password !== password) throw new LogicError(`wrong password`)

                return true
            })
    },


    /** Update owner password
     * 
     * @param {string} email The owner's email
     * @param {string} password The owner's password
     * @param {string} newPassword The owner's new password
     * 
     * @throws {LogicError} If owner email does not exist
     * @throws {LogicError} If wrong password
     * @throws {LogicError} If password is equal as the new password
     * 
     */
    updatePassword(email, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return Owner.findOne({ email })
            })
            .then(owner => {
                debugger
                if (!owner) throw new LogicError(`owner with ${email} email does not exist`)

                if (owner.password !== password) throw new LogicError(`wrong password`)

                if (password === newPassword) throw new LogicError('new password must be different to old password')

                owner.password = newPassword

                return owner.save()
            })
            .then(() => true)
    },


    /** Unregister owner
     * 
     * @param {string} email The owner's email
     * @param {string} password The owner's password
     * 
     * @throws {LogicError} If owner email does not exist
     * @throws {LogicError} If wrong password
     * 
     */
    unregisterOwner(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return Owner.findOne({ email })
            })
            .then(owner => {
                if (!owner) throw new LogicError(`owner with ${email} email does not exist`)

                if (owner.password !== password) throw new LogicError(`wrong password`)

                return Owner.deleteOne({ _id: owner._id })
            })
            .then(() => true)
    },


    /** Add new property
     * 
     * @param {string} email The owner's email
     * @param {string} title The title of the property
     * @param {string} subtitle The subtitle of the property
     * @param {string} photo The url of the photo
     * @param {string} description The description of the property
     * @param {number} dimentions THe dimentions of the property
     * @param {string} categories The categories of the property
     * @param {string} type The type of the property
     * 
     * @throws {LogicError} If owner email does not exist
     * @throws {LogicError} If wrong password
     * 
     */
    addProperty(email, title, subtitle, photo, description, dimentions, categories, type) {
        return Promise.resolve()
            .then(() => {

                this._validateEmail(email)
                this._validateStringField("title", title)
                this._validateStringField("photo", photo)
                this._validateNumberField("dimentions", dimentions)
                this._validateStringField("type", type)

                if (!(categories instanceof Array)) throw new LogicError('invalid categories')

                return Owner.findOne({ email })
            })
            .then(owner => {
                if (!owner) throw new LogicError(`owner with ${email} email does not exist`)
                if (!categories || !categories.length) throw new LogicError('at least one category')

                return this._saveImage(photo)
                    .then(imageCloudinary => {
                        const property = { title, subtitle, photo: imageCloudinary, description, dimentions, categories, type, owner: owner.id }

                        return Property.create(property)
                    })
            })
            .then(() => true)
    },

    /** List all properties
     * 
     * 
     */
    listProperty() {
        return Promise.resolve()
            .then(() => {
                return Property.find().lean()
            })
            .then(properties => {
                if (properties) {
                    properties.forEach(property => {
                        property.id = property._id.toString()

                        delete property._id

                        delete property.__v
                    })
                }

                return properties || []
            })
    },

    listPropertyByQuery(type, categories) {
        return Promise.resolve()
            .then(() => {
                let criteria = {}

                if (type) {
                    this._validateStringField("type", type)
                    criteria.type = type
                }

                if (categories) {
                    if (!(categories instanceof Array)) throw new LogicError('invalid categories')
                    criteria.categories = { $in: categories }
                }

                if (!Object.keys(criteria).length) throw new LogicError('Invalid search')

                return Property.find(criteria).lean()
                    .then(properties => {
                        if (properties) {
                            properties.forEach(property => {
                                property.id = property._id.toString()

                                delete property._id
                                delete property.__v
                            })
                        }
                        return properties
                    })
            })
    },

    /** Retrieve properties by ID
     * 
     * @param {string} email The owner's email
     * @param {string} propertyId The ID of the property
     * 
     * @throws {LogicError} If owner email does not exist
     * @throws {LogicError} If id property does not exist
     * 
     */
    retrievePropertyById(email, propertyId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateObjectId(propertyId)

                return Owner.findOne({ email })
            })
            .then(owner => {
                if (!owner) throw new LogicError(`Owner with ${email} email does not exist`)

                return Property.findById(propertyId).lean()
                    .then(property => {
                        if (!property) throw new LogicError(`Property with id ${propertyId} does not exist`)
                        property.id = property._id.toString()

                        delete property._id

                        delete property.__v

                        return property
                    })
            })
    },


    /** Update property
     * 
     * @param {string} email The owner's email
     * @param {string} propertyId The ID of the property
     * @param {string} title The title of the property
     * @param {string} subtitle The Subtitle of the property
     * @param {string} photo The photo of the property
     * @param {string} description The description of the property
     * @param {number} dimentions The dimentions of the property
     * @param {string} categories The categories of the property
     * @param {string} type The type of the property
     * 
     * @throws {LogicError} If owner email does not exist
     * @throws {LogicError} If id property does not exist
     * 
     */
    updatePropertyById(email, propertyId, title, subtitle, photo, description, dimentions, categories, type) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateObjectId(propertyId)
                this._validateStringField("title", title)
                this._validateStringField("photo", photo)
                this._validateNumberField('dimentions', dimentions)
                this._validateStringField("type", type)

                return Owner.findOne({ email })
                    .then(owner => {
                        if (!owner) throw new LogicError(`Owner with ${email} email does not exist`)
                        return Property.findOne({ _id: propertyId, owner: owner.id })
                            .then((property) => {
                                if (!property) throw new LogicError(`cannot update property ${propertyId}`)

                                return Property.updateOne({ _id: propertyId }, { $set: { "title": title, "subtitle": subtitle, "photo": photo, "description": description, "dimentions": dimentions, "categories": categories, "type": type } })
                                    .then(() => true)
                            })
                    })
            })
    },


    /** Delete property
     * 
     * @param {string} email 
     * @param {string} propertyId 
     */
    deletePropertyById(email, propertyId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateObjectId(propertyId)

                return Property.findByIdAndRemove({ email, _id: propertyId })
            })
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }



/////////////////////////////////////////
// ROUTES JAMES

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()


//USER ROUTES//

// REGISTER OWNER

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, password, name } } = req

    logic.register(email, password, name)
        .then(() => res.status(201).json({ message: 'owner registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})

// AUTHENTICATE OWNER

router.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'owner authenticated', token })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

// UPDATE OWNER PASSWORD

router.patch('/owner/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password, newPassword } } = req
    debugger
    logic.updatePassword(email, password, newPassword)
        .then(() => res.json({ message: 'owner password updated succesfully' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//DELETE OWNER

router.delete('/owner/:email', [validateJwt, jsonBodyParser], (req, res) => {
    const { body: { email, password } } = req

    logic.unregisterOwner(email, password)
        .then(() => res.json({ message: 'owner deleted succesfully' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})

// ADD PROPERTY

router.post('/owner/:email/property', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { title, subtitle, photo, description, dimentions, categories, type } } = req

    logic.addProperty(email, title, subtitle, photo, description, dimentions, categories, type)
        .then(() => res.json({ message: 'property added' }))
        .catch(err => {
            const { message } = err
            debugger

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// LIST PROPERTIES (ALL OR WITH FILTERS)

router.get('/listProperties', (req, res) => {
    const query = req.query

    if (query.hasOwnProperty('type') || query.hasOwnProperty('categories')) {
        const type = req.query.type
        const categories = req.query.categories ? req.query.categories.split('|') : undefined

        logic.listPropertyByQuery(type, categories)
            .then(properties => {
                res.status(200).json({ status: 'OK', properties })
            })
            .catch(err => {
                const { message } = err

                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    } else {
        logic.listProperty()
            .then(properties => {
                res.status(200).json({ status: 'OK', properties })
            })
            .catch(err => {
                const { message } = err

                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    }
})

// RETRIEVE PROPERTY BY ID

router.get('/retrievePropertyById/:email/property/:id', validateJwt, (req, res) => {
    const { params: { email, id } } = req

    logic.retrievePropertyById(email, id)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// UPDATE PROPERTY

router.patch('/updatePropertyById/:email/property/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email, id }, body: { title, subtitle, photo, description, dimentions, categories, type } } = req
    logic.updatePropertyById(email, id, title, subtitle, photo, description, dimentions, categories, type)
        .then(() => res.json({ message: 'property updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//DELETE PROPERTY

router.delete('/deletePropertyById/:email/property/:id', [validateJwt], (req, res) => {
    const { params: { email, id } } = req

    logic.deletePropertyById(email, id)
        .then(() => res.json({ message: 'property deleted succesfully' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})

module.exports = router




///////////////////////////////////KKKKKKKKKKKKKKKKK
// intento de crear hostessts
createForPlay(hostesses) {


    const business1 = {
        email: 'business1@mail.com',
        password: password,
        favs: [],
    }

    const host1 = {
        email: 'host1@mail.com',
        password: password,
        gender: 'M',
        jobType: 'sells',
        languages: ['catalan', 'spanish'],
        height: 150
    }

    const host2 = {
        email: 'host2@mail.com',
        password: password,
        gender: 'M',
        jobType: 'animation',
        languages: ['english', 'spanish'],
        height: 160
    }

    const host3 = {
        email: 'host3@mail.com',
        password: password,
        gender: 'W',
        jobType: 'image',
        languages: ['english', 'german'],
        height: 170
    }

    const host4 = {
        email: 'host4@mail.com',
        password: password,
        gender: 'W',
        jobType: 'info',
        languages: ['english', 'catalan'],
        height: 180
    }

    const host5 = {
        email: 'host5@mail.com',
        password: password,
        gender: 'W',
        jobType: 'info',
        languages: ['spanish', 'catalan'],
        height: 180
    }

    const hostesses = [host1, host2, host3, host4, host5, business1]

    return Promise.resolve()
        .then(() => {
            const host = hostesses
            return Hostess.create(host)
        })

        createForPlay()
},