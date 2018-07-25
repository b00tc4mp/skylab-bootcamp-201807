var logic = {
    userId: null,
    userToken: null,
    userUsername: null,
    spotifyToken: null,

    _callUsersApi(path, method = 'get', body, userToken) {
        const config = {
            method
        }

        const methodNotGet = method !== 'get'

        if (methodNotGet || userToken) {
            config.headers = {}

            if (methodNotGet) config.headers['content-type'] = 'application/json'

            if (useToken) config.headers.authorization = 'Bearer' + this.userToken
        }

        if (body) config.body = JSON.stringify(body)

        return fetch('https://skylabcoders.herokuapp.com/api' + path, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'KO') throw Error(res.error)
                return res;
            })
    },

    _callSpotifyApi: function (path) {
        return fetch('https://api.spotify.com/v1' + path, {  // en vez de fetch $.ajax
            headers: {
                authorization: 'Bearer ' + this.spotifyToken
            }
        })

            .then(res => res.json())
            .then(res => {
                if (res.error) throw Error('request error, status ' + res.error.status);

                return res
            });
    },

    // user
    registerUser(username, password) {
        return this._callUsersApi('/user', 'post', { username, password })
            .then(res => res.data.id)
    },


    loginUser(username, password) {
        return this._callUsersApi('/auth', 'post', {username, password})
        .then(({data: {id, token}})  => {
            this.userId = id
            this.userToken = token
            this.username = username

            return true
        })
    },

    unregisterUser(password){
        return this._callUsersApi(`/user/${this.userId}`, 'delate', {
            username: this.username,
            password
        }, true) 
            .then(() => true)
    }, 

    logout(){
        this.userId = null
        this.userToken = null
        this.userUsername = null
    },




    //spoty

    searchArtists: function (query) {
        return this._callSpotifyApi('/search?type=artist&query=' + query)
            .then(function (res) {
                return res.artists.items;
            });
    },

    retrieveAlbumsByArtistId(id) {
        return this._callSpotifyApi('/artists/' + id + '/albums')
            .then(function (res) {
                return res.items;
            });
    },

    retrieveTracksByAlbumId(id) {
        return this._callSpotifyApi('/albums/' + id + '/tracks')
            .then(function (res) {
                return res.items;
            });
    },

    retrieveTrackById(id) {
        return this._callSpotifyApi('/tracks/' + id)
            .then(function (res) {
                return res;
            });
    }
};

//export default logic; //si hay que testearlo en el navegador, hay una alternativa q es:

if (typeof module !== "undefined") module.exports = logic  //ya nos lo explicaran