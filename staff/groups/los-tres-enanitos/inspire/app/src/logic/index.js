
const logic = {

    // user

    set _userId(userId) {
        sessionStorage.setItem('userId', userId)
    },

    get _userId() {
        return sessionStorage.getItem('userId')
    },

    get userId() {
        return this._userId
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

    get userPassword() {
        return this._userPassword
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

    get userLikes() {
        return this._userLikes
    },

    set _userCollections(userCollections) {
        sessionStorage.setItem('userCollections', JSON.stringify(userCollections))
    },

    get _userCollections() {
        return JSON.parse(sessionStorage.getItem('userCollections')) || []
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
                this._userPassword = password // TODO: IDEAL encrypt it!

                return logic.retrieveUserById(this._userId)
            })
            .then(data => {
                this._userLikes = data.likes || []
                this._userCollections = data.collections || []

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

    unregisterUser(password) {
        return this._callUsersApi(`/user/${this._userId}`, 'delete', {
            username: this.userUsername,
            password
        }, true)
            .then(() => {
                this.logout()
                return true
            })
    },

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
    
    _generateRandomId() {
        let text = ''
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (let i = 0; i < 11; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }

        return text
    },

    _generateNewCollectionId() {
        let found, newId
        const collections = this._userCollections
        do {
            found = false
            newId = this._generateRandomId()

            for (let i = 0; i < collections.length; i++) {
                const id = collections[i].id;
                if (id === newId) {
                    found = true
                    break
                }
            }
        } while(found === true)

        return newId
    },

    createNewCollection(name, description = '') {

        const collections = this._userCollections

        const collection = {
            id: this._generateNewCollectionId(),
            name,
            description,
            photos: []
        }

        collections.push(collection)

        return this.updateUser(this._userPassword, { collections })
            .then(() => {
                this._userCollections = collections
                return collection.id
            })
    },

    editCollection(collectionId, fields = {}) {
        
        const collections = this._userCollections

        for (let i = 0; i < collections.length; i++) {
            let collection = collections[i]
            if (collection.id === collectionId) {
                if (fields.hasOwnProperty('name')) {
                    collections[i].name = fields.name
                }
                if (fields.hasOwnProperty('description')) {
                    collections[i].description = fields.description
                }
            }
        }

        return this.updateUser(this._userPassword, { collections })
            .then(() => {
                this._userCollections = collections
                return true
            })
    },

    deleteCollection(collectionId) {

        const collections = this._userCollections

        for (let i = 0; i < collections.length; i++) {
            let collection = collections[i]
            if (collection.id === collectionId) {
                collections.splice(i, 1)
            }
        }

        return this.updateUser(this._userPassword, { collections })
            .then(() => {
                this._userCollections = collections
                return true
            })
    },

    togglePhotoCollection(photoId, collectionId) {

        const collections = this._userCollections

        for (let i = 0; i < collections.length; i++) {
            let collection = collections[i]
            if (collection.id === collectionId) {
                
                const photos = collection.photos
                const index = photos.indexOf(photoId)

                if (index > -1) {
                    photos.splice(index, 1)
                } else {
                    photos.push(photoId)
                }

                collections[i].photos = photos
            }
        }

        return this.updateUser(this._userPassword, { collections })
            .then(() => {
                this._userCollections = collections
                return true
            })
    },

    isInCollection(photoId, collectionId) {

        const collections = this._userCollections
        let found = false

        for (let i = 0; i < collections.length; i++) {
            let collection = collections[i]
            if (collection.id === collectionId) {
                found = collection.photos.includes(photoId)
                if (found) break
            }
        }

        return found
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

    searchPhotos(query, page = 1, results = 30) {
        return this._callUnsplashApi(`/search/photos?query=${query}&page=${page}&per_page=${results}`)
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

    retrievePopularPhotos(page = 1, results = 30) {
        return this._callUnsplashApi(`/photos?order_by=popular&page=${page}&per_page=${results}`)
            .then(res => res)
    }
};

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;