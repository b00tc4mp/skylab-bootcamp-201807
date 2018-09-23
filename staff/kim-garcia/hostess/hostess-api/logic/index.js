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

    /**
     * Comandos perfil usuario
     */

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

                return hostess._doc._id
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
                if (!business) throw new LogicError(`There is no acount with this email: ${email}`)

                if (business.password !== password) throw new LogicError('Wrong password')

                return business._doc._id
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
            .then(() => true)
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

    retrieveHostess(id) {
        return Promise.resolve()
            .then(() => Hostess.findById({ _id: id }))
            .then(hostess => {
                if (!hostess) throw new LogicError('can not find the hostess')
                return hostess
            })
    },

    retrieveBusiness(id) {
        return Promise.resolve()
            .then(() => Business.findById({ _id: id }))
            .then(business => {
                if (!business) throw new LogicError('can not find the business')
                return business
            })
    },

    editHostessProfile(id, password, name, birth, origin, phone, myself, gender, languages, jobType, photo) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateStringField('birthdate', birth)
                this._validateStringField('photo', photo)
                this._validateStringField('place of birth', origin)
                this._validateStringField('about myself', myself)
                this._validateStringField('gender', gender)
                this._validateStringField('phone number', phone)
                this._validateStringField('job type', jobType)
                this._validateStringField('description of myself', myself)

                if (!(languages instanceof Array)) throw new LogicError('invalid array of languages')

                return Hostess.findById({ _id: id })
            })
            .then(hostess => {
                if (!hostess) throw new LogicError(`wrong credentials`)
                if (hostess.password !== password) throw new LogicError(`use the correct password`)

                return Hostess.updateOne({ _id: id }, { $set: { name, birth, origin, gender, phone, languages, jobType, myself, photo } })
            })
            .then(() => true)
    },

    editBusinessProfile(id, password, name, web, boss, phone, philosophy, businessCard) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('password', password)
                this._validateStringField('name', name)
                this._validateStringField('contact name', boss)
                this._validateStringField('contact phone', phone)
                this._validateStringField('company philosophy', philosophy)
                this._validateStringField('business card', businessCard)

                return Business.findById({ _id: id })
            })
            .then(business => {
                if (!business) throw new LogicError(`wrong credentials`)
                if (business.password !== password) throw new LogicError(`use the correct password`)

                return Business.updateOne({ _id: id }, { $set: { name, web, boss, phone, philosophy, businessCard } })

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



    /**
     * Comandos hostess
     */

  
    newEvent(idB, location, date, hours, title, goal) {
        let idE = ''

        return Promise.resolve()
            .then(() => {
                if (!date) throw new LogicError('Missing a date for this event')
                if (!location) throw new LogicError('Missing the location of the event')
                if (!title) throw new LogicError('Missing a title of the event')
                if (!goal) throw new LogicError('Missing a goal of the event')

                const event = { business: idB, location, date, hours, title, goal }

                return Events.create( event )
            })
            .then(event => {
                idE = event.id
                return Business.findById({ _id: idB })
            })
            .then(business => {
                business._doc.events.push(idE)
                return business.save()
            })
            .then(() => true)
    },

    searchWorkers(gender, languages, jobType) {
        return Promise.resolve()
            .then(() => {
                let criteria = {}

                if (gender) {
                    this._validateStringField('gender', gender)
                    criteria.gender = gender
                }

                if (jobType) {
                    this._validateStringField('job type', jobType)
                    criteria.jobType = jobType
                }

                if (languages) {
                    if (!(languages instanceof Array)) throw new LogicError('invalid languages')
                    criteria.languages = { $all: languages }
                }

                // if (!Object.keys(criteria).length) throw new LogicError('invalid search')

                return Hostess.find(criteria).lean()
                    .then(hostesses => {
                        if (this.hostesses) {
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




    /**
     * CONTINU HERE
     */


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

