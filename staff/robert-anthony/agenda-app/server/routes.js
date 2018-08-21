require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const {logic, LogicError} = require('./logic')
const {notesLogic} = require('./logic/notes')
const jwt = require('jsonwebtoken')
const router = express.Router()
const validateJwt = require('./helpers/validate-jwt')


const jsonBodyParser = bodyParser.json()

router.post('/register', jsonBodyParser, (req, res) => {
  const {body: {username, password}} = req

  logic.register(username, password)
    .then(() => res.status(201).json({message: 'user registered'}))
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

router.post('/authenticate', jsonBodyParser, (req, res) => {
  const {body: {username, password}} = req

  logic.authenticate(username, password)
    .then(() => {
      const {JWT_SECRET, JWT_EXP} = process.env

      const token = jwt.sign({sub: username}, JWT_SECRET, {expiresIn: JWT_EXP})

      res.json({message: 'user authenticated', token})
    })
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 401 : 500).json({message})
    })
})

/*  update password */
router.patch('/user/:username', [validateJwt, jsonBodyParser], (req, res) => {

  const {params: {username}, body: {password, newPassword}} = req

  logic.updatePassword(username, password, newPassword)
    .then(() => res.json({message: 'user updated'}))
    .catch(err => {
      const {message} = err

      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/*  add contact */
router.post('/user/:username/contact', [validateJwt, jsonBodyParser], (req, res) => {
  const {params: {username}, body: {contact}} = req
  logic.addContact(username, contact)
    .then(() => res.json({message: 'contact added'}))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/*  add note */
router.post('/user/:username/note', [validateJwt, jsonBodyParser], (req, res) => {
    const {params: {username},body:{note}} = req
      logic.addNote(username, note)
    .then(() => res.json({message: 'note added'}))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})
/*
/!*  get contact by id *!/
router.post('/user/:username/contact/:id', [validateJwt, jsonBodyParser], (req, res) => {
  const {params: {username,id}} = req
  logic.getContactByID(username, id)
    .then(contact => res.json(contact))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/!*  get note by id *!/
router.post('/user/:username/note/:id', [validateJwt, jsonBodyParser], (req, res) => {
  const {params: {username,id}} = req
  logic.getNoteByID(username, id)
    .then(note => res.json(note))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})*/

/*  update note */
router.patch('/user/:username/note', [validateJwt, jsonBodyParser], (req, res) => {
    const {params: {username},body:{note}} = req
  logic.updateNote(username, note)
    .then(note => res.json(note))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/*  delete note */
router.delete('/user/:username/note', [validateJwt, jsonBodyParser], (req, res) => {
    const {params: {username},body:{note}} = req
  logic.deleteNote(username, note)
    .then(result => res.json(result))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/*  update contact */
router.patch('/user/:username/contact', [validateJwt, jsonBodyParser], (req, res) => {
    const {params: {username},body:{contact}} = req
  logic.updateContact(username, contact)
    .then(contact => res.json(contact))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/*  get all contacts */
router.get('/user/:username/contacts', [validateJwt, jsonBodyParser], (req, res) => {
    const {params: {username}} = req
  logic.getAllContacts(username)
    .then(contacts => res.json(contacts))
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})

/*  get all notes */
router.post('/user/:username/notes', [validateJwt, jsonBodyParser], (req, res) => {
    const {params: {username},body:{date}} = req
  logic.getAllNotes(username,date)
    .then(notes => {
      return res.json(notes)
    })
    .catch(err => {
      const {message} = err
      res.status(err instanceof LogicError ? 400 : 500).json({message})
    })
})



module.exports = function (db) {
  logic._users = db.collection('users')
  notesLogic._notes = db.collection('notes')

  return router
}