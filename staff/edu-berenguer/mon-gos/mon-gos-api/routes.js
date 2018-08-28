require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()


//USER ROUTES//

// Register User

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, name, adress, phone, password, latitude, longitude } } = req

    logic.register(email, name, adress, phone, password, latitude, longitude)
        .then(() => res.status(201).json({ message: 'Shelter registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})

//LOGIN

router.post('/login', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'Shelter authenticated', token })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

//ADD DOG

router.post('/shelter/:email/dog', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { name, gender, age, weight, photo, description } } = req

    logic.insertDog(email, name, gender, age, weight, photo, description)
        .then(() => res.json({ message: 'Dog added correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//DOG ADOPTED

router.put('/shelter/:email/dog/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email, id } } = req
    logic.dogAdopted(email, id)
        .then(() => res.json({ message: "Dog adoted!", id }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 418 : 500).json({ message })
        })
})

//LIST DOGS NOT ADOPTEDS

router.get('/listNotAdopteds', (req, res) => {
    logic.listDogsNotAdopteds()
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//LIST DOGS ADOPTEDS

router.get('/listAdopteds', (req, res) => {
    logic.listDogsAdopteds()
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//LIST DOGS BY SHELTER

router.get('/listDogsByShelter/:email', (req, res) => {
    const { params: { email } } = req
    logic.listDogsByShelter(email)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//RETRIEVE DOG BY ID

router.get('/retrieveDogById/:email/dog/:id', (req, res) => {
    const { params: { email, id } } = req
    logic.retrieveDog(email, id)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//REMOVE DOG BY ID

router.delete('/remove/:email/dog/:id', (req, res) => {
    const { params: { email, id } } = req
    logic.removeDog(email, id)
        .then(() => res.status(201).json({ message: 'Dog removed' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//UPDATE DOG BY ID

router.put('/update/shelter/:email/dog/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { email, id }, body: { newName, newGender, newAge, newWeight, newPhoto, newDescription } } = req
    logic.updateDog(email, id, newName, newGender, newAge, newWeight, newPhoto, newDescription)
        .then(() => res.json({ message: 'Dog updated succesfully', id }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//LIST DOG BY QUERY

router.get('/listByQuery', (req, res) => {
    const { gender, age, weight } = req.query

    return logic.listDogsByQuery(gender, age, weight)
        .then((data) => res.json(data))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


module.exports = router
