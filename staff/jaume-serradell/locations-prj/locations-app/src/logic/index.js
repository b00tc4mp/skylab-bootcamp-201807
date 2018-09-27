const validateEmail = require('../utils/validate-email')

const logic = {
    url: 'https://enigmatic-reaches-40861.herokuapp.com/api',

   /** Method to api called
     * 
     * @param {string} path
     * @param {string} method
     * @param {string} headers
     * @param {json} body
     * @param {number} expectedStatus
     * 
     * @throws {Error} Fetch error
     * 
     */
    _call(path, method, headers, body, expectedStatus) {
        const config = { method }

        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else {
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
                }
            })
    },

    /** String field validator
     * 
     * @param {string} fieldName The name of the value
     * @param {string} fieldValue The value of the value
     * 
     * @throws {LogicError} If field name is invalid
     * 
     */
    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
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

    /** Register owner with email, password and name
     * 
     * @param {string} email The owner's email
     * @param {string} password The owner's password
     * @param {string} name The owner's name
     * 
     */
    register(name, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ name, email, password }), 201)
                    .then(() => true)
            })
    },

    /** Authenticate owner with email and password
     * 
     * @param {string} email The owner's email
     * @param {string} password The owner's password
     * 
     */
    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('authenticate', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },

    /** Update owner password
     * 
     * @param {string} email The owner's email
     * @param {string} password The owner's password
     * @param {string} newPassword The owner's new password
     * @param {string} token The owner's provided token
     * 
     */
    updatePassword(email, password, newPassword, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._call(`owner/${email}/update`, 'patch', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, password, newPassword }), 200)
            })
            .then(res => res.json())

    },

    /** Unregister owner
     * 
     * @param {string} email The owner's email
     * @param {string} password The owner's password
     * @param {string} token The owner's provided token
     * 
     */
    unregisterOwner(email, password, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call(`owner/${email}/unregister`, 'delete', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, password }), 200)
            })
            .then(res => res.json())
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
     * @param {string} token The owner's provided token
     * 
     */
    addProperty(email, title, subtitle, photo, description, categories, type, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title', title)
                this._validateStringField('photo', photo)
                this._validateStringField('type', type)
                if (!(categories instanceof Array)) throw new LogicError('invalid categories')

                return this._call(`owner/${email}/property`, 'post', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ email, title, subtitle, photo, description, categories, type }), 200)
            })
            .then(res => res.json())
            .then(id => {
                return id
            })
    },

    /** Retrieve properties by ID
     * 
     * @param {string} propertyId The ID of the property
     * 
     */
    retrieveProperty(propertyId) {
        return Promise.resolve()
            .then(() => {

                return this._call(`properties/${propertyId}`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
            .then(property => {
                return property
            })
    },

    /** Update property
     * 
     * @param {string} propertyId The ID of the property
     * @param {string} email The owner's email
     * @param {string} token The owner's provided token
     * @param {string} title The title of the property
     * @param {string} subtitle The Subtitle of the property
     * @param {string} photo The photo of the property
     * @param {string} description The description of the property
     * @param {string} categories The categories of the property
     * @param {string} type The type of the property
     * 
     */
    updatePropertyById(propertyId, email, token, title, subtitle, description, photo, categories, type) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title', title)
                this._validateStringField('photo', photo)
                this._validateStringField('type', type)
                if (!(categories instanceof Array)) throw new LogicError('invalid categories')

                return this._call(`owner/${email}/property/${propertyId}`, 'PATCH', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ title, subtitle, photo, description, categories, type, token }), 200)
                    .then(res => res.json())
                    .then(res => res.message)
            })
    },

    /** List properties by query
     * 
     * @param {string} type The ID of the property
     * @param {array} categories The categories of the property
     * 
     */
    listPropertyByQuery(type = 'all', categories = []) {
        return Promise.resolve()
            .then(() => {
                let url = 'listProperties'

                // Si vienen filtros
                if (type !== 'all' ||  categories.length) {
                    // Vienen ambos filtros
                    if (type !== 'all' && categories.length) {
                        url += `?type=${type}&categories=${categories}`
                    }
                    else { // Viene uno de los dos
                        if (type !== 'all') url += `?type=${type}`
                        if (categories.length) url += `?categories=${categories}`
                    }
                }

                return this._call(url, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    /** Delete property
     * 
     * @param {string} email The owner's email
     * @param {string} propertyId The ID of the property
     * @param {string} token The owner's provided token
     * 
     */
    deletePropertyById(email, propertyId, token) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                return this._call(`owner/${email}/property/${propertyId}`, 'delete', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => {
                return res.json()
            })
            .then(res => res)
    },

    /**
     * Upload photo
     * 
     * @param {string} photo 
     */
    uploadPropertyPhoto(photo) {
        return this._call('upload', 'PATCH', {'content-type': 'application/json' }, JSON.stringify({base64Image: photo}), 200)
            .then(res => res.json())
            .then(({ photo }) => photo)
    },
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = logic
