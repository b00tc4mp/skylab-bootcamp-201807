const logic = {
    _data: null,
    set _userId(userId) {
        sessionStorage.setItem('userId', userId)
    },
    get _userId() {
        return sessionStorage.getItem('userId')
    },
    set _username(username) {
        sessionStorage.setItem('username', username)
    },
    get _username() {
        return sessionStorage.getItem('username')
    },
    set _userToken(userToken) {
        sessionStorage.setItem('userToken', userToken)
    },
    get _userToken() {
        return sessionStorage.getItem('userToken')
    },
    set _userData(data) {
        this._data = data
    },
    get _userData() {
        return this._data
    },

    _callApi(path, method, headers, body, expectedStatus) {
        const config = { method }
        if (headers) config.headers = headers
        if (body) config.body = body
        return fetch('http://localhost:8080/api/' + path, config)
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

    _validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const validEmail = re.test(String(email).toLowerCase());
        if (!validEmail) throw new Error('username must be a valid email')
    },

    registerUser(username, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(username)
                return this._callApi('register', 'post', { 'content-type': 'application/json' }, JSON.stringify({ username, password }), 201)
            })
            .then(() => true)
    },

    unregisterUser(password) {
        const headers = {
            'content-type': 'application/json',
            'authorization': `bearer ${this._userToken}`
        }
        return this._callApi(`users/${this._userId}`, 'delete', headers, JSON.stringify({ password }), 200)
            .then(() => {
                this.logout()
                return true
            })
    },

    loginUser(username, password) {
        return this._callApi('auth', 'post', { 'content-type': 'application/json' }, JSON.stringify({ username, password }), 200)
            .then(res => res.json())
            .then(res => {
                this._userId = res.id
                this._userToken = res.token
                this._username = username
                return this.retrieveData()
            })
    },

    loggedIn() {
        return !!(this._userId && this._userToken)
    },

    logout() {
        this._userId = null
        this._userToken = null
        this._userData = null
        sessionStorage.clear()
    },

    saveData(data) {
        const headers = {
            'content-type': 'application/json',
            'authorization': `bearer ${this._userToken}`
        }
        return this._callApi(`users/${this._userId}`, 'post', headers, JSON.stringify({ data }), 201)
            .then(() => true)
    },

    retrieveData() {
        const headers = {
            'content-type': 'application/json',
            'authorization': `bearer ${this._userToken}`
        }
        return this._callApi(`users/${this._userId}`, 'get', headers, undefined, 200)
            .then(res => res.json())
            .then(({ data }) => {
                this._userData = data

                if (!data.videos)
                    this._userData.videos = []

                return true
            })
    },

    addVideo(id, url) {
        let videos = this._userData.videos
        videos.push({ id, url })
        return this.saveData(this._userData)
    },

    /*
        deleteVideo(url) {
            let index = -1
            this._userData.videos.forEach((_video, _index) => {
                if (_video.url === url)
                    index = _index
            })
            if (index > -1)
                this._userData.videos.splice(index, 1)
            return this.saveData(this._userData)
        },
    */

    // CLOUDINARY
    API_KEY: '311749718863248',
    API_SECRET: 'C_067ivTpTUyXOLV5kt1D1MPdfQ',
    CLOUD_NAME: 'galleryapp',
    PRESET: 'wx6qdpjo',

    _callCloudinaryApi(path, method, video = undefined) {
        const myUrl = `https://${this.API_KEY}:${this.API_SECRET}@api.cloudinary.com/v1_1/${this.CLOUD_NAME}${path}`
        const config = {
            method
        }
        if (method === 'post') {
            let formData = new FormData()
            formData.append('file', video)
            formData.append('upload_preset', this.PRESET)
            formData.append('folder', this._username)
            config.body = formData
        }
        return fetch(`https://skylabcoders.herokuapp.com/proxy?url=${myUrl}`, config)
            .then(res => res.json())
            .catch(err => err)
    },

    saveVideo(video) {
        return this._callCloudinaryApi('/upload', 'post', video)
            .then(({ public_id, url }) => this.addVideo(public_id, url))
            .then(() => true)
    },
/*
    retrieveVideos() {
        return this._callCloudinaryApi(`/resources/video/upload/?prefix=${this.userUsername}`, 'get')
            .then(res => res.resources)
            .then(res => res.map(item => ({ url: item.url, id: item.public_id })))
            .then(res => {
                this._userImages = res
                return true
            })
    },

    deleteAll() {
        return this._callCloudinaryApi(`/resources/videos/upload/?prefix=${this.username}`, 'delete')
            .then(() => {
                this._userData.videos = []
                return true
            })
    },

    deleteFolder() {
        return this._callCloudinaryApi(`/folders/${this.username}`, 'delete')
            .then(res => {
                this.userImages = res
                return true
            })
    },

    deleteVideo(id) {
        return this._callCloudinaryApi(`/resources/video/upload/?public_ids=${id}`, 'delete')
            .then(() => {
                let images = this._userImages
                const ids = images.map(({ id }) => id)
                let index = ids.indexOf(id)
                if (index === -1) throw new Error('image not found in deletion')
                images.splice(index, 1)
                this._userImages = images
                return true
            })
    },*/
}

if (typeof module !== 'undefined')
    module.exports = logic;
