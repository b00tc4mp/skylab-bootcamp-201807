const logic = {
    // _userId: null,
    // _userToken: null,
    // _userUsername: null,
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

    get _userUsername() {
        return sessionStorage.getItem('userUsername')
    },

    spotifyToken: null,

    _callUsersApi(path, method = 'get', body, useToken) {
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

    _callSpotifyApi(path) {
        return fetch('https://api.spotify.com/v1' + path, {
            headers: {
                authorization: 'Bearer ' + this.spotifyToken
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error('request error, status ' + res.error.status);

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
            .then(({ data: { id, token } }) => {
                this._userId = id
                this._userToken = token
                this._userUsername = username

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
        return this._userId && this._userToken && this._userUsername
    },

    updateUser(password, newUsername, newPassword) {
        if(newUsername === '')
            newUsername = this._userUsername
        return this._callUsersApi(`/user/${this._userId}`, 'put', {
            username: this._userUsername,
            password,
            newUsername, 
            newPassword
        }, true)
            .then(() => {
                this._userUsername = newUsername
                return true
            })
    },

    unregisterUser(password) {
        return this._callUsersApi(`/user/${this._userId}`, 'delete', {
            username: this._userUsername,
            password
        }, true)
            .then(() => true)
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

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;