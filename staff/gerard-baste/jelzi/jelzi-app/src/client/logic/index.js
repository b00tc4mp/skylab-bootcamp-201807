const validateEmail = require('../../utils/validate-email')

const logic = {
    url: 'http://localhost:8080/api',

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
                        .then(({message}) => {throw new LogicError(message)})
            })
    },
/**
 * Validate all string fields
 * @param {string} fieldName 
 * @param {string} fieldValue 
 */
    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },
/**
 * Validate email
 * @param {email} email 
 */
    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },
/**
 * Validate all number fields
 * @param {string} name 
 * @param {number} value 
 */
    _validateNumberField(name, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${name}`)
    },
/**
 * Validate all array fields
 * @param {string} name 
 * @param {array} value 
 */
    _validateArrayField(name, value) {
        if (!Array.isArray(value)) throw new LogicError(`invalid ${name}`)
    },
/**
 * Register a new user to API
 * @param {email} email The user's email
 * @param {string} username The user's username
 * @param {string} password The user's password
 * @param {array} allergens The user's allergens
 * @returns {Promise<string>} - The user id
 */
    register(email, username, password, allergens) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('username', username)
                this._validateStringField('password', password)
                this._validateArrayField('allergens', allergens)

                return this._call('register', 'post', {'Content-Type': 'application/json'}, JSON.stringify({
                        email,
                        username,
                        password,
                        allergens
                    }), 201)
                    .then(() => true)
            })
    },
/**
 * Authenticate a user to API
 * @param {email} email The user's email
 * @param {string} password The user's password
 */
    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('authenticate', 'post', {'Content-Type': 'application/json'}, JSON.stringify({email,password}), 200)
                    .then(res => res.json())
                    .then(({token}) => token)
            })
    },
/**
 * Retrive all information about one user from API
 * @param {email} email The user's email
 * @param {string} token The user's token
 */
    retrieveProfileUser(email, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return this._call(`user/${email}/profile`, 'get', { authorization: `bearer ${token}`}, undefined, 200)
            })
            .then(res => res.json())
    },
/**
 * Update profile user to API
 * @param {email} email The user's email
 * @param {string} password The user's password
 * @param {array} allergens The user's allergens
 * @param {array} newAllergens The user's new allergens
 * @param {string} token The user's token
 */
    updateAllergens(email, password, allergens, newAllergens, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateArrayField('allergens', allergens)
                this._validateArrayField('new allergens', newAllergens)

                return this._call(`user/${email}/profile`, 'PATCH', { authorization: `bearer ${token}`,'content-type': 'application/json' }, JSON.stringify({email, password, allergens, newAllergens}), 200)
            })
            .then(res => res.json())
    },
/**
 * Add new menu to one user to API
 * @param {email} email The user's email
 * @param {string} title The title new menu
 * @param {string} token The user's token
 */
    addMenu(email, title, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title', title)

                return this._call(`user/${email}/menus`, 'post', { authorization: `bearer ${token}`,'content-type': 'application/json' }, JSON.stringify({email, title}), 200)
            })
            .then(res => res.json())
    },
/**
 * Retrive all menus from one user from API
 * @param {email} email The user's email
 * @param {string} token The user's token
 */
    listMenus(email, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return this._call(`user/${email}/menus`, 'get', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },
/**
 * Remove one menu from one user and save to API
 * @param {email} email The user's email
 * @param {string} menuId The menu ID
 * @param {string} token The user's token
 */
    removeMenu(email, menuId, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('menu ID', menuId)

                return this._call(`user/${email}/menus/${menuId}`, 'delete', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },
/**
 * Add one recipe on one menu
 * @param {email} email The user's email
 * @param {string} titleDish The title of the recipe
 * @param {string} recipeId The ID of the recipe
 * @param {number} sort Number to sort the recipes in to menu
 * @param {string} menuId The menu ID
 * @param {string} token The user's token
 */
    addDish(email, titleDish, recipeId, sort, menuId, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title dish', titleDish)
                this._validateStringField('recipe ID', recipeId)
                this._validateNumberField('sort', sort)
                this._validateStringField('menu ID', menuId)

                return this._call(`user/${email}/menus/${menuId}/dishes`, 'post', { authorization: `bearer ${token}`,'content-type': 'application/json' }, JSON.stringify({email, titleDish, recipeId, sort, menuId}), 200)
            })
            .then(res => res.json())
    },
/** 
 * List all recipies from one menu and user
 * @param {email} email The user's email
 * @param {string} menuId The menu ID
 * @param {string} token The user's token
 */
    listDishes(email, menuId, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('menu ID', menuId)

                return this._call(`user/${email}/menus/${menuId}/dishes`, 'get', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },
/**
 * remove one recipie from one menu and user
 * @param {email} email The user's email
 * @param {string} menuId The menu ID
 * @param {string} id The recipe ID
 * @param {string} token The user's Token
 */
    removeDish(email, menuId, id, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('menu ID', menuId)
                this._validateStringField('recipe ID', id)

                return this._call(`user/${email}/menus/${menuId}/dishes/${id}`, 'delete', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },
/**
 * Search without user loged 
 * @param {string} query 
 */
    basicSearch(query){
        return Promise.resolve()
            .then(() => {
                this._validateStringField('query', query)

                return this._call(`search/${query}`, 'get', undefined ,undefined, 200)
            })
            .then(res => res.json())
    },
/**
 * Search with user allergens
 * @param {string} query 
 * @param {email} email 
 * @param {string} token 
 */
    searchRecipeAllergens(query, email, token){
        return Promise.resolve()
            .then(() => {
                this._validateStringField('query', query)
                this._validateEmail(email)

                return this._call(`user/${email}/search/${query}`, 'get', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },
/**
 * Search one recipe by ID
 * @param {email} email 
 * @param {string} menuId 
 * @param {string} token 
 */
    searchRecipeById(email, menuId, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('menu ID', menuId)

                return this._call(`user/${email}/search/menus/${menuId}`, 'get', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },
/**
 * Search one recipe by ID without user loged
 * @param {string} recipeId The recipe ID
 */
    basicSearchRecipeById(recipeId){
        return Promise.resolve()
            .then(() => {
                return this._call(`user/recipe/${recipeId}`, 'get', undefined ,undefined, 200)
            })
            .then(res => res.json())
    },
        
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = {logic,LogicError}