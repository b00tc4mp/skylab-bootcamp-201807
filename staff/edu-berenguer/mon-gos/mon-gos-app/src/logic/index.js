const validateEmail = require('../utils/validate-email')
const logic = {
    url: 'https://rocky-lake-78116.herokuapp.com/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }
        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    },
    /**
     * Validate string
     * @param {string} fieldName 
     * @param {string} fieldValue 
     */
    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    /**
     * Validate number
     * @param {string} name 
     * @param {number} value 
     */
    _validateNumberField(name, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${name}`)
    },

    /**
     * Validate email
     * @param {email} email 
     */
    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    /**
     * Register shelter to API
     * @param {email} email The shelter´s email
     * @param {string} name The shelter´s name
     * @param {string} address The shelter´s address
     * @param {string} phone The shelter´s phone
     * @param {string} password The shelter´s password
     * @param {number} latitude The shelter´s latitude
     * @param {number} longitude The shelter´s longitude
     */
    register(email, name, address, phone, password, latitude, longitude) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('name', name)
                this._validateStringField('address', address)
                this._validateStringField('phone', phone)
                this._validateStringField('password', password)
                if (latitude)
                    this._validateNumberField('latitude', latitude)
                if (longitude)
                    this._validateNumberField('longitude', longitude)


                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, name, address, phone, password, latitude, longitude }), 201)
                    .then(() => true)
            })
    },

    /**
     * Authenticate shelter to API
     * @param {email} email The shelter´s email
     * @param {string} password The shelter´s email
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
                    .then((res) => res)
            })
    },

    /**
     * Insert dog to API
     * @param {string} id The dog´s id
     * @param {string} name The dog´s name
     * @param {string} gender The dog´s gender
     * @param {number} age The dog´s age
     * @param {number} weight The dog´s weight
     * @param {string} photo The dog´s photo
     * @param {string} description The dog´s description
     * @param {string} token The dog´s token
     */
    insertDog(id, name, gender, age, weight, photo, description, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateStringField('gender', gender)
                this._validateNumberField('age', age)
                this._validateNumberField('weight', weight)
                this._validateStringField('description', description)

                return this._call(`shelter/${id}/dog`, 'post',
                    { authorization: `bearer ${token}`, 'content-type': 'application/json' }
                    , JSON.stringify({ name, gender, age, weight, photo, description }), 200)
                    .then(res => res.json())
            })
    },

    /**
     * Upload photo
     * @param {string} photo 
     */
    uploadDogPhoto(photo) {
        return this._call('upload', 'PATCH', {'content-type': 'application/json' }, JSON.stringify({base64Image: photo}), 200)
            .then(res => res.json())
            .then(({ photo }) => photo)
    },

    /**
     * Remove dog to API
     * @param {string} id The shelter id
     * @param {string} dogId The dog´s dogId
     * @param {string} token The shelter token
     */
    removeDog(id, dogId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`remove/${id}/dog/${dogId}`, 'delete', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, undefined, 201)
            })
            .then(res => res.json())
    },

    /**
     * Dog adopted by id
     * @param {string} id The shelter´s id
     * @param {string} dogId The dog´s dogId
     * @param {string} token The shelter´s token
     */
    dogAdopted(id, dogId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/shelter/${id}/dog/${dogId}`, 'put', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },

    /**
     * Dog not adopted by id
     * @param {string} id The shelter´s id
     * @param {string} dogId The dog´s id
     * @param {string} token The shelter´s token
     */
    dogNotAdopted(id, dogId, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/shelter/${id}/dogNotAdopted/${dogId}`, 'put', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },

    /**
     * List dogs not adopted
     */
    listDogsNotAdopted() {
        return Promise.resolve()
            .then(() => {
                return this._call(`/listNotAdopteds`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    /**
     * List dogs adopted
     */
    listDogsAdopted() {
        return Promise.resolve()
            .then(() => {
                return this._call(`/listAdopteds`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    /**
     * List dogs by shelter
     * @param {string} id The shelter´s id
     * @param {string} token The shelter´s token
     */
    listDogsByShelter(id, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/listDogsByShelter/${id}`, 'get', { authorization: `bearer ${token}` }, undefined, 200)
            })
            .then(res => res.json())
    },

    /**
     * Retrieve information dog by id
     * @param {string} dogId The dog´s dogId
     */
    retrieveDog(dogId) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/retrieveDog/${dogId}`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    /**
     * Retrieve information shelter by id
     * @param {string} id The shelter´s id
     */
    retrieveShelter(id) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/retrieveShelter/${id}`, 'get', undefined, undefined, 200)
            })
            .then(res => res.json())
    },

    /**
     * Update dog by id
     * @param {string} id The shelter´s id
     * @param {string} dogId The dog´s dogId
     * @param {string} newName The dog´s newName
     * @param {string} newGender The dog´s newGender
     * @param {number} newAge The dog´s newAge
     * @param {number} newWeight The dog´s newWeight
     * @param {string} newPhoto The dog´s newPhoto
     * @param {string} newDescription The dog´s newDescription
     * @param {string} token The shelter´s token
     */
    updateDog(id, dogId, newName, newGender, newAge, newWeight, newPhoto, newDescription, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('newName', newName)
                this._validateStringField('newGender', newGender)
                this._validateNumberField('newAge', newAge)
                this._validateNumberField('newWeight', newWeight)
                this._validateStringField('newDescription', newDescription)
                return this._call(`/update/shelter/${id}/dog/${dogId}`, 'put',
                    { authorization: `bearer ${token}`, 'content-type': 'application/json' }
                    , JSON.stringify({ newName, newGender, newAge, newWeight, newPhoto, newDescription }), 200)
            })
            .then(res => res.json())
    },

    /**
     * List dogs by query
     * @param {string} gender The dog´s gender
     * @param {number} age The dog´s age
     * @param {number} weight The dog´s weight
     */
    listDogsByQuery(gender, age, weight) {
        return Promise.resolve()
            .then(() => {
                return this._call(`/listByQuery/?gender=${gender}&age=${age}&weight=${weight}`, 'get', { 'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }