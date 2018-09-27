require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const {logic,SuperError}  = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

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

        res.status(err instanceof SuperError ? 400 : 500).json({ message })
    })

})


// Login user

router.post('/login', jsonBodyParser, (req, res) => {
    const { body: { usermail, password} } = req
    
    logic.login(usermail, password)
        .then(() => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: usermail }, JWT_SECRET, { expiresIn: JWT_EXP})
        
            res.json({ message: 'user authenticated', token })
        })
        .catch(err => {
            debugger
            const { message } = err

            res.status(err instanceof SuperError ? 401 : 500).json({ message })
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

            res.status(err instanceof FatalError ? 400 : 500).json({ message })
        })
})
*/

//NOTES ROUTES//

// Add notes

router.post('/user/:usermail/notes', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { usermail }, body: { title, content, date }} = req
    
    logic.addNote(usermail,title,content,date)
        .then(() => res.json({ message: 'Note added correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof SuperError ? 400 : 500).json({ message })
        })
})

// Delete notes

router.delete('/user/:usermail/notes/:id', validateJwt, (req, res) => {
    const{ params: { usermail, id }} = req

    logic.deleteNote(usermail,id)
        .then(() => res.json({ message: 'Note deleted correctly'}))
        .catch(err => {
            const { message } = err
            res.status(err instanceof SuperError ? 400 : 500).json({ message })
        })
})

// Edit Notes

router.put('/user/:id/notes/', (req, res) => {

    //logic.updateNote(email, id, newTitle, newContent)

})

// List notes

router.get('/user/:id/notes', validateJwt, (req, res) =>{
    const { params: { usermail } } = req

    logic.listNotes(email)
    .then(res.json.bind(res))
    .catch(err => {
        const { message } = err

        res.status(err instanceof SuperError ? 400 : 500).json({ message })
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

router.delete('/user/:usermail/contacts/:id',validateJwt, (req, res) => {
    const { params: { usermail, id }} = req
    logic.deleteContact(usermail,id)
    .then(() => res.json({ message: 'Contact deleted correctly'}))
    .catch(err => {
        const { message } = err

        res.status(err instanceof SuperError ? 400 : 500).json({ message })
    })

})

// Edit contacts

router.put('/user/:usermail/contacts/:id',[validateJwt, jsonBodyParser], (req, res) => {
    debugger
    const {params : {id,usermail}, body: { name, surname, phone, contactmail, address }} = req
    logic.updateContact(usermail, id, name, surname, phone, contactmail, address)
        .then(() => res.json({message: "Contact updated successfully!"}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof SuperError ? 418 : 500).json({ message })
        })

})

// List contacts

router.get('/user/:usermail/contacts', validateJwt, (req, res) =>{
    const { params: { usermail }} = req
    logic.listContacts(usermail)
        // .then(res.json.bind(res))
        .then(contacts => res.json({data:contacts}))
        .catch(err => {
            const { message } = err
            res.status(err instanceof SuperError ? 429 : 500).json({ message })
        })
})

module.exports = function (db) {
    logic._users = db.collection('users')

    return router
}