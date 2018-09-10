require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./utils/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json()


//@route    POST api/register
//@desc     Register User
//@access   Public



router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, password, name } } = req

    logic.register( email, password, name )
        .then(() => res.status(201).json({ message: 'user registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//@route    POST api/authenticate
//@desc     Authenticate User
//@access   Public



router.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body : { email, password } } = req

    logic.authenticate( email , password )
        .then(id => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: JWT_EXP})

            res.json({ message: 'user authenticated', token, id})
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })

})


//@route    POST api/unregister
//@desc     Unregister User
//@access   Private

router.delete('/unregister/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { body: { email, password } } = req

    logic.unregisterUser(email, password)
        .then(() => res.json({ message: 'user unregistered'}))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


//@route    POST api/update
//@desc     Update User Password
//@access   Private-Token


router.post('/user/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { /*params: { id },*/ body: { email, password, newPassword, id } } = req

    logic.updatePassword(email, password, newPassword)
        .then(() => res.json({ message: 'user updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


//@route    POST api/:id/notebook
//@desc     Create notebook
//@access   Private-Token

router.post('/:id/notebook', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: {notebooktitle, videourl} } = req
    let notebookdId
    logic.createNotebook( id, notebooktitle, videourl)
        
        .then(res => {
            notebookdId = res._id
        })
        .then(() =>res.json({ message: 'Notebook created correctly', notebookdId}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({message})
        })
})


//@@    GET api/:id/notebooks
//@@    List all user notebooks
//@@    Private-Token


router.get('/:id/notebooks', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: {id} } = req

    logic.listNotebooks(id)
        
        .then(notebooks => res.json(notebooks))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message})
        })
})

//@@    GET api/:id/notebooks/:notebookid
//@@    List notebook by id
//@@    Public-Share

router.get('/:id/notebooks/:notebookid', jsonBodyParser, (req, res) => {
    const { params: {id, notebookid} } = req

    logic.listNotebooksByNotebookId(id, notebookid)

        .then(notebook => res.json(notebook))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})


//@@    GET api/:id/notebooks/:notebookid/update/:sessionuserid
//@@    Update notebook
//@@    Private-Token
//€€
router.patch('/:id/notebooks/:notebookid/update/:sessionuserid', [validateJwt, jsonBodyParser], (req, res) => {
    const {params: { id, notebookid, sessionuserid}, body : {newnotebooktitle}} = req

    logic.updateNotebook(id, sessionuserid, notebookid, newnotebooktitle)

        .then(() => logic.listNotebooksByNotebookId(id, notebookid))
        .then(updatednotebook => res.json(updatednotebook))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

//@@    DELETE api/:id/notebooks/:notebookid/delete/:sessionuserid
//@@    Delete notebook
//@@    Private-Token
//€€
router.delete('/:id/notebooks/:notebookid/delete/:sessionuserid', [validateJwt, jsonBodyParser], (req, res) => {
    const {params: { id, sessionuserid, notebookid} } = req

    logic.removeNotebook( id, sessionuserid, notebookid)
        .then(() => res.json({ message: 'Notebook removed correctly' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})


//@@    POST api/:id/note
//@@    Create note
//@@    Private-Token

router.post('/:id/:notebook/note', [validateJwt, jsonBodyParser] , (req, res) => {
    const {params: {id, notebook }, body: { seconds, notetitle, notetext }} = req
    let noteId
    logic.createNote(seconds, notetitle, notetext, notebook, id)
        .then(res=> {
            noteId = res.id
        })
        .then(() => res.json({ message: 'Note created correctly', noteId}))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})


//@@    GET api/:id/notes
//@@    List notes by user id
//@@    Private-Token

router.get('/:id/notes', [validateJwt] , (req, res) => {
    const {params: {id} } = req

    logic.listNotesbyUser(id)
        .then(notes => res.json( notes ))
        .catch(err => {
            const { message } = err
        
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

//@@    GET api/:id/:notebookdid/notes
//@@    List notes by notebook id
//@@    Public/Share

router.get('/:id/:notebookid/notes', jsonBodyParser , (req, res) => {
    const {params: {id, notebookid} } = req

    logic.listNotebyNotebookId(notebookid)
        .then(notes => res.json( notes ))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })

        })
})

//@@    GET api/:id/note/:noteid
//@@    List note by note id
//@@    Public-Share

router.get('/:id/note/:noteid', jsonBodyParser, (req, res) => {
    const {params: {id, noteid} } = req

    logic.listNotesbyNoteId(noteid)
        .then(note => res.json(note))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

//@@    DELETE api/:id/removenote/:noteid/:sessionUserId
//@@    Remove note by noteid
//@@    Private-Token
//€€
router.delete('/:id/removenote/:noteid/:sessionuserid', [validateJwt, jsonBodyParser] , (req, res) => {
    const {params: { id, sessionuserid, noteid} } = req

    logic.removeNote(id, sessionuserid, noteid)
        .then(() => res.json({ message: 'Note removed succesfully' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

///////////////////////////////////////////////////////////

//@@    DELETE api/:id/removenotebooksnotes/:notebookid/:sessionUserId
//@@    Remove all notes in a notebook by notebookid
//@@    Private-Token
//€€
router.delete('/:id/removenotebooksnotes/:notebookid/:sessionuserid', [validateJwt, jsonBodyParser] , (req, res) => {
    const {params: { id, sessionuserid, notebookid} } = req

    logic.removeNotebooksNotes(id, sessionuserid, notebookid)
        .then(() => res.json({ message: 'Notes from Notebook removed succesfully' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

///////////////////////////////////////////////////////////

//@@    UPDATE api/:id/updatenote/:noteid/:sessionuserid
//@@    Remove note
//@@    Private-Token
//€€
router.patch('/:id/updatenote/:noteid/:sessionuserid', [validateJwt, jsonBodyParser], (req, res) => {
    const {params: { id, sessionuserid, noteid}, body:{ newnotetitle, newnotetext} } = req

    logic.updateNote(id, sessionuserid, noteid, newnotetitle, newnotetext)
        .then(updatednote => res.json(updatednote))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})





module.exports = router
