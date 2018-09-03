require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError} = require('./logic')

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
    // req.body.username

    logic.register(username, email, password)
        .then(() => res.status(201).json({message: 'user registered'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//AUTHENTICATE USER
router.post('/user/authenticate', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(() => res.status(201).json({message: 'user authenticated'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
}) // se queda colgado en postman si se introducen mal las creedenciales, check

//UPDATE PASSWORD
router.post('/user/update', jsonBodyParser, (req, res) => {
    const { body: { email, password, newPassword} } = req

    logic.updatePassword(email, password, newPassword)
        .then(() => res.status(201).json({ message: 'password update correctly' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//UNREGISTER USER
router.post('/user/unregister', jsonBodyParser, (req, res) => {
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
router.post('/portfolio/add', jsonBodyParser, (req, res) => {
    const { body: { email, name, quantity, value } } = req

    logic.addCoin(email, name, quantity, value)
        .then(() => res.status(201).json({ message: 'coin added correctly' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json( { message })
        })
})

//LIST THE CURRENCIES OF THE PORTFOLIO
router.post('/portfolio/list', jsonBodyParser, (req, res) => {
    const { body: { email } } = req 

    logic.listCoins(email)
        .then(() => res.status(201).json({ message: 'coins retrieved correctly'}))
        .catch(err => {
            const { message } = err
    
            res.status(err instanceof LogicError ? 400 : 500).json( { message })
        })
})

//UPDATE COIN AMOUNT
router.post('/portfolio/update', jsonBodyParser, (req, res) => {
    const { body: { email, coinId, newQuantity } } = req
    
    logic.updateCoin(email, coinId, newQuantity)
        .then(() => res.status(201).json({ message: 'amount update correctly'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json( { message })
        })
})

//REMOVE A COIN
router.post('/portfolio/remove', jsonBodyParser, (req, res) => {
    const { body: { email, coinId } } = req

    logic.removeCoin(email, coinId)
        .then(() => res.status(201).json({ message: 'successful remove'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json( { message })
        })
})


//////////////////////////
//COINMARKET API ROUTES//
////////////////////////

// GET MARKET COINS
router.get('/market/list', (req, res) => {
    const { query: { limit } } = req
    
    logic.getCoins(limit)
        .then(() => res.status(201).json({message: 'coins retrived succesfully'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


/////////////////////////////
//CRYPTOCOMPARE API ROUTES//
///////////////////////////

//GET VALUE
router.get('/market/value', (req, res) => {
    const { query: { coin, fiduciary } } = req

    logic.getValue(coin, fiduciary)
        .then(() => res.status(201).json({message: 'retrieved value correctly'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })   
})

// GET CRYPTO NEWS
router.get('/news', (req, res) => {
    const { query: { site }} = req

    logic.getCryptoNews(site)
        .then(() => res.status(201).json({message: 'retrieved news correctly '}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        }) 
})





module.exports = router