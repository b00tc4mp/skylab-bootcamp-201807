const axios = require('axios')

const logic = {

    url: 'http://localhost:8080/api',

    urlvision: 'http://localhost:5000/api',

    set _userId(userId) {
        sessionStorage.setItem('userId', userId)
    },

    get _userId() {
        return sessionStorage.getItem('userId')
    },

    set _userEmail(userEmail) {
        sessionStorage.setItem('userEmail', userEmail)
    },

    get _userEmail() {
        return sessionStorage.getItem('userEmail')
    },

    set _userPassword(userPassword) {
        sessionStorage.setItem('userPassword', userPassword)
    },

    get _userPassword() {
        return sessionStorage.getItem('userPassword')
    },

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    register(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateStringField('password', password)
                return axios.post(`${this.url}/register`, { email, password })
                    .then(() => true)
                    .catch(err => console.error(err))
            })
    },

    login(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateStringField('password', password)
                return axios.post(`${this.url}/login`, { email, password })
                    .then(({ data }) => {
                        this._userEmail = email
                        this._userId = data.user
                    })
                    .catch(err => console.error(err))
            })
    },

    update(email, password, newPassword) {
        const data = {
            email: this._userEmail,
            password
        }
        if (newPassword) data.newPassword = newPassword

        return axios.patch(`${this.url}/update/${email}`, { password, newPassword })
            .then(data => {
                if (password === this._userPassword)
                    this._userPassword = newPassword

                return true
            })
    },

    upload(data) {
        return axios.post(`${this.urlvision}/upload`, { base64: data })
            .then(res => res.data)
            .then(`${this.urlvision}/delete`, '../fotos')
    },

    logout() {
        this._userEmail = null
        this._userId = null
        sessionStorage.clear()
    },

    get loggedIn() {
        return this._userId && this._userEmail
    },

    delete(email, password) {
        return axios.delete(`${this.url}/delete`, {password})
        .then(() => true)
        .catch( err => console.error(err) )

    }



}

module.exports = logic
