const logic = {

    set _userUsername(userUsername){ 
        sessionStorage.setItem('userUsername', userUsername)
    },

    get userUsername(){ 
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


    _callApiUser(path, method = 'get', body, token) {

        const config = {
            method 
        }

        const noGet = method !== 'get'
        if (noGet || token) {
            config.headers = {} 
            if (noGet) config.headers['content-type']= 'application/json'
            if (token) config.headers.authorization = 'Bearer ' + this._userToken   
        }

        if (body) config.body = JSON.stringify(body)

        return fetch('https://skylabcoders.herokuapp.com/api' + path, config)
            .then(res => res.json())

            .then(res => {
                if (res.status === 'KO') throw Error(res.error)
                return res;
            })
    },

    register(username, password) {

       return this._callApiUser('/user', 'post', { username, password })
            .then(res => res.data.id)
    },

    login(username, password) {

        return this._callApiUser('/auth', 'post', { username, password })
            .then(({data: { id, token}}) => {
                this._userUsername = username
                this._userPassword = password
                this._userToken = token
                this._userId = id

                return true
                //return this._callApiUser(`user/${this._userId}`, 'get', undefined, true)
            })  
    },

    update(password, newUsername, newPassword) {
        const data = {
            username: this.userUsername,
            password
        }
        if (newPassword) data.newPassword = newPassword
        if (newUsername) data.newUsername = newUsername
        
        return this._callApiUser(`/user/${this._userId}`, 'put', data, true )
        .then(() => {
        
            if (newUsername) this._userUsername = newUsername
            return true
        })
    },

    delete(password) {

        return this._callApiUser(`/user/${this._userId}`, 'delete', { username: this.userUsername, password }, true)

        .then(() => true)
    },

    logout() {

         this._userUsername = null
         this._userToken = null
         this._userId = null

         sessionStorage.clear()
    },

    get loggedIn (){

        return this.userUsername && this._userToken && this._userId
    },


    // API NUTRITIONIX

    _callApiNutrition (path, method = 'get', body){
        const config = {
            method
        } 
        config.headers = {}
        config.headers['content-type'] = 'application/json'
        config.headers['x-app-id'] = '9a5a7f22'
        config.headers['x-app-key'] = '420560ecc26327c6ca2e1f211054ac48'
        
        if (body) config.body = JSON.stringify({query:body})

        return fetch('https://trackapi.nutritionix.com/v2/' + path, config)
        .then((res) => res.json())
        .then(res => {
            if (res.message) throw Error("api connection failed")
            return res;
        })
    },

    searchIngredients (query) {

        return this._callApiNutrition('search/instant?query=' + query)
            .then((res) => res)
    },

    ingredientInfo (query) {

        return this._callApiNutrition('natural/nutrients/', 'post', query)
            .then((res) => res)
    }

}

if (typeof module !== 'undefined') module.exports = logic;
