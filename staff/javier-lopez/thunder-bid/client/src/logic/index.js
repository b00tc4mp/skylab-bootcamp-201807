const { validate } = require('../utils/validate')

const logic = {
    url: 'https://radiant-forest-85690.herokuapp.com/api',

    /**
     * Makes the call to the api
     * 
     * @param {string} path 
     * @param {string} method 
     * @param {string} header optional
     * @param {string} body optional
     * @param {number} expectedStatus
     * 
     */
    _call(path, method, headers, body, expectedStatus) {
        const config = { method }
        if (headers) config.headers = headers
        if (body) config.body = body
        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else 
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    },

    /**
     * Registers a new user in the database.
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     * @param {string} surname 
     * 
     */
    register(email, password, name, surname) {
        return Promise.resolve()
            .then(() => {
                validate._validateEmail(email)
                validate._validateStringField('password', password)
                validate._validateStringField('name', name)
                validate._validateStringField('surname', surname)

                return this._call('register', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password, name, surname }), 201)
                    .then(() => true)
                    .catch(err => {throw new Error(err)})
            })
    },

    /**
     * Allows you to retrieve a userId and token of a user.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     */
    login(email, password){
        return Promise.resolve()
            .then(() => {
                validate._validateEmail(email)
                validate._validateStringField('password', password)

                return this._call('login', 'post', {
                    'Content-Type': 'application/json'
                }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .catch(({message}) => {throw new Error(message)})
            })
    },

    /**
     * Allows you to retrieve a list of bidded products of a user.
     * 
     * @param {string} userId 
     * @param {string} token 
     * 
     */
    listUserBiddedProducts(userId, token){
        return Promise.resolve()
            .then(() => this._call(`user/bidded/${userId}`, 'get', {authorization: `bearer ${token}`}, undefined, 200))
            .then(res => res.json())
            .catch(err => err)
    },

    /**
     * Allows you to retrieve a list of wishes of a user.
     * 
     * @param {string} userId 
     * @param {string} token 
     * 
     */
    listUserWishes(userId, token){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/wishes/${userId}`, 'get', {authorization: `bearer ${token}`}, undefined, 200)})
            .then(res => res.json())
            .catch(err => err)
    },

    /**
     * Allows you to retrieve product details.
     * 
     * @param {string} productId 
     * 
     */
    retrieveProduct(productId){
        return Promise.resolve()
            .then(() => this._call(`product/${productId}`, 'get', undefined, undefined, 200))
            .then(res => res.json())
            .catch(err => err)
    },

    /**
     * Allows you to retrieve a user.
     * 
     * @param {string} userId 
     * @param {string} token 
     * 
     */
    retrieveUser(userId, token){
        return Promise.resolve()
            .then(() => this._call(`user/${userId}`, 'get', {authorization: `bearer ${token}`}, undefined, 200))
            .then(res => {
                return res.json()
            })
            .catch(err => err)
    },

    /**
     * Allows you to add a bid.
     * 
     * @param {string} productId 
     * @param {string} userId 
     * @param {number} price 
     * @param {string} token 
     * 
     */
    addBid(productId, userId, price, token){
        return Promise.resolve()
            .then(() => this._call(`product/${productId}/bid/${userId}`, 'post', 
                {authorization: `bearer ${token}`, 'content-type': 'application/json'},
                JSON.stringify({ price }), 201))
            .then(res => {
                return res.json()
            })
            .catch(err => {throw new Error(err)})
    },

    /**
     * Allows you to add a wish.
     * 
     * @param {string} productId 
     * @param {string} userId 
     * @param {string} token 
     * 
     */
    addWish(productId, userId, token){
        return Promise.resolve()
            .then(() => this._call(`product/${productId}/wish/${userId}`, 'post', {authorization: `bearer ${token}`}, undefined, 201))
            .then(res => res.json())
            .catch(({message}) => {throw new Error(message)})
    },

    /**
     * Allows you to delete a wish.
     * 
     * @param {string} productId 
     * @param {string} userId 
     * @param {string} token 
     * 
     */
    deleteWish(productId, userId, token){
        return Promise.resolve()
            .then(() => this._call(`product/${productId}/wish/${userId}`, 'delete', {authorization: `bearer ${token}`}, undefined, 200))
            .then(res => res.json())
            .catch(err => {throw new Error(err)})
    },

     /**
     * Allows you to retrieve products by query and category.
     * If you don't give any param it will show all products.
     * 
     * @param {string} query optional
     * @param {string} category optional 
     * 
     */
    listProducts(query, category){
        return Promise.resolve()
            .then(() => {
                let _query = ''

                if (query || category) {
                    _query += '?'

                    if (query) _query += `q=${query}`
                    
                    if (category) _query += `${query? '&' :''}c=${category}`

                }
                
                return this._call(`/products${_query}`, 'get', { 'content-type': 'application/json' }, undefined, 200)
            })
            .then(res => {
                
                return res.json()})
            .catch(err => err)
    }

}

module.exports = logic