const logic = {
    // userId: null,
    // userToken: null,
    // userUsername: null,
    
    //Getters and setters of userId
    set _userId(userId) {
        sessionStorage.setItem('userId', userId)
    },
    
    get _userId(){
        return sessionStorage.getItem('userId')
    },
    
    set _userToken(userToken){
        sessionStorage.setItem('userToken', userToken)
    },
    
    get _userToken(){
        sessionStorage.getItem('userToken')
    },
    
    set _userUsername(_userUsername){
        sessionStorage.setItem('userUsername', userToken)
    },
    
    get _userToken(){
        sessionStorage.getItem('userUsername')
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

    logout() {
        this.userId = null
        this.userToken = null
        this.userUsername = null
    },

    get loggedIn(){
        const userId = sessionStorage.getItem('userId')
        const userToken = sessionStorage.getItem('userToken')
        const userUsername = sessionStorage.getItem('userUsername')

        return userId && userToken && userUsername
    },

    updateUser(password, newUsername, newPassword) {
        // TODO
        return this._callUsersApi(`/user/${this.userId}`, 'put', { 
            username: this.userUsername,
            password }, true)
            .then(() => {
                this.userUsername = newUsername,
                password = newPassword
            })
    },

    unregisterUser(password) {
        //return this._callUsersApi(`/user/${this._userId}`, 'delete', {
        const userId = sessionStorage.getItem('userId')
        const userUsername = sessionStorage.getItem('userUsername')

        return this._callUsersApi(`/user/${userId}`, 'delete', {
            //username: this._userUsername,
            username: userUsername,
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