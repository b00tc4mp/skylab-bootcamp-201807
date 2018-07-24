const logic = {
    userId: null,
    userToken: null,
    userUsername: null,
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
                if (useToken) config.headers.authorization = 'Bearer ' + this.userToken
        }

        return fetch('https://skylabcoders.herokuapp.com/api' + path, config )
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error('request error, status ' + res.status);

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
            .then(res => {
                this.userId = res.data.id,
                this.userToken = res.data.token,
                this.userUsername = username
                return true
            })
    },

    unregisterUser(password) {
        return this._callUsersApi(`/user/${this.userId}`, 'delete', { username: this.userUsername, password }, true)
            .then(() => true)
    },

    logOut() {
        this.userId = null
        this.userToken = null
        this.userUsername = null
    },

    updateUser(password, newUsername, newPassword) {
        // TODO
        return this._callUsersApi(`/user/${this.userId}`, 'put', { username: this.userUsername, password }, true)
            .then(() => {
                this.userUsername = newUsername,
                password = newPassword
                return true
            })
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