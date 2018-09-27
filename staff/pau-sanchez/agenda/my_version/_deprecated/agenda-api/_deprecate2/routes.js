require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')
const emailValidate = require ('../utils/validate-mail/index')

const router = express.Router()

const jsonBodyParser = bodyParser.json()


//USER ROUTES//

// Register User

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { usermail, password } } = req
    
    logic.register(usermail, password)
    .then(() => res.status(201).json({ message: 'user registered'}))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })

})


// Login user

router.post('/login', jsonBodyParser, (req, res) => {
    const { body: { usermail, password} } = req
    
    logic.login(usermail, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = porcess.env

            const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: JWT_EXP})
        
            res.json({ message: 'user authenticated', token })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})
/*
// Update profile password

router.patch('/user/id:/profile', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { usermail }, body: { password, newPassword} } = req

    logic.updatePassword(usermail, password, newPassword)
        .then(() => res.json({ message: 'user updated'}))
        .catch(err => {
            const { mesage } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})
*/

//NOTES ROUTES//

// Add notes

router.post('/user/:id/notes', validateJwt, (req, res) => {
    
    //logic.addNote(email,title,content)
})

// Delete notes

router.delete('/user/:id/notes/:id', (req, res) => {

    //logic.deleteNote(email,id)

})

// Edit Notes

router.put('/user/:id/notes/', (req, res) => {

    //logic.updateNote(email, name, address, email)

})

// List notes

router.get('/user/:id/notes', validateJwt, (req, res) =>{
    const { params: { usermail } } = req

    logic.listNotes(usermail)
    .then(res.json.bind(res))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})


//CONTACTS ROUTES//

// Add contacts

router.post('/user/:usermail/contacts', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { usermail }, body: { name, surname, phone, contactmail, address }} = req

    logic.addContact(usermail, name, surname, phone, contactmail, address)
    .then(()=> res.json({ message : 'Contact added correctly'}))
    .catch(err => {
        const { message } = err

        res.status(err instanceof SuperError ? 400 : 500).json({ message })
    })
    
})

// Delete contacts

router.delete('/user/:id/contacts/:id', (req, res) => {
    const { params: {usermail, id }} = req
    logic.deleteContact(usermail, id)
        .then(() => res.json({ message: 'Contact deleted correctly'}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof SuperError ? 400 : 500).json({ message })
        })  

/*http://localhost:8080/api/user/pepe@gmail/contacts/ID*/
    
})

// Edit contacts

router.put('/user/:usermail/contacts/', (req, res) => {


    //logic.updateContact(usermail, contactId, name, surname, phone, contactmail, address)

})

// List contacts

router.get('/user/:usermail/contacts', validateJwt, (req, res) =>{

    
    logic.listContacts(usermail)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof SuperError ? 400 : 500).json({ message })
        })

})
 







