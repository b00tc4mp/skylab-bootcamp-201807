const logic = {

    /**
     * SESSION STORAGE FOR THE USER ACCOUNT
     * 
     * @property {set} param sets the param on sessionStorage
     * @property {get} param gets the param from sessionStorage
     */

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

    set _userFavorites (userFavorites){
        sessionStorage.setItem('userFavorites', JSON.stringify(userFavorites))
    },

    get _userFavorites(){ 
        return JSON.parse(sessionStorage.getItem('userFavorites')) || []  
    },

    /**
     * User API to register, login, update, unregister or logout an user account
     * 
     * @param {string} path 
     * @param {string} method 
     * @param {object} body 
     * @param {string} token 
     * 
     * @returns {Promise} a result of what we ask for
     * 
     * @throws {Promise} if there is an error throws an error message
     */
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

    /**
     * @param {string} username
     * @param {string} password
     * 
     * @returns {Promise} the id of the registered user
     */
    register(username, password) {
       return this._callApiUser('/user', 'post', { username, password })
            .then(res => res.data.id)
    },

    /**
     * @param {string} username
     * @param {string} password
     * 
     * @returns {Promise} the id, token, username and password of the logged user and saves them in sessionStorage
     */
    login(username, password) {
        return this._callApiUser('/auth', 'post', { username, password })
            .then(({data: { id, token}}) => {
                this._userUsername = username
                this._userPassword = password
                this._userToken = token
                this._userId = id
                return true
            })  
    },

    /**
     * @param {string} password
     * @param {string} newUsername
     * @param {string} newPassword
     * 
     * @returns {Promise} the newUsername and the newPassword (both optional) replaced with the old ones and the sessionStorage updated
     */
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
                if (newPassword) this._userPassword = newPassword
                return true
            })
    },

    /**
     * @param {string} password
     * 
     * @returns {Promise} the user account deleted and the sessionStorage cleared
     */
    delete(password) {
        return this._callApiUser(`/user/${this._userId}`, 'delete', { username: this.userUsername, password }, true)
            .then(() => {
                sessionStorage.clear()
                return true
            })
    },

    /**
     * @returns {status} the username, token and id status to convert to null and to clear the sessionStorage
     */
    logout() {
        this._userUsername = null
        this._userToken = null
        this._userId = null
        sessionStorage.clear()
    },

    /**
     * @returns {status} the username, token and id status to know if the user is logged
     */
    get loggedIn (){
        return this.userUsername && this._userToken && this._userId
    },

    /**
     * @param {string} name 
     * if the name received is in the sessionStorage, it splices the name, else it pushes the name
     * 
     * @returns {Promise} updates the sessionStorage
     */
    toggleFoodFavorite(name) {
        const favorites = this._userFavorites
        const index = favorites.indexOf(name)

        if (index > -1) {
            favorites.splice(index, 1)
        } else {
            favorites.push(name)
        }

        const data = { username: this.userUsername, password: this._userPassword, favorites}

        return this._callApiUser(`/user/${this._userId}`, 'put', data, true)
            .then(() => {
                this._userFavorites = favorites
                return true
            })
    },

    /**
     * @param {string} name 
     * 
     * @returns {Function} updates the sessionStorage
     */
    isFavorite(name){
        return this._userFavorites.includes(name)
    },


    /**
     * Nutrition API (Nutritionix) to list by searched ingredients and see the details of each one
     * 
     * @param {string} path 
     * @param {string} method 
     * @param {Object} body 
     * 
     * @returns {Promise} a result of what we ask for
     * 
     * @throws {Promise} if there is an error throws an error message
     */
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
                return res
            })
    },

    /**
     * @param {string} query
     * 
     * @returns {Promise} an ingredients list using a query
     */
    searchIngredients (query) {
        return this._callApiNutrition('search/instant?query=' + query)
            .then((res) => res)
    },

    /**
     * @param {string} query
     * 
     * @returns {Promise} an ingredient details using a query
     */
    ingredientInfo (query) {
        return this._callApiNutrition('natural/nutrients/', 'post', query)
            .then((res) => res)
    }
    
}

if (typeof module !== 'undefined') module.exports = logic;