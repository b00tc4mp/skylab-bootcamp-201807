require('dotenv').config()

const { logic, LogicError } = require('./logic')
const express = require('express')
const jwt = require('jsonwebtoken')
const verifyJwt = require('./helpers/jwt')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const router = express.Router()


/**
 * To authenticate the caretaker
 * Must send on the body the dni and password
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'caretaker authenticated', caretakers token and id
 */
router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { dni, password } } = req

    logic.authenticateCaretaker(dni, password)
        .then(caretaker => {
            const { JWT_SECRET, JWT_EXP } = process.env
            const token = jwt.sign({ sub: caretaker._id }, JWT_SECRET, { expiresIn: JWT_EXP })
            const id = caretaker._id
    
            res.status(200).json({ message: 'caretaker authenticated', token, id })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To update caretakers password
 * Must send on the body the old and new password
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'caretakers password updated correctly'
 */
router.patch('/update/:id', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { dni, password, newPassword } } = req

    logic.updateCaretakerPassword(dni, password, newPassword)
        .then(() => res.status(201).json({ message: 'caretakers password updated correctly' }))
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To return the patient the caretaker has
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Patient data
 */
router.get('/:dni/patients', jsonBodyParser, (req, res) => {
    let { params: { dni } } = req
    
    dni = parseInt(dni)

    logic.retrieveCaretakerPatients(dni)
        .then(patients => res.json(patients))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * Returns a patient data
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Patients data
 */
router.get('/patient/:dni', jsonBodyParser, (req, res) => {
    let { params: { dni } } = req

    dni = parseInt(dni)

    logic.patientData(dni)
        .then(patient => res.json(patient)) 
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To list the patient treatments
 * Must send on the route path the id of the patient
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Treatments array
 */
router.get('/patient/:id/treatments', jsonBodyParser, (req, res) => {
    const { params: { id } } = req

    logic.listTreatments(id)
        .then(treatments => res.json(treatments)) 
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To list all cites the patient has on a month
 * Must send on the route path the patient id and the date (month) => example: 2018-08
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Cites array
 */
router.get('/patient/:id/cites/:date', jsonBodyParser, (req, res) => {
    const { params: { id, date } } = req

    let citeDate = new Date(date)
    
    logic.listPatientCites(id, citeDate)
        .then(cites => res.json(cites)) 
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})


module.exports = router