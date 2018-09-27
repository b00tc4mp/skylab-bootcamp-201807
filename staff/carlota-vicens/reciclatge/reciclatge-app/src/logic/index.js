const axios = require('axios')

/**Bussines logic about Reciclatge-app */
const logic = {

    url: 'https://reciclatge-api.herokuapp.com/api',
    // url: 'http://localhost:8080/api',

    // urlvision: 'http://localhost:5000/api',
    urlvision: 'https://reciclatge-vision-api.herokuapp.com/api',


    /** This is a setter to store the user id in sessionStorage
    * @param {string} userId - The user id
    */
    set _userId(userId) {
        sessionStorage.setItem('userId', userId)
    },

    /** This is a getter to retrieve the userId from sessionStorage 
    * @return {string} The user id 
    */
    get _userId() {
        return sessionStorage.getItem('userId')
    },

    /** This is a setter to store the user email in sessionStorage
     * @param {string} userEmail - The user email
     */
    set _userEmail(userEmail) {
        sessionStorage.setItem('userEmail', userEmail)
    },

    /** This is a getter to retrive the userEmail from sessionStorage
     * @return {string} The user email
     */
    get _userEmail() {
        return sessionStorage.getItem('userEmail')
    },

    /** This is a setter to store the user password in sessionStorage
     * @param userPassword - The user password
     */
    set _userPassword(userPassword) {
        sessionStorage.setItem('userPassword', userPassword)
    },

    /** This is a getter to retrive the userPassword from sesionStorage
     * @return {string} The user password
     */
    get _userPassword() {
        return sessionStorage.getItem('userPassword')
    },

    /** This is a function to validate the stringield name
     * @param {string} fieldName - The name of the field
     * @param {string} fieldValue - The value of the field
     */
    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },


    //USER'S

    /** This is the function to register a user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @return {function} - Call the user api
     */
    register(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('email', email)
                this._validateStringField('password', password)
                return axios.post(`${this.url}/register`, { email, password })
                    .then(() => true)
                    .catch(err => err)
            })
    },

    /**This is the function to login a user
     * @param {string} email - The email of the user
     * @param {string} password - The password of the user
     * @return {function} - Call the user api
     */
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
                    .catch(err => {
                        throw new Error(err.response.data.message)
                    })
            })
    },

    /** This is the function to update the password from a user
     * @param {string} password - The old password
     * @param {stirng} newPassword - The new password
     * @return {function} - Call the user api
     */
    update(password, newPassword) {
        const data = {
            email: this._userEmail,
            password
        }
        if (newPassword) data.newPassword = newPassword
        return axios.patch(`${this.url}/update/${this._userEmail}`, { password, newPassword })
            .then(data => {
                if (password === this._userPassword)
                    this._userPassword = newPassword
                return true
            })
    },

    /** This is the function to upload the picture to Google Vision Api
     * @param {string} data - The picture in base64
     * @return {function} - Call the Google Api
     */
    upload(data) {
        return axios.post(`${this.urlvision}/upload`, { base64: data })
            .then(res => res.data)
        //  .then(`${this.urlvision}/delete`, '../fotos')
    },

    /** This is the function to logout a user */
    logout() {
        this._userEmail = null
        this._userId = null
        sessionStorage.clear()
    },

    /** This is the function to loggedIn a user
     * @return {boolean} - If the user is loggedIn return true, if not return false
     */
    get loggedIn() {
        return this._userId && this._userEmail
    },

    /** This is the function to delete a user
     * @param {string} password - The password from the user
     * @return {function} - Call the users api 
     */
    delete(password) {
        const data = { email: this._userEmail, password }
        return axios.delete(`${this.url}/delete`, { data })
            .then(() => true)
    }
}


module.exports = logic
