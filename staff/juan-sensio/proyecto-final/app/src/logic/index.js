const API_BASE_URL = 'http://localhost:8080/api/'

const logic = {

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length)
            throw new Error(`invalid ${fieldName}`)
    },

    _validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const validEmail = re.test(String(email).toLowerCase());
        if (!validEmail) throw new Error('username must be a valid email')
    },

    // user management

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

    _callApi(path, method, headers, body, expectedStatus) {
        const config = { method }
        if (headers) config.headers = headers
        if (body) config.body = body
        return fetch(API_BASE_URL + path, config)
            .then(res => {
                if (res.status === expectedStatus)
                    return res
                else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    },

    registerUser(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateEmail(username)
                this._validateStringField('password', password)
                return this._callApi('register', 'post', { 'content-type': 'application/json' }, JSON.stringify({ username, password }), 201)
            })
            .then(() => true)
    },

    unregisterUser(password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('password', password)
                const headers = {
                    'content-type': 'application/json',
                    'authorization': `bearer ${this._userToken}`
                }
                const body = JSON.stringify({ password })
                return this._callApi(`users/${this._userId}`, 'delete', headers, body, 200)
                    .then(() => {
                        this.logout()
                        return true
                    })
            })
    },

    loginUser(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('username', username)
                this._validateEmail(username)
                this._validateStringField('password', password)
                const headers = { 'content-type': 'application/json' }
                const body = JSON.stringify({ username, password })
                return this._callApi('auth', 'post', headers, body, 200)
                    .then(res => res.json())
                    .then(res => {
                        this._userId = res.id
                        this._userToken = res.token
                        //this._username = username
                        return true
                        //return this.retrieveData()
                    })
            })
    },

    loggedIn() {
        return !!(this._userId && this._userToken)
    },

    logout() {
        this._userId = null
        this._userToken = null
        sessionStorage.clear()
    },

    updateUsername(password, newUsername) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('password', password)
                this._validateStringField('new username', newUsername)
                this._validateEmail(newUsername)
                const headers = {
                    'content-type': 'application/json',
                    'authorization': `bearer ${this._userToken}`
                }
                const body = JSON.stringify({ password, newUsername })
                return this._callApi(`users/${this._userId}/updateUsername`, 'put', headers, body, 200)
                    .then(() => this.loginUser(newUsername, password))
            })
    },

    updatePassword(password, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)
                if (password === newPassword) throw new Error('passwords must be different')
                const headers = {
                    'content-type': 'application/json',
                    'authorization': `bearer ${this._userToken}`
                }
                const body = JSON.stringify({ password, newPassword })
                return this._callApi(`users/${this._userId}/updatePassword`, 'put', headers, body, 200)
                    .then(() => true)
            })
    },

    // video management

    saveVideo(video) {
        const headers = {
            'authorization': `bearer ${this._userToken}`
        }
        const formData = new FormData()
        formData.append('file', video)
        const body = formData
        return this._callApi(`users/${this._userId}/videos`, 'put', headers, body, 201)
            .then(() => true)
    },

    retrieveVideos() {
        const headers = {
            'authorization': `bearer ${this._userToken}`
        }
        return this._callApi(`users/${this._userId}/videos`, 'get', headers, undefined, 200)
            .then(res => res.json())
            .then(({ videos }) => {
                return videos.map(video => {
                    return {
                        url: `${API_BASE_URL}users/${this._userId}/videos/${video}?token=${this._userToken}`,
                        id: video
                    }
                })
            })
    },

    deleteVideo(id) {
        const headers = {
            'authorization': `bearer ${this._userToken}`
        }
        return this._callApi(`users/${this._userId}/videos/${id}`, 'delete', headers, undefined, 200)
            .then(() => true)
    },

    // dataset management

    buildDataset(id) {
        const headers = {
            'content-type': 'application/json',
            'authorization': `bearer ${this._userToken}`
        }
        const body = JSON.stringify({videoId: id})
        return this._callApi(`users/${this._userId}/dataset`, 'put', headers, body, 201)
            .then(() => true)
    },

    retrieveDatasets() {
        const headers = {
            'authorization': `bearer ${this._userToken}`
        }
        return this._callApi(`users/${this._userId}/datasets`, 'get', headers, undefined, 200)
            .then(res => res.json())
            .then(({ datasets }) => {
                return datasets.map(dataset => {
                    return {
                        url: `${API_BASE_URL}users/${this._userId}/datasets/${dataset}?token=${this._userToken}`,
                        id: dataset
                    }
                })
            })
    },

    deleteDataset(id) {
        const headers = {
            'authorization': `bearer ${this._userToken}`
        }
        return this._callApi(`users/${this._userId}/datasets/${id}`, 'delete', headers, undefined, 200)
            .then(() => true)
    },
}

if (typeof module !== 'undefined')
    module.exports = logic;
