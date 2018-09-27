const validateEmail = require('../utils/validate-email')
const { Hostess, Business, Events } = require('../data/models')

const logic = {

    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    _validateNumberField(num, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${num}`)
    },

    registerHostess(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return Hostess.findOne({ email })
            })
            .then(hostess => {
                if (hostess) throw new LogicError(`We allready have and acount with this email ${email}`)

                return Hostess.create({ email, password })
            })
            .then(() => true)
    },

    registerBusiness(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return Business.findOne({ email })
            })
            .then(business => {
                if (business) throw new LogicError(`We allready have and acount with this email ${email}`)

                return Business.create({ email, password })
            })
            .then(() => true)
    },

    authenticateHostess(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return Hostess.findOne({ email })
            })
            .then(hostess => {
                if (!hostess) throw new LogicError(`Does not exist a hostess with this email: ${email}`)

                if (hostess.password !== password) throw new LogicError('Wrong password')

                return true
            })
    },

    authenticateBusiness(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return Business.findOne({ email })
            })
            .then(business => {
                if (!business) throw new LogicError(`Does not exist a company with this email: ${email}`)

                if (business.password !== password) throw new LogicError('Wrong password')

                return true
            })
    },

    updatePasswordHostess(email, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)
                return Hostess.findOne({ email })
            })
            .then(hostess => {
                if (!hostess) throw new LogicError(`The email ${email} does not correspond to any of our hostess`)

                if (hostess.password !== password) throw new LogicError('Wrong password')

                if (hostess.password === newPassword) throw new LogicError('Same old password, be more creative')

                hostess.password = newPassword

                return hostess.save()
            })
            .then(() => {
                return true
            })
    },

    updatePasswordBusiness(email, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return Business.findOne({ email })

            })
            .then(business => {

                if (!business) throw new LogicError(`The email ${email} does not correspond to any of our business`)

                if (business.password !== password) throw new LogicError('Wrong password')

                if (business.password === newPassword) throw new LogicError('Same old password, be more creative')

                business.password = newPassword

                return business.save()
            })
            .then(() => true)
    },

    retrieveHostess(email) {
        return Promise.resolve()
        .then(() => {
            this._validateEmail(email)
            
            return Hostess.findOne({ email })
        })
        .then(hostess => {
            if (!hostess) throw new LogicError('can not find the hostess')
            return hostess
        })
    },

    retrieveBusiness(email) {
        return Promise.resolve()
        .then(() => {
            this._validateEmail(email)

            return Business.findOne({ email })
        })
        .then(business => {
            if(!business) throw new LogicError('can not find the business')
            return business
        })
    },

    editHostessProfile(email, name, birth, origin, gender, phone, languages, jobType, height, myself, skills, photo) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('name', name)
                this._validateStringField('place of birth', origin)
                this._validateStringField('gender', gender)
                this._validateStringField('phone number', phone)
                this._validateStringField('job type', jobType)
                this._validateNumberField('height', height)
                this._validateStringField('description of myself', myself)

                if (!(languages instanceof Array)) throw new LogicError('invalid languages')
                if (!(skills instanceof Array)) throw new LogicError('invalid skills')

                return Hostess.findOne({ email })
            })
            .then(hostess => {
                if (!hostess) throw new LogicError(`hostess with ${email} email does not exist`)

                return Hostess.updateOne({ email }, { $set: { name, birth, origin, gender, phone, languages, jobType, height, myself, skills, photo } })

            })
            .then(() => true)
    },

    editBusinessProfile(email, name, web, boss, phone, philo) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('name', name)
                this._validateStringField('contact name', boss)
                this._validateStringField('contact phone', phone)
                this._validateStringField('company philosophy', philo)

                return Business.findOne({ email })
            })
            .then(business => {
                if (!business) throw new LogicError(`business with ${email} email does not exist`)

                return Business.updateOne({ email }, { $set: { name, web, boss, phone, philo } })

            })
            .then(() => true)
    },

    unregisterHostess(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return Hostess.findOne({ email })
            })
            .then(hostess => {
                if (!hostess) throw new LogicError(`The email ${email} does not correspond to any of our hostess`)

                if (hostess.password !== password) throw new LogicError(`Wrond password`)

                return Hostess.deleteOne({ _id: hostess._id })
            })
            .then(() => true)

    },

    unregisterBusiness(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return Business.findOne({ email })
            })
            .then(business => {
                if (!business) throw new LogicError(`The email ${email} does not correspond to any of our business`)

                if (business.password !== password) throw new LogicError(`Wrond password`)

                return Business.deleteOne({ _id: business._id })
            })
            .then(() => true)

    },

    searchWorkers(email, gender, jobType, height, languages) {
        return Promise.resolve()
            .then(() => {
                debugger
                let criteria = {}

                this._validateEmail(email)

                if (gender) {
                    this._validateStringField('gender', gender)
                    criteria.gender = gender
                }

                if (jobType) {
                    this._validateStringField('job type', jobType)
                    criteria.jobType = jobType
                }

                if (height) {
                    this._validateNumberField('height', height)
                    criteria.height = { $gte: height }
                }

                if (languages) {
                    if (!(languages instanceof Array)) throw new LogicError('invalid languages')
                    criteria.languages = { $all: languages }
                }

                if (!Object.keys(criteria).length) throw new LogicError('invalid search')

                return Hostess.find(criteria).lean()
                    .then(hostesses => {
                        debugger
                        if (this.hostesses) {
                            debugger
                            hostesses.forEach(hostess => {
                                hostess.id = hostess.id.toString()
                                delete hostess._id
                                delete hostess._v
                            })
                        }
                        return hostesses
                    })
            })
    },


    addFavs(emailHost, emailBus) {

        let idHost

        return Promise.resolve()
            .then(() => Hostess.findOne({ email: emailHost }))
            .then(host => {
                idHost = host.id
                return Business.findOne({ email: emailBus })
            })
            .then(business => {
                business._doc.favs.push(idHost)
                return business.save()
            })
            .then(() => true)

    },

    addHostess(emailBus, emailHost) {

        let idHost

        return Promise.resolve()
            .then(() => {
                if (!emailBus) throw new LogicError('Missing the business in charge of this event')
                if (!emailHost) throw new LogicError('You should select at least one hostess for your event')

                return Hostess.findOne({ email: emailHost })
            })
            .then(host => {
                idHost = host.id
                return Business.findOne({ email: emailBus })
            })
            .then(business => {
                business._doc.selected.map(selectedId => {
                    if (selectedId === idHost) throw new LogicError('Hostess already selected')
                })

                business._doc.selected.push(idHost)
                return business.save()
            })
            .then(() => true)
    },

    createEvent(email, date, location, title, description) {

        return Promise.resolve()
            .then(() => {
                if (!email) throw new LogicError('Missing the business in charge of this event')
                if (!date) throw new LogicError('Missing a date for this event')
                if (!location) throw new LogicError('Missing the location of the event')
                if (!title) throw new LogicError('Missing a title of the event')
                if (!description) throw new LogicError('Missing a description of the event')

                return Business.findOne({ email })
            })
            .then((creator) => {

                const event = {
                    business: creator.id,
                    hostesses: creator._doc.selected,
                    date,
                    location,
                    title,
                    description
                }

                Events.create(event)
            })
            .then(() => {
                return Business.findOne({ email })
            })
            .then(business => {
                business.selected = []

                return business.save()
            })
            .then(() => {
                debugger
                return Events.findOne({ title })
            })
            .then(event => {
                const id = event._doc._id.toString()
                return id
            })
    },

    retrieveEventById(id) {
        return Promise.resolve()
            .then(() => {
                return Events.findById(id).populate('business').populate('hostesses')
            })
            .then(event => {
                if (!event) throw new LogicError('can not find the event')
                return event
            })
    },


}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }

