require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const {logic,LogicError}  = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()


//USER ROUTES//

// Register User

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, username, password, allergens } } = req
    
    logic.register(email, username, password, allergens)
    .then(() => res.status(201).json({ message: 'user registered'}))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })

})


// Login user

router.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { email, password} } = req
    
    logic.authenticate(email, password)
        .then(userID => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP})
        
            res.json({ message: 'user authenticated', token, userID })
        })
        .catch(err => {
            debugger
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

// Retrieve profile user //

router.get('/user/:email/profile', [validateJwt, jsonBodyParser], (req, res) =>{
    const { params: { email } } = req

    logic.retrieveProfileUser(email)
    .then(res.json.bind(res))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})


// Update allergens

router.patch('/user/:email/profile', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password, allergens, newAllergens }} = req

    logic.updateAllergens(email, password, allergens, newAllergens)
        .then(() => res.json({ message: 'allergens updated'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


//MENUS RUTES//

// Add menu

router.post('/user/:email/menus', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { title }} = req
    
    logic.addMenu(email, title)
        .then(menus => res.json({ message: 'Menu added correctly', menus}))
        .catch(err => {
            const { message } = err
            
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// List Menus

router.get('/user/:email/menus', [validateJwt, jsonBodyParser], (req, res) =>{
    const { params: { email } } = req

    logic.listMenus(email)
    .then(res.json.bind(res))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})

// Delete menus

router.delete('/user/:email/menus/:id', validateJwt, (req, res) => {
    const{ params: { email, id }} = req

    logic.removeMenu(email,id)
        .then(() => res.json({ message: 'Menu deleted correctly'}))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 404 : 500).json({ message })
        })
})

//DISHES RUTES//

//Add dishes//

router.post('/user/:email/menus/:menuId/dishes', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email, menuId }, body: { titleDish, recipeId, sort }} = req
    
    logic.addDish(email, titleDish, recipeId, sort, menuId)
        .then((id) => res.json({ message: 'Dish added correctly', id }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// List dishes //

router.get('/user/:email/menus/:menuId/dishes', [validateJwt, jsonBodyParser], (req, res) =>{
    const { params: { email, menuId } } = req

    logic.listDishes(email, menuId)
    .then(res.json.bind(res))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})

// Remove Dish //

router.delete('/user/:email/menus/:menuId/dishes/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const{ params: { email, menuId, id }} = req

    logic.removeDish(email, menuId, id)
        .then(() => res.json({ message: 'Dish deleted correctly'}))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

// SEARCH RECIPES //

// Basic Search //

router.get('/search/:query', (req, res) =>{
    const { params: { query } } = req

    logic.basicSearch(query)
    .then(res.json.bind(res))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})

// User search with allergens //

router.get('/user/:email/search/:query' , [validateJwt, jsonBodyParser],  (req, res) =>{
    const { params: { query, email } } = req
    debugger
    return logic.searchRecipeAllergens(query, email)
    .then(res.json.bind(res))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})

// Search recipe ID Menu //

router.get('/user/:email/search/menus/:menuId' , [validateJwt, jsonBodyParser],  (req, res) =>{
    const { params: { email, menuId } } = req
    debugger
    return logic.searchRecipeById(email, menuId)
    .then(res.json.bind(res))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})

// Search recipe ID //

router.get('/user/recipe/:id' , jsonBodyParser,  (req, res) =>{
    const { params: { id } } = req
    debugger
    return logic.basicSearchRecipeById(id)
    .then(res.json.bind(res))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})


module.exports = router