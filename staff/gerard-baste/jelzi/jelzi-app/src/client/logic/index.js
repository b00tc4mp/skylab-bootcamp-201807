const validateEmail = require('../../utils/validate-email')

const logic = {
    url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = {
            method
        }
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

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new LogicError(`invalid ${fieldName}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    _validateNumberField(name, value) {
        if (typeof value !== 'number') throw new LogicError(`invalid ${name}`)
    },

    _validateArrayField(name, value) {
        if (!Array.isArray(value)) throw new LogicError(`invalid ${name}`)
    },

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

    retrieveProfileUser(email, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)

                return this._call(`user/${email}/profile`, 'get', { authorization: `bearer ${token}`}, undefined, 200)
            })
            .then(res => res.json())
    },

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

    addMenu(email, title, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title', title)

                return this._call(`user/${email}/menus`, 'post', { authorization: `bearer ${token}`,'content-type': 'application/json' }, JSON.stringify({email, title}), 200)
            })
            .then(res => res.json())
    },

    listMenus(email, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                return this._call(`user/${email}/menus`, 'get', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },

    removeMenu(email, menuId, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('menu ID', menuId)
                return this._call(`user/${email}/menus/${menuId}`, 'delete', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },

    addDish(email, titleDish, recipeId, order, menuId, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title dish', titleDish)
                this._validateStringField('recipe ID', recipeId)
                this._validateNumberField('order', order)
                this._validateStringField('menu ID', menuId)
                return this._call(`user/${email}/menus/${menuId}/dishes`, 'post', { authorization: `bearer ${token}`,'content-type': 'application/json' }, JSON.stringify({email, titleDish, recipeId, order, menuId}), 200)
            })
            .then(res => res.json())
    },

    listDishes(email, menuId, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('menu ID', menuId)
                return this._call(`user/${email}/menus/${menuId}/dishes`, 'get', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },

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

    basicSearch(query){
        return Promise.resolve()
            .then(() => {
                this._validateStringField('query', query)
                return this._call(`search/${query}`, 'get', undefined ,undefined, 200)
            })
            .then(res => res.json())
    },

    searchRecipeAllergens(query, email, token){
        return Promise.resolve()
            .then(() => {
                this._validateStringField('query', query)
                this._validateEmail(email)
                return this._call(`user/${email}/search/${query}`, 'get', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },

    searchRecipeById(email, menuId, token){
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('menu ID', menuId)

                return this._call(`user/${email}/search/menus/${menuId}`, 'get', { authorization: `bearer ${token}`},undefined, 200)
            })
            .then(res => res.json())
    },

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