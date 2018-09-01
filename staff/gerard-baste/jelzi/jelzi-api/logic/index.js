// import { debug } from 'util';

const validateEmail = require('../utils/validate-email')
const {
    User,
    Menu,
    Dish
} = require('../data/models')

const { Types: { ObjectId } } = require('mongoose')

const es6 = require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');

const logic = {
    _validateStringField(name, value) {
        if (typeof value !== 'string' || !value.length) throw new LogicError(`invalid ${name}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new LogicError('invalid email')
    },

    _validateNumberField(name, value){
        if (typeof value !== 'number') throw new LogicError(`invalid ${name}`)
    },

    _validateArrayField(name, value){
        if (!Array.isArray(value) || !value.length) throw new LogicError(`invalid ${name}`)
    },

    register(email, username, password, allergens = undefined) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('username', username)
                this._validateStringField('password', password)

                return User.findOne({ email })
            })
            .then(user => {
                if (user) throw new LogicError(`user with ${email} email already exist`)

                let newUser = {};
                if (allergens) newUser = {
                    email,
                    username,
                    password,
                    allergens
                }
                else newUser = {
                    email,
                    username,
                    password
                }

                return User.create(newUser)
            })
            .then(() => true)
    },

    authenticate(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return User.findOne({
                    email
                })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                return user.id
            })
    },

    updateAllergens(email, password, allergens, newAllergens) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)
                this._validateArrayField('new allergens', newAllergens)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (user.password !== password) throw new LogicError(`wrong password`)

                if (!newAllergens) throw new LogicError(`Wrong allergens`)

                user.allergens = newAllergens

                return user.save()
            })
            .then(() => true)
    },

    addMenu(email, title) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title', title)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (!title) throw new LogicError(`Wrong title`)

                const menu = {title}
                
                user.menus.push(new Menu(menu))

                return user.save()
            })
            .then(user => user.menus )
    },

    addDish(email, titleDish, recipeId, order, menuId) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('title Dish', titleDish)
                this._validateStringField('recipe Id', recipeId)
                this._validateStringField('menuId', menuId)
                this._validateNumberField('order', order)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (!titleDish) throw new LogicError(`Wrong title dish`)

                if (!recipeId) throw new LogicError(`Wrong recipe Id`)

                if (!order) throw new LogicError(`Wrong number order`)

                const dish = {titleDish, recipeId, order}
                
                let menuExists = user.menus.find(elem => elem._id.toString() === menuId)
                if (!menuExists) throw new LogicError(`Menu not found`)
                    user.menus.forEach(element => {
                        
                        if (element._id.toString() === menuId) {
                            element.dishes.push(new Dish(dish))
                            return user.save()
                        }
                    });
                return user 
            })
    },

    removeDish(email, menuId, id) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('Menu Id', menuId)
                this._validateStringField('Dish Id', id)
              
                return User.findOne({ email, "menus._id": ObjectId(menuId) }) 
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                const dishes = user.menus.find(menu => menu._id.toString() === menuId).dishes
                const pos = dishes.findIndex(dish => dish._id.toString() === id)

                dishes.splice(pos, 1)

                return user.save()
            })
            .then(() => true)
    },

    removeMenu(email, menuId) {
        
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('Menu ID', menuId)
              
                return User.findOne({ email }) 
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                let menuExists = user.menus.find(elem => elem._id.toString() === menuId)

                if (!menuExists) throw new LogicError(`Menu not found`)

                const pos = user.menus.findIndex(menu => menu._id.toString() === menuId)

                user.menus.splice(pos, 1)

                return user.save()
            })
            .then(() => true)
    },

    listMenus(email) { 
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                    return User.findOne({ email })
                })
                    .then(user => {
                        if(!user) throw new LogicError (`user ${user} does not exist`)
                        return menus = user.menus.map(menu => menu)
                        })
    },

    listDishes(email, menuId) { 
        return Promise.resolve()
            .then(() => {
                debugger
                this._validateEmail(email)
                this._validateStringField('menu ID', menuId)
                
                return User.findOne({ email })
                })
                .then(user => {
                    if(!user) throw new LogicError(`user ${user} does not exist`)

                    if(!menuId) throw new LogicError('Invalid menu ID')
                    debugger
                    return user.menus.find(menu => menu.id === menuId).dishes
                })
    },

    searchRecipeById(email, menuId){

        const appId = '6b5aa10e',
        appKey = 'ecc14d0ee3cece665188f76abb1ad5ab',
        recipesData = []
    
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('Menu ID', menuId)
                
                return User.findOne({ email, "menus._id": ObjectId(menuId) }) 
                
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                return  user.menus.find(menu => menu._id.toString() === menuId)
            })
            .then(user => {

                const urls = user.dishes.map(dish => `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${dish.recipeId}&app_id=${appId}&app_key=${appKey}`)

                return Promise.all(urls.map(fetch)).then(responses =>
                    Promise.all( responses.map(response => response.json()) )
                ).then(recipes => {
                    recipes.forEach(_recipe => {
                        const recipe = _recipe[0]
                        const recipeData = {
                                uri: recipe.uri,
                                label: recipe.label,
                                image: recipe.image,
                                source: recipe.source,
                                url: recipe.url,
                                yield: recipe.yield,
                                ingredients: recipe.ingredientLines,
                                calories: recipe.calories,
                                time: recipe.totalTime,
                                fat: recipe.totalNutrients.FAT,
                                fasat: recipe.totalNutrients.FASAT,
                                fatrn: recipe.totalNutrients.FATRN,
                                carbs: recipe.totalNutrients.CHOCDF,
                                fiber: recipe.totalNutrients.FIBTG,
                                sugar: recipe.totalNutrients.SUGAR,
                                protein: recipe.totalNutrients.PROCNT,
                                cholesterol: recipe.totalNutrients.CHOLE
                            }

                        recipesData.push(recipeData)
                    })

                    return recipesData
                })
            })
},

    searchRecipeAllergens(query, email){

        const appId = '6b5aa10e',
        appKey = 'ecc14d0ee3cece665188f76abb1ad5ab',
        results = [];

        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('query', query)

                return User.findOne({ email })
            })
            .then(user => {
                if (!user) throw new LogicError(`user with ${email} email does not exist`)

                if (!query) throw new LogicError(`Invalid ${query} search`)
                
                return user.allergens
            })
            .then(allergens => {
                let allergenPath = '';
                allergens.forEach(allergens => {
                    allergenPath += `health=${allergens}&`
                })
                return fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&${allergenPath}from=0&to=100`)
            })
            .then(function(response) {
                return response.json();
              })

            .then(recipes => {
                recipes.hits.forEach(recipeObj => {
                    const { recipe } = recipeObj
                    const recipeData = {
                        uri: recipe.uri,
                        label: recipe.label,
                        image: recipe.image,
                        source: recipe.source,
                        url: recipe.url,
                        yield: recipe.yield,
                        ingredients: recipe.ingredientLines,
                        calories: recipe.calories,
                        time: recipe.totalTime,
                        fat: recipe.totalNutrients.FAT,
                        fasat: recipe.totalNutrients.FASAT,
                        fatrn: recipe.totalNutrients.FATRN,
                        carbs: recipe.totalNutrients.CHOCDF,
                        fiber: recipe.totalNutrients.FIBTG,
                        sugar: recipe.totalNutrients.SUGAR,
                        protein: recipe.totalNutrients.PROCNT,
                        cholesterol: recipe.totalNutrients.CHOLE

                    }
                    results.push(recipeData) 
            
                })
                debugger
                return results
            })
    },

    basicSearch(query){
        const appId = '6b5aa10e',
        appKey = 'ecc14d0ee3cece665188f76abb1ad5ab',
        results = [];

        return Promise.resolve()
            .then(() => {
                this._validateStringField('query', query)

                return fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=100`)

            })
            .then(function(response) {
                return response.json();
              })

            .then(recipes => {
                recipes.hits.forEach(recipeObj => {
                    const { recipe } = recipeObj
                    const recipeData = {
                        uri: recipe.uri,
                        label: recipe.label,
                        image: recipe.image,
                        source: recipe.source,
                        url: recipe.url,
                        yield: recipe.yield,
                        ingredients: recipe.ingredientLines,
                        calories: recipe.calories,
                        time: recipe.totalTime,
                        fat: recipe.totalNutrients.FAT,
                        fasat: recipe.totalNutrients.FASAT,
                        fatrn: recipe.totalNutrients.FATRN,
                        carbs: recipe.totalNutrients.CHOCDF,
                        fiber: recipe.totalNutrients.FIBTG,
                        sugar: recipe.totalNutrients.SUGAR,
                        protein: recipe.totalNutrients.PROCNT,
                        cholesterol: recipe.totalNutrients.CHOLE

                    }
                    results.push(recipeData) 
            
                })
        
                 return results
            })
    }

}



class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = {
    logic,
    LogicError
}

