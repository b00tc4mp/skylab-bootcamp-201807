const axios = require('axios')

const logic = {
    set _userId(userId) {
        sessionStorage.setItem('userId', userId)
    },

    get _userId() {
        return sessionStorage.getItem('userId')
    },

    set _userUsername(userUsername) {
        sessionStorage.setItem('userUsername', userUsername)
    },

    get userUsername() {
        return sessionStorage.getItem('userUsername')
    },

    set _userPassword(userPassword) {
        sessionStorage.setItem('userPassword', userPassword)
    },

    get _userPassword() {
        return sessionStorage.getItem('userPassword')
    },

  
    registerUser(username, password) {
        const param = {
            "username" : username,
            "password" : password
          } 

       return axios({
            method: 'post',
            url: 'http://localhost:8080/register',
            data: param
         })
          .then(res => {
              
              return res
          })
          .catch(error => {
            
            return error
          })
            
    },

    loginUser(username, password) {
            const param = {
                "username" : username,
                "password" : password
            }
            return axios({
                method: 'post',
                url: 'http://localhost:8080/authenticate',
                data: param
            })
            .then(res => {
                return res
            })
            .catch(error => {
                 return error
            })
    },
    /*
    loginUser(username, password) {
        return this._callUsersApi('/auth', 'post', { username, password })
            .then(({ data: { id, token } }) => {
                this._userId = id
                this._userToken = token
                this._userUsername = username
                this._userPassword = password // IDEAL encrypt it!

                // return true
                return this._callUsersApi(`/user/${this._userId}`, 'get', undefined, true)
            })
            .then(({ data }) => {
                this._userFavorites = data.favorites || []

                return true
            })
    },
    */
    logout() {
        this._userId = null
        this._userToken = null
        this._userUsername = null

        sessionStorage.clear()
    },

    get loggedIn() {
        return this._userId && this._userToken && this.userUsername
    },

    updateUser(password, newUsername, newPassword) {
        const data = {
            username: this.userUsername,
            password
        }

        if (newUsername) data.newUsername = newUsername

        if (newPassword) data.newPassword = newPassword

        return this._callUsersApi(`/user/${this._userId}`, 'put', data, true)
            .then(() => {
                if (newUsername) this._userUsername = newUsername

                return true
            })
    }

};

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;