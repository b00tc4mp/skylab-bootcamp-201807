const logic = {
    userId: null,
    userToken: null,
    userUsername: null,
    spotifyToken: null,

    _callUsersApi(path, method = 'get', body) {
        return fetch('https://skylabcoders.herokuapp.com/api' + path, {
            method,
            headers: {
                //authorization: 'Bearer ' + this.userToken
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error('request error, status ' + res.error);

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
        // TODO call api to auth user, and the keep user id, token and username in local context
        return this.__callUsersApi('/user', 'post', { username, password })
            .then(({ data: {id, token} }) => {
                this.userId = id
                this.userToken = token
                this.userUsername = username
                return true
            })
    },

    unregisterUser(password) {
        // TODO call api to delete user, and for that use the id, token and username from local context
        return this._callUsersApi(`/user/${this.userId}`, 'delete', {
            username: 
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

//export default logic;
if (typeof module !== 'undefined') module.exports = logic;