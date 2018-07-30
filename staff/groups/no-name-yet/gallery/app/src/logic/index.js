const logic = {

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

    _callUsersApi(path, method = 'get', body, useToken) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet || useToken) {
            config.headers = {}

            if (methodNotGet)
                config.headers['content-type'] = 'application/json'

            if (useToken)
                config.headers.authorization = 'Bearer ' + this._userToken
        }

        if (body)
            config.body = JSON.stringify(body)

        return fetch('https://skylabcoders.herokuapp.com/api' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO')
                    throw Error(res.error)

                return res;
            })
    },

    // user's

    registerUser(username, password) {
        return this._callUsersApi('/user', 'post', { username, password })
            .then(res => res.data.id)
    },

    loginUser(username, password) {
        return this._callUsersApi('/auth', 'post', { username, password })
            .then(({ data: { id, token } }) => {
                this._userId = id
                this._userToken = token
                this._userUsername = username
                this._userPassword = password // IDEAL encrypt it!

                // return true
                return this.retrieveImages()
            })
            .then( images => {
                this._userImages = images || []

                return true
            })
    },

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

        if (newUsername)
            data.newUsername = newUsername

        if (newPassword)
            data.newPassword = newPassword

        return this._callUsersApi(`/user/${this._userId}`, 'put', data, true)
            .then(() => {
                if (newUsername)
                    this._userUsername = newUsername
                if (newPassword)
                    this._userPassword = newPassword

                return true
            })
    },

    unregisterUser(password) {
        return this._callUsersApi(`/user/${this._userId}`, 'delete', {
            username: this.userUsername,
            password
        }, true)
            .then(() => true)
    },

    // cloudinary api

    set _userImages(userImages) {
        sessionStorage.setItem('userImages', JSON.stringify(userImages))
    },

    get _userImages() {
        return JSON.parse(sessionStorage.getItem('userImages')) || []
    },


    API_KEY: '311749718863248',

    API_SECRET: 'C_067ivTpTUyXOLV5kt1D1MPdfQ',

    CLOUD_NAME: 'galleryapp',

    PRESET: 'zbhkr9id',

    _callCloudinaryApi(path, method, img = undefined) {
        const myUrl = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}${path}`

        if (method === 'put') {
            let formData = new FormData()
            formData.append('file', img)
            formData.append('upload_preset', this.PRESET)
            formData.append('folder', this.userUsername)
            return fetch(`https://skylabcoders.herokuapp.com/proxy?url=${myUrl}`, {
                method,
                body: formData
            })
                .then(() => true)
                .catch(err => err.message)

        } else if (method === 'get') {
            const myUrl = `https://${this.API_KEY}:${this.API_SECRET}@api.cloudinary.com/v1_1/${this.CLOUD_NAME}${path}`
            return fetch(`https://skylabcoders.herokuapp.com/proxy?url=${myUrl}`, {
                method
            })
                .then(res => res.json())
                .then(res => res.resources)
                .then(res => res.map( item => item.url))
                .catch(err => console.error(err.message))
        }

    },

    addImage(img) {
        return this._callCloudinaryApi('/upload', 'post', img)
    },

    retrieveImages() {
        return this._callCloudinaryApi(`/resources/image/upload/?prefix=${this.userUsername}`, 'get')
    }

}

if (typeof module !== 'undefined') module.exports = logic;
