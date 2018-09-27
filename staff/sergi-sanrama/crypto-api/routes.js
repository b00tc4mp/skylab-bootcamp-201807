require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError} = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()    


//TEST ROUTE
router.get('/test/sayhello', (req, res) => {
    res.send('Hello World');

})

////////////////
//USER ROUTES//
//////////////

//REGISTER USER
router.post('/user/register', jsonBodyParser, (req, res) => {
    const { body: { username, email, password } } = req
    

    logic.register(username, email, password)
        .then(() => res.status(201).json({message: 'user registered'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//AUTHENTICATE USER
router.post('/user/authenticate',  jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = process.env
            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP})
            res.json({ message: 'user authenticated', token })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

//UPDATE PASSWORD

router.post('/user/update',  [validateJwt, jsonBodyParser], (req, res) => {
    const { body: { email, password, newPassword} } = req

    logic.updatePassword(email, password, newPassword)
        .then(() => res.status(201).json({ message: 'password update correctly' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})  

//UNREGISTER USER
router.post('/user/unregister',  [validateJwt, jsonBodyParser], (req, res) => {
    const { body: { email, password} } = req

    logic.unregisterUser(email, password)
        .then(() => res.status(201).json({ message: 'user removed from the database correctly' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


/////////////////////
//PORTFOLIO ROUTES//
///////////////////

//ADD A COIN TO PORTFOLIO
router.post('/user/:email/portfolio/add', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { name, quantity, value, date } } = req

    logic.addCoin(email, name, quantity, value, date)
        .then(() => res.status(201).json({ message: 'coin added correctly' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json( { message })
        })
})

//LIST THE CURRENCIES OF THE PORTFOLIO
router.get('/user/:email/portfolio/list', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email } } = req 

    logic.listCoins(email)
        .then(portfolio => res.status(200).json({ message: 'coins retrieved correctly', portfolio}))
        .catch(err => {
            const { message } = err
    
            res.status(err instanceof LogicError ? 400 : 500).json( { message })
        })
})

//UPDATE COIN AMOUNT
router.patch('/user/:email/portfolio/update/', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { coinId, newValue, newDate, newName, newQuantity } } = req
    
    logic.updateCoin(email, coinId, newValue, newDate, newName, newQuantity)
        .then(() => res.status(201).json({ message: 'coin updated correctly'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json( { message })
        })
})

//REMOVE A COIN
router.delete('/user/:email/portfolio/remove', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { coinId } } = req

    logic.removeCoin(email, coinId)
        .then(() => res.status(201).json({ message: 'successful remove'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json( { message })
        })
})

//COMPARE CURRENCIES
router.get('/portfolio/compare', (req, res) => {
    const { query: { coin, coin2 } } = req

    logic.getValue(coin, coin2)
    .then(data => res.status(200).json({message: 'coins compare succesfully', data}))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })

})

//COINMARKET API ROUTES //

// GET MARKET COINS
router.get('/market/list', (req, res) => {
    const { query: { limit } } = req
    
    logic.getCoins(limit)
        .then(data => res.status(200).json({message: 'coins retrived succesfully', data}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})



//CRYPTOCOMPARE API ROUTES//

//PORTFOLIO - GET VALUE
router.get('/market/value', (req, res) => {
    const { query: { coin, fiduciary } } = req

    logic.getValue(coin, fiduciary)
        .then(() => res.status(200).json({message: 'retrieved value correctly'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })   
})

// MARKET - GET GLOBAL STATS
router.get('/market/stats', (req, res) => {
   
    logic.getGlobalStats()
        .then(stats => res.status(200).json({message: 'retrieved global stats correctly', stats}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


// NEWS - GET CRYPTO NEWS
router.get('/news', (req, res) => {
    const { query: { site }} = req

    logic.getCryptoNews(site)
        .then(news => res.status(200).json({message: 'retrieved news correctly', news }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        }) 
})





module.exports = router