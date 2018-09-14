require('dotenv').config()

const { logic, LogicError } = require('./logic')
const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const router = express.Router()


/**
 * To authenticate the doctor
 * Must send on the body the code and password
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'doctor authenticated', doctors token and id
 */
router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { code, password } } = req

    logic.authenticateDoctor(code, password)
        .then(doctor => {
            const { JWT_SECRET, JWT_EXP } = process.env
            const token = jwt.sign({ sub: doctor.id }, JWT_SECRET, { expiresIn: JWT_EXP })
            const id = doctor.id
    
            res.json({ message: 'doctor authenticated', token, id })
        })
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
 * @returns {Response} Patients array
 */
router.get('/patient/:dni', jsonBodyParser, (req, res) => {
    let { params: { dni } } = req

    dni = parseInt(dni)

    logic.patientData(dni)
        .then(patients => res.json(patients)) 
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To list all patients searched by name
 * Must send on the route path the name of the patient to search
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Patients array
 */
router.get('/patients/:name', jsonBodyParser, (req, res) => {
    const { params: { name } } = req

    logic.searchPatients(name)
        .then(patients => res.json(patients)) 
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To list all patients
 *  
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Patients array
 */
router.get('/patients', jsonBodyParser, (req, res) => {
    logic.listPatients()
        .then(patients => res.json(patients))
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To add treatment to a patient
 * Must send on the body the dni of the patient, the pill name, quantity and frequency of the treatment and on the route path the id of the patient
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'treatment added correctly'
 */
router.patch('/patient/:id/add-treatment', jsonBodyParser, (req, res) => {
    const { params: { id }, body: { dni, pill, quantity, frequency } } = req

    logic.addTreatment(id, dni, pill, quantity, frequency)
        .then(() => res.status(201).json({ message: 'treatment added correctly'}))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To remove a patient treatment
 * Must send on the body the dni of the patient and the pill name of the treatment and on the route path the id of the patient
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'treatment removed correctly'
 */
router.delete('/patient/:id/remove-treatment', jsonBodyParser, (req, res) => {
    const { params: { id }, body: { dni, pill } } = req

    logic.removeTreatment(id, dni, pill)
        .then(() => res.status(200).json({ message: 'treatment removed correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To list a patient treatments
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
 * To add cite to a patient
 * Must send on the body the doctors code, the dni of the patient and the cite name and date
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'cite added correctly'
 */
router.post('/add-cite', jsonBodyParser, (req, res) => {
    const { body: { code, dni, name, date } } = req

    let citeDate = new Date(date)

    logic.addCite(code, dni, name, citeDate)
        .then(cite => res.status(201).json({ message: 'cite added correctly', cite }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To remove cite to a patient
 * Must send on the body the doctors code, the dni of the patient and the cite name and date
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'cite removed correctly'
 */
router.delete('/remove-cite', jsonBodyParser, (req, res) => {
    const { body: { code, dni, name, date } } = req

    let citeDate = new Date(date)

    logic.removeCite(code, dni, name, citeDate)
        .then(() => res.status(200).json({ message: 'cite removed correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To list all cites on a day. Then the doctor could see his/her cites on that day
 * Must send on the route path the date (day) => example: 2018-08-22
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Cites array
 */
router.get('/cites/:date', jsonBodyParser, (req, res) => {
    const { params: { date } } = req

    let citeDate = new Date(date)

    logic.listCites(citeDate)
        .then(cites => res.json(cites)) 
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To list all cites a patient has on a month
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