const axios = require('axios')

const logic = {
    
    url: 'http://localhost:8080/api',
    
    set _userId(userId) {
        sessionStorage.setItem('userId', userId)
    },

    get _userId() {
        return sessionStorage.getItem('userId')
    },

    set _userToken(userToken) {
        sessionStorage.setItem('userToken', userToken)
    },

    get _userToken() {
        return sessionStorage.getItem('userToken')
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
                    .catch(err => console.error)
            })
    },

    login(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateStringField('password', password)
                return axios.post(`${this.url}/login`, { email, password })
                    .then(data => {
                        this._userEmail(data.email)
                        this._userToken(data.token)
                        this._userId(data.id)
                    })
                    .catch(err => console.error)
            })
    },

    update(email, password, newPassword) {
        // const data = {
        //     email: this._userEmail,
        //     password
        // }

        // if (newPassword)
        //     data.newPassword = newPassword

        return axios.patch(`${this.url}/update/${email}`, { email, password, newPassword })
            .then(data => {
                if (data.email === this._userEmail)
                if (data.password === this._userPassword)
                    this._userPassword = newPassword
                // if (email)
                //     this._userEmail(email)
                // if (password === this._userPassword)
                // if (newPassword)
                //     this._userPassword(newPassword)

                // return true
            })
    },

    logout() {
        this._userEmail = null
        sessionStorage.clear()
    },
 
    get loggedIn() {
        return this._userId && this._userToken && this._userEmail
    }

}

module.exports = logic
