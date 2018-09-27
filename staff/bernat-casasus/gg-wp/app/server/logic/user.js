const validateEmail = require('../utils/validate-email')
const validateId = require('../helpers/validate-id')
const User  = require('../data/models/user')

const logic = {
    /**
     *Validate String Field
     *
     * Check if the value is a string.
     * 
     * @param {string} name tag name
     * @param {any} value value that will be checked
     */
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },
    /**
     *Validate id
     *
     * Check that is a valid id
     * 
     * @param {any} id value that will be checked
     */
    _validateId(id){
        if(!validateId(id)) throw new LogicError(`invalid id`)
    },
    /**
     *Validate email
     *
     * Check that is a valid email
     * 
     * @param {string} email
     */
    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    /**
     * Register user
     * 
     * Creates a user to de database.
     * 
     * @param {string} email user email
     * @param {string} password user password
     * @returns {Promise<boolean>}
     */
    register(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                if(password.length < 6) throw new LogicError(`the password must have at least 6 characters`)
                
                return User.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`user with ${email} email already exist`)

                return User.create({ email, password }) 
            })
            .then(() => true)
            
    },

    /**
     *Authenticate user
     *
     * Checks if the credentials are correct.
     * 
     * @param {string} email user email
     * @param {string} password user password
     * @returns {Promise<string>}
     */
    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return email
            })
    },

    /**
     *Update Password
     *
     * Update the user password.
     * 
     * @param {string} email user email
     * @param {string} password user password
     * @param {string} newPassword user new password
     * @returns {Promise<boolean>}
     */
    updatePassword(email, password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                if (password === newPassword) throw new LogicError('new password must be different to old password')

                user.password = newPassword

                return user.save()
            })
            .then(() => true)
    },

    /**
     *Unregister user
     *
     * Deletes a user from the database.
     * 
     * @param {string} email user email
     * @param {string} password user password
     * @returns {Promise<boolean>}
     */
    unregisterUser(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return User.deleteOne({ _id: user._id })
            })
            .then(() => true)
    },

    /**
     *Add Player
     *
     * Adds a player to the user [players] array.
     * 
     * @param {string} email user email
     * @param {string} id player id
     * @returns {Promise<boolean>}
     */
    addPlayer(email, id) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateId(id)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                const index = user.players.indexOf(id)
                if(index > -1) throw new LogicError(`The summoner is already in your collection!`)

                user.players.push(id)
                return user.save()
            })
            .then(() => true)
    },

    /**
     *List Players
     *
     * List the players that the user has in the collection.
     * 
     * @param {string} email user email
     * @returns {Promise<Array>}
     */
    listPlayers(email) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return user.players
            })
    },

    /**
     *Remove Player
     *
     * Removes a player from the user collection
     * 
     * @param {string} email user email
     * @param {string} id player id
     * @returns {Promise<Array>}
     */
    removePlayer(email, id){
        return Promise.resolve()
        .then(() => {
            this._validateEmail(email)
            this._validateId(id)

            return User.findOne({ email })
        })
        .then(user => {
            if (!user) throw new LogicError(`user with ${email} email does not exist`)

            const index = user.players.indexOf(id)
            if(index === -1) throw new LogicError(`player does not exist`)
            
            user.players.splice(index,1)

            return user.save()
        })
        .then((res) => res.players)
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = { logic, LogicError }