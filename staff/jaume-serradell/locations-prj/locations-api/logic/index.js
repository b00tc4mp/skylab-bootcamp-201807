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
    register(name, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('name', name)

                return Owner.findOne({ email })
            })
            .then(owner => {
                if (owner) throw new LogicError(`owner with ${email} email already exist`)

                return Owner.create({ name, email, password })
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

                return owner.id
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
     * @param {string} categories The categories of the property
     * @param {string} type The type of the property
     * 
     * @throws {LogicError} If owner email does not exist
     * @throws {LogicError} If wrong password
     * 
     */
    addProperty(email, title, subtitle, photo, description, categories, type) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField("title", title)
                this._validateStringField("photo", photo)
                this._validateStringField("type", type)

                if (!(categories instanceof Array)) throw new LogicError('invalid categories')

                return Owner.findOne({ email })
            })
            .then(owner => {
                if (!owner) throw new LogicError(`owner with ${email} email does not exist`)
                if (!categories || !categories.length) throw new LogicError('at least one category')

                return this._saveImage(photo)
                    .then(imageCloudinary => {
                        const property = { title, subtitle, photo: imageCloudinary, description, categories, type, owner: owner.id }

                        return Property.create(property)
                    })

            })
            .then(property => property)
            .catch(e => {
                if (e.message === 'invalid categories' || e.message === 'at least one category' || e.message === `owner with ${email} email does not exist` || e.message === 'invalid title' || e.message === 'invalid photo' || e.message === 'invalid type' || e.message === 'invalid email') {
                    throw e
                }
                else {
                    throw new Error(e.message)
                }
            })
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

    
    /** List properties by query
     * 
     * @param {string} type The ID of the property
     * @param {array} categories The categories of the property
     * 
     * @throws {LogicError} If categories are invalid
     * @throws {LogicError} If criteria are invalid
     * 
     */
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
     * @param {string} propertyId The ID of the property
     * 
     * @throws {LogicError} If id property does not exist
     * 
     */
    retrievePropertyById(propertyId) {
        return Promise.resolve()
            .then(() => {
                this._validateObjectId(propertyId)
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
     * @param {string} categories The categories of the property
     * @param {string} type The type of the property
     * 
     * @throws {LogicError} If owner email does not exist
     * @throws {LogicError} If id property does not exist
     * 
     */
    updatePropertyById(email, propertyId, title, subtitle, photo, description, categories, type) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateObjectId(propertyId)
                this._validateStringField("title", title)
                this._validateStringField("photo", photo)
                this._validateStringField("type", type)

                if (!(categories instanceof Array)) throw new LogicError('invalid categories')

                return Owner.findOne({ email })
                    .then(owner => {
                        if (!owner) throw new LogicError(`Owner with ${email} email does not exist`)
                        if (!categories || !categories.length) throw new LogicError('at least one category')
                        return Property.findOne({ _id: propertyId, owner: owner.id })
                            .then((property) => {
                                if (!property) throw new LogicError(`cannot update property ${propertyId}`)

                                return Property.updateOne({ _id: propertyId }, { $set: { "title": title, "subtitle": subtitle, "photo": photo, "description": description, "categories": categories, "type": type } })
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
            .then(() => true )
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }