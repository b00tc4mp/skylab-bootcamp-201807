const logic = {
    userId: null,
    userToken: null,
    userUsername: null,
    spotifyToken: null,

    _callUsersApi(path, method = 'get', body, useToken) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet || useToken) {
            config.headers = {}

            if (methodNotGet) config.headers['content-type'] = 'application/json'

            if (useToken) config.headers.authorization = 'Bearer ' + this.userToken
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
                this.userId = id
                this.userToken = token
                this.userUsername = username

                return true
            })
    },

    unregisterUser(password) {
        return this._callUsersApi(`/user/${this.userId}`, 'delete', {
            username: this.userUsername,
            password
        }, true)
            .then(() => true)
    },

    logout() {
        this.userId = null
        this.userToken = null
        this.userUsername = null
    },

    updateUser(password, newUsername, newPassword) {
       return this._callUsersApi(`/user/${this.userId}`, 'put', {
        username:this.userUsername,    
        password,
        newPassword,
        newUsername
       },true)
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