const logic = {
    
    set _userId(userId) { sessionStorage.setItem('userId', userId) },
    get _userId() { return sessionStorage.getItem('userId') },

    set _userToken(userToken) { sessionStorage.setItem('userToken', userToken) },
    get _userToken() { return sessionStorage.getItem('userToken') },

    set _userUsername(userUsername) { sessionStorage.setItem('userUsername', userUsername) },
    get _userUsername() { return sessionStorage.getItem('userUsername') },

    spotifyToken: null,

    _callUsersApi(path, method = 'get', body, useToken) {
        const config = {
            method
        }

        if (body) config.body = JSON.stringify(body)

        const noGetMethod = method !== 'get'
        if (noGetMethod || useToken) {
            config.headers = {}
                if (noGetMethod) config.headers['content-type'] = 'application/json'
                if (useToken) config.headers.authorization = 'Bearer ' + this._userToken
        }

        return fetch('https://skylabcoders.herokuapp.com/api' + path, config )
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error('There is an error: ' + res.error);

                return res;
            });
    },

    _callSpotifyApi(path) {
        return fetch('https://api.spotify.com/v1' + path, {
            headers: {
                authorization: 'Bearer ' + this.spotifyToken
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error('Sorry there is an error. Try it later!');

                return res;
            });
    },

    
    // user's

    registerUser(username, password) {
        return this._callUsersApi('/user', 'post', { username, password })
            .then(res => res.data.id)
    },

    loginUser(username, password) {
        return this._callUsersApi('/auth', 'post', { username, password })
            .then(res => {
                this._userId = res.data.id
                this._userToken = res.data.token
                this._userUsername = username
                return true
            })
    },

    unregisterUser(password) {
        return this._callUsersApi(`/user/${this._userId}`, 'delete', { username: this._userUsername, password }, true)
            .then(() => {
                sessionStorage.clear()
            })    
            .then(() => true)
                
    },

    logOut() {
        this._userId = null
        this._userToken = null
        this._userUsername = null
    },

    updateUser(password, newUsername, newPassword) {
        return this._callUsersApi(`/user/${this._userId}`, 'put', { username: this._userUsername, password, newUsername, newPassword }, true)
            .then(() => {
                if (newUsername !== null) this._userUsername = newUsername
                return true 
            })
    },

    get loggedIn() {
        return this._userId && this._userToken && this._userUsername
    },


    // spotify's

    searchArtists: function (query) {
        return this._callSpotifyApi('/search?type=artist&query=' + query)
            .then(res => res.artists.items)
    },

    retrieveAlbumsByArtistId(id) {
        return this._callSpotifyApi('/artists/' + id + '/albums')
            .then(res => res.items)
    },

    retrieveTracksByAlbumId(id) {
        return this._callSpotifyApi('/albums/' + id + '/tracks')
            .then(res => res.items)
    },

    retrieveTrackById(id) {
        return this._callSpotifyApi('/tracks/' + id)
    }
};

if (typeof module !== 'undefined') module.exports = logic;