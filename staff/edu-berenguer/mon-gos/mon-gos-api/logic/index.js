const validateEmail = require('../utils/validate-email')
const { Shelter, Dog } = require('../data/models')

const logic = {
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },
    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },
    _validateNumberField(name, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${name}`)
    },

    register(email, name, adress, phone, password, latitude, longitude) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('name', name)
                this._validateStringField('adress', adress)
                this._validateStringField('phone', phone)
                this._validateStringField('password', password)
                this._validateNumberField('latitude', latitude)
                this._validateNumberField('longitude', longitude)

                return Shelter.findOne({ email })
            })
            .then(shelter => {
                if (shelter) throw new LogicError(`shelter with ${email} email already exist`)

                return Shelter.create({ email, name, adress, phone, password, latitude, longitude })
            })
            .then(() => true)
    },
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

                return true
            })
    },

    insertDog(email, name, gender, age, weight, photo, description) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('name', name)
                this._validateStringField('gender', gender)
                this._validateNumberField('age', age)
                this._validateNumberField('weight', weight)
                this._validateStringField('description', description)

                return Shelter.findOne({ email })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${email} email does not exist`)

                const dog = { name, gender, age, weight, photo, description, shelter: shelter.id }
                return Dog.create(dog)
            })
            .then(res => {
                return res.id
            })
    },

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

    listDogsByShelter(email) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                return Shelter.findOne({ email })
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

    dogAdopted(email, dogId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return Shelter.findOne({ email })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${email} email does not exist`)
                return Dog.findOne({ _id: dogId })
                    .then(dog => {
                        if (!dog) throw new LogicError(`Dog with id ${dogId} does not exist`)

                        if (dog.shelter.toString() !== shelter.id) throw new LogicError('dog does not belong to shelter')

                        return Dog.updateOne({ _id: dogId }, { adopted: true })
                    })
            })
            .then(() => true)
    },

    retrieveDog(email, dogId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                return Shelter.findOne({ email })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${email} email does not exist`)
                return Dog.findOne({ _id: dogId })
                    .then(dog => {
                        if (!dog) throw new LogicError(`Dog with id ${dogId} does not exist`)
                        if (dog.shelter.toString() !== shelter.id) throw new LogicError('dog does not belong to shelter')
                        return dog
                    })
            })
            .then(dog => {
                return dog
            })
    },

    removeDog(email, dogId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                return Shelter.findOne({ email })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${email} email does not exist`)
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

    updateDog(email, dogId, newName, newGender, newAge, newWeight, newPhoto, newDescription) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('newName', newName)
                this._validateStringField('newGender', newGender)
                this._validateNumberField('newAge', newAge)
                this._validateNumberField('newWeight', newWeight)
                this._validateStringField('newDescription', newDescription)
                return Shelter.findOne({ email })
            })
            .then(shelter => {
                if (!shelter) throw new LogicError(`Shelter with ${email} email does not exist`)
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
                                photo: newPhoto,
                                description: newDescription
                            })
                    })
                    .then(() => true)
            })
    },

    listDogsByQuery(gender, age, weight) {
        return Promise.resolve()
            .then(() => {
                const filter = {}
                let minAge, maxAge
                let minWeight, maxWeight
                switch (age) {
                    case "cachorro":
                        minAge = 0
                        maxAge = 0.6
                        break;

                    case "joven":
                        minAge = 0.6
                        maxAge = 1.5
                        break;

                    case "adulto":
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
                    case "pequeno":
                        minWeight = 0
                        maxWeight = 6
                        break;

                    case "mediano":
                        minWeight = 6
                        maxWeight = 10
                        break;

                    case "grande":
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
                
                if(gender == 'female')
                    filter.gender = 'female'
                if(gender == 'male')
                    filter.gender = 'male'

                return Dog.find(filter, { __v: 0, _id: 0 }, {
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