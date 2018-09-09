const validateEmail = require('../utils/validate-email')
const { Shelter, Dog } = require('../data/models')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'eduberenguer',
    api_key: '675355792715415',
    api_secret: 'l36mLU5_GJ4PPXsdvXlAm7_H-gY'
})

const logic = {
    /**
     * Validate string
     * @param {string} fieldName 
     * @param {string} fieldValue 
     */
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    /**
     * Validate email
     * @param {email} email 
     */
    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    /**
     * 
     * @param {string} name 
     * @param {number} value 
     */
    _validateNumberField(name, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${name}`)
    },

    /**
     * 
     * @param {string} base64Image 
     */
    _saveImage(base64Image) {
        return Promise.resolve().then(() => {
            if (typeof base64Image !== 'string') throw new LogicError('base64Image is not a string')

            return new Promise((resolve, reject) => {
                return cloudinary.v2.uploader.upload(base64Image, function (err, data) {
                    if (err) return reject(err)

                    resolve(data.url)
                })
            })
        })
    },

    /**
     * Register shelter to API
     * @param {string} email The shelter´s email
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

                return Shelter.findOne({ email })
            })
            .then(shelter => {
                if (shelter) throw new LogicError(`shelter with ${email} email already exist`)

                return Shelter.create({ email, name, address, phone, password, latitude, longitude })
            })
            .then(() => true)
    },

    /**
     * Authenticate shelter to API
     * @param {string} email Authenticate shelter´s email
     * @param {string} password Authenticate shelter´s password
     */
    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return Shelter.findOne({ email })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`shelter with ${email} email does not exist`)

                if (shelter.password !== password) throw new LogicError(`wrong password`)

                return shelter.id
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
    insertDog(id, name, gender, age, weight, photo, description) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateStringField('gender', gender)
                this._validateNumberField('age', age)
                this._validateNumberField('weight', weight)
                this._validateStringField('description', description)

                return Shelter.findOne({ _id: id })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${id} id does not exist`)
                return this._saveImage(photo)
            })
            .then(imageCloudinary => {
                const dog = { name, gender, age, weight, photo: imageCloudinary, description, shelter: id }
                return Dog.create(dog)
            })
            .then(res => {
                return res.id
            })

    },

    /**
     * List dogs not adopted
     */
    listDogsNotAdopteds() {
        return Promise.resolve()
            .then(() => {
                return Dog.find({ adopted: false })
            })
            .then(dogs => {
                if (dogs) {
                    dogs.forEach(dog => {
                        dog.id = dog._id.toString()
                        delete dog._id
                    })
                }
                return dogs || []
            })
    },

    /**
     * List dogs adopted
     */
    listDogsAdopteds() {
        return Promise.resolve()
            .then(() => {
                return Dog.find({ adopted: true })
            })
            .then(dogs => {
                if (dogs) {
                    dogs.forEach(dog => {
                        dog.id = dog._id.toString()
                        delete dog._id
                    })
                }
                return dogs || []
            })
    },

    /**
     * List of dogs by shelter
     * @param {string} id The shelter´s id
     */
    listDogsByShelter(id) {
        return Promise.resolve()
            .then(() => {
                return Shelter.findOne({ _id: id })
            })
            .then(res => {
                return Dog.find({ shelter: res.id })
            })
            .then(dogs => {
                if (dogs) {
                    dogs.forEach(dog => {
                        dog.id = dog._id.toString()
                        delete dog._id
                    })
                }
                return dogs || []
            })
    },

    /**
     * Dog adopted by id
     * @param {string} id The shelter´s id
     * @param {string} dogId The dog´s id
     */
    dogAdopted(id, dogId) {
        return Promise.resolve()
            .then(() => {

                return Shelter.findOne({ _id: id })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${id} id does not exist`)
                return Dog.findOne({ _id: dogId })
                    .then(dog => {
                        if (!dog) throw new LogicError(`Dog with id ${dogId} does not exist`)

                        if (dog.shelter.toString() !== shelter.id) throw new LogicError('dog does not belong to shelter')

                        return Dog.updateOne({ _id: dogId }, { adopted: true })
                    })
            })
            .then(() => true)
    },

    /**
     * Dog not adopted by id
     * @param {string} id The shelter´s id
     * @param {string} dogId The dog´s id
     */
    dogNotAdopted(id, dogId) {
        return Promise.resolve()
            .then(() => {

                return Shelter.findOne({ _id: id })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${id} id does not exist`)
                return Dog.findOne({ _id: dogId })
                    .then(dog => {
                        if (!dog) throw new LogicError(`Dog with id ${dogId} does not exist`)

                        if (dog.shelter.toString() !== shelter.id) throw new LogicError('dog does not belong to shelter')

                        return Dog.updateOne({ _id: dogId }, { adopted: false })
                    })
            })
            .then(() => true)
    },

    /**
     * Retrieve dog by id
     * @param {string} dogId The dog´s id 
     */
    retrieveDog(dogId) {
        return Promise.resolve()
            .then(() => {
                return Dog.findOne({ _id: dogId }).lean()
            })
            .then(dog => {
                if (!dog) throw new LogicError(`Dog with id ${dogId} does not exist`)
                dog.id = dog._id.toString()
                delete dog._id
                delete dog.__v
                return dog
            })
    },

    /**
     * Retrieve shelter by id
     * @param {string} id The shelter´s id
     */
    retrieveShelter(id) {
        return Promise.resolve()
            .then(() => {
                return Shelter.findOne({ _id: id }).lean()
            })
            .then(shelter => {
                shelter.id = shelter._id.toString()
                delete shelter._id
                delete shelter.__v
                return shelter
            })
    },

    /**
     * Remove dog by id
     * @param {string} id The shelter´s id
     * @param {string} dogId The dog´s id
     */
    removeDog(id, dogId) {
        return Promise.resolve()
            .then(() => {
                return Shelter.findOne({ _id: id })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${id} id does not exist`)
                return Dog.findOne({ _id: dogId })
                    .then(dog => {
                        if (!dog) throw new LogicError(`Dog with id ${dogId} does not exist`)
                        if (dog.shelter.toString() !== shelter.id) throw new LogicError('dog does not belong to shelter')

                        return Dog.deleteOne({ _id: dogId })
                    })
            })
            .then(() => {
                return true
            })
    },

    /**
     * Update dog by id
     * @param {string} id The shelter´s id
     * @param {string} dogId The dog´s dogId
     * @param {string} newName The dog´s newName
     * @param {string} newGender The dog´s newGender
     * @param {number} newAge The dog´s newAge
     * @param {number} newWeight The dog´s newWeight
     * @param {string} newPhoto The dog´s nwePhoto
     * @param {string} newDescription The dog´s newDescription
     */
    updateDog(id, dogId, newName, newGender, newAge, newWeight, newPhoto, newDescription) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('newName', newName)
                this._validateStringField('newGender', newGender)
                this._validateNumberField('newAge', newAge)
                this._validateNumberField('newWeight', newWeight)
                this._validateStringField('newDescription', newDescription)
                return Shelter.findOne({ _id: id })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${id} id does not exist`)
            })
            .then(() => {
                return this._saveImage(newPhoto)
            })
            .then(imageCloudinary => {
                return Dog.findOne({ _id: dogId })
                    .then(dog => {
                        if (!dog) throw new LogicError(`Dog with id ${dogId} does not exist`)
                        return Dog.updateOne({
                            _id: dogId
                        }, {
                                name: newName,
                                gender: newGender,
                                age: newAge,
                                weight: newWeight,
                                photo: imageCloudinary,
                                description: newDescription
                            })
                    })
            })
            .then(() => true)
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
                const filter = {}
                filter.adopted = false
                let minAge, maxAge
                let minWeight, maxWeight
                switch (age) {
                    case "puppy":
                        minAge = 0
                        maxAge = 0.6
                        break;

                    case "young":
                        minAge = 0.6
                        maxAge = 1.5
                        break;

                    case "adult":
                        minAge = 1.5
                        maxAge = 8
                        break;

                    case "senior":
                        minAge = 8
                        break;

                    default:
                        break;
                }
                if (minAge || maxAge) {
                    const ageDog = {}

                    if (minAge) ageDog.$gte = minAge
                    if (maxAge) ageDog.$lte = maxAge

                    filter.age = ageDog
                }

                switch (weight) {
                    case "little":
                        minWeight = 0
                        maxWeight = 6
                        break;

                    case "medium":
                        minWeight = 6
                        maxWeight = 10
                        break;

                    case "big":
                        minWeight = 10
                        break;

                    default:
                        break;
                }

                if (minWeight || maxWeight) {
                    const weightDog = {}

                    if (minWeight) weightDog.$gte = minWeight
                    if (maxWeight) weightDog.$lte = maxWeight

                    filter.weight = weightDog
                }

                if (gender == 'female')
                    filter.gender = 'female'
                if (gender == 'male')
                    filter.gender = 'male'

                return Dog.find(filter, { __v: 0}, {
                    sort: {
                        age: 1
                    }
                })
            })
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }