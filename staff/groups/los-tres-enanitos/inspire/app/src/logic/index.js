
const logic = {

    // user

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

    get loggedIn() {
        return this._userId && this._userToken && this.userUsername
    },

    set _userLikes(userLikes) {
        sessionStorage.setItem('userLikes', JSON.stringify(userLikes))
    },

    get _userLikes() {
        return JSON.parse(sessionStorage.getItem('userLikes')) || []
    },

    _callUsersApi(path, method = 'get', body = null, useToken = false) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet || useToken) {
            config.headers = {}

            if (methodNotGet) config.headers['content-type'] = 'application/json'

            if (useToken) config.headers.authorization = 'Bearer ' + this._userToken
        }

        if (body) config.body = JSON.stringify(body)

        return fetch('https://skylabcoders.herokuapp.com/api' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error(res.error)

                return res;
            })
    },

    registerUser(username, password, fields = {}) {
        return this._callUsersApi('/user', 'post', { username, password, ...fields })
            .then(res => res.data.id)
    },

    loginUser(username, password) {
        return this._callUsersApi('/auth', 'post', { username, password })
            .then(res => {
                const data = res.data

                this._userId = data.id
                this._userToken = data.token
                this._userUsername = username
                this._userPassword = password // IDEAL encrypt it!

                return true
            })
    },

    retrieveUserById(id) {
        return this._callUsersApi(`/user/${id}`, 'get', null, true)
            .then(res => res.data)
    },

    updateUser(password, fields = {}) {
        const data = {
            username: this.userUsername,
            password,
            ...fields
        }

        return this._callUsersApi(`/user/${this._userId}`, 'put', data, true)
            .then(() => {

                if (data.hasOwnProperty('newUsername')) this._userUsername = data.newUsername

                if (data.hasOwnProperty('newPassword')) this._userPassword = data.newPassword

                return true
            })
    },

    logout() {
        sessionStorage.clear()
    },

    // TODO: to kim
    // unregisterUser(password) {}

    togglePhotoLike(photoId) {
        const likes = this._userLikes
        
        const index = likes.indexOf(photoId)

        if (index > -1) {
            likes.splice(index, 1)
        } else {
            likes.push(photoId)
        }

        return this.updateUser(this._userPassword, { likes })
            .then(() => {
                this._userLikes = likes
                return true
            })
    },

    isLiked(photoId) {
        return this._userLikes.includes(photoId)
    },

    // unsplash

    unsplashAccessKey: null,

    _callUnsplashApi(path) {
        return fetch('https://api.unsplash.com' + path, {
            headers: {
                authorization: 'Client-ID ' + this.unsplashAccessKey
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.errors) throw Error('request error ' + res.errors.join(', '));

                return res;
            });
    },

    searchPhotos(query, page = 1) {
        return this._callUnsplashApi(`/search/photos?query=${query}&page=${page}`)
            .then(res => res)
    },

    retrievePhotoById(id) {
        return this._callUnsplashApi('/photos/' + id)
            .then(res => res)
    },

    retrieveRelatedPhotosByPhotoTags(tags) {
        return this.searchPhotos(tags.join(' '))
            .then(res => res)
    },

    retrievePopularPhotos(page = 1) {
        return this._callUnsplashApi(`/photos?order_by=popular&page=${page}`)
            .then(res => res)
    }
};

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;