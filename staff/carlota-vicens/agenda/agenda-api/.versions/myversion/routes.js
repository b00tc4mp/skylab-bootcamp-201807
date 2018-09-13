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
        .then((id) => {
            
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: id.toString() }, JWT_SECRET, { expiresIn: JWT_EXP})
        
            res.json({ message: 'user authenticated', token,id })
        })
        .catch(err => {
            
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

router.post('/user/:userID/notes', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { userID }, body: { title, content, date }} = req
    
    logic.addNote(userID,title,content,date)
        .then((data) => res.json({ message: 'Note added correctly', data }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof SuperError ? 400 : 500).json({ message })
        })
})

// Delete notes

router.delete('/user/:userID/notes/:noteId', validateJwt, (req, res) => {
    const{ params: { userID, noteId }} = req

    logic.deleteNote(userID,noteId)
        .then(() => res.json({ message: 'Note deleted correctly'}))
        .catch(err => {
            const { message } = err
            res.status(err instanceof SuperError ? 400 : 500).json({ message })
        })
})

// Edit Notes

router.put('/user/:userID/notes/:noteId', [validateJwt, jsonBodyParser], (req, res) => {

    const {params : {userID,noteId}, body: { title,content,date }} = req
    logic.updateNote(userID,noteId,title,content,date)
        .then(() => res.json({message: "Note updated successfully!",id:noteId}))
        .catch(err => {
            const { message } = err
            
            res.status(err instanceof SuperError ? 418 : 500).json({ message })
        })

})

// List notes

router.get('/user/:userID/notes', validateJwt, (req, res) =>{
    const { params: { userID } } = req

    return logic.listNotes(userID)
    .then(notes => {
        return res.json({notes})
    })
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
    .then((id)=> res.json({ message : 'Contact added correctly',id}))
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
        .then(contacts => res.json({contacts}))
        .catch(err => {
            const { message } = err
            res.status(err instanceof SuperError ? 429 : 500).json({ message })
        })
})

module.exports = function (db) {
    logic._users = db.collection('users')
    logic._notes = db.collection('notes')


    return router
}