const logic = {

    set _userUsername(userUsername){ 
        sessionStorage.setItem('userUsername', userUsername)
    },

    get _userUsername(){ 
        return sessionStorage.getItem('userUsername')
        
    },

    set _userPassword(userPassword){ 
        sessionStorage.setItem('userPassword', userPassword)
    },

    get _userPassword(){ 
        return sessionStorage.getItem('userPassword')
        
    },

    set _userId(userId){ 
        sessionStorage.setItem('userId', userId)
    },

    get _userId(){ 
        return sessionStorage.getItem('userId')
        
    },

    set _userToken(userToken){ 
        sessionStorage.setItem('userToken', userToken)
    },

    get _userToken(){ 
        return sessionStorage.getItem('userToken')
        
    },


    _callApiUser(path, method = "get", body, token) {

        const config = {
            method 
        }

        const noGet = method !== "get"
        if (noGet) {
            config.headers = {} 
        
            if (noGet) {
                config.headers["content-type"]= "application/json"
            }

            if (token) {
                config.headers.authorization = "Bearer" + this.token
            }
        }

        if (body) config.body = JSON.stringify(body)

        return fetch('https://skylabcoders.herokuapp.com/api/' + path, config)
            .then(function (res) {
                return (res.json())
            })

            .then(function (res) {
                console.log(res)
            })

            .catch(function (error) {
                console.log(error.error)
            })

    },

    register(username, password) {

       return this._callApiUser("user/", "post", { username, password })
            .then(data => data.id)

            .catch(error => error)


    },

    login(username, password) {

        return this._callApiUser('auth/', 'post', { username, password })
        .then(({data:{id, token}}) => {
            this._userUsername = username
            this._userPassword = password
            this._userToken = token
            this._userId = id
        })  
        .catch(function(err){
            return (err.error)
        })

    },

    logout() {

         this._userUsername = null
         this._userPassword = null
         this._userToken = null
         this._userId = null

         sessionStorage.clear()

        }

}
