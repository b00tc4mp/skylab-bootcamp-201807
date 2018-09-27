require('dotenv').config()

const { logic, LogicError } = require('./logic')
const express = require('express')
const jwt = require('jsonwebtoken')
const verifyJwt = require('./helpers/jwt')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const router = express.Router()


/**
 * To authenticate the admin
 * Must send on the body the code and password
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'admin authenticated', admins token and id
 */
router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { code, password } } = req

    logic.authenticateAdmin(code, password)
        .then(admin => {
            const { JWT_SECRET, JWT_EXP } = process.env
            const token = jwt.sign({ sub: admin.id }, JWT_SECRET, { expiresIn: JWT_EXP })
            const id = admin.id
    
            res.json({ message: 'administrative authenticated', token, id })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To register the doctor
 * Must send on the body the code and password
 * Needs admin token
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'doctor registered correctly'
 */
router.post('/:id/register-doctor', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { code, password } } = req

    logic.registerDoctor(code, password)
        .then(() => res.status(201).json({ message: 'doctor registered correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To remove doctor
 * Needs admin token
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'doctor removed correctly'
 */
router.delete('/:id/remove-doctor', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { code } } = req

    logic.removeDoctor(code)
        .then(() => res.status(200).json({ message: 'doctor removed correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * Returns a doctor data
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} doctors data
 */
router.get('/doctor/:code', jsonBodyParser, (req, res) => {
    let { params: { code } } = req

    logic.doctorData(code)
        .then(doctor => res.json(doctor)) 
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To list all doctors
 *  
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} doctors array
 */
router.get('/doctors', jsonBodyParser, (req, res) => {
    logic.listDoctors()
        .then(doctors => res.json(doctors))
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To add patient
 * Must send on the body the name, DNI, surname, age, gender, address and phone of the patient
 * Needs admin token
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'patient added correctly', patients token and id
 */
router.post('/:id/add-patient', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { name, dni, surname, age, gender, address, phone } } = req

    logic.addPatient(name, dni, surname, age, gender, address, phone)
        .then(patient => {
            const id = patient.id

            res.status(201).json({ message: 'patient added correctly', id })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To remove patient
 * Needs admin token
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'patient removed correctly'
 */
router.delete('/:id/remove-patient', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { dni } } = req

    logic.removePatient(dni)
        .then(() => res.status(200).json({ message: 'patient removed correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To update patients address and/or phone
 * Needs admin token
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'patient data updated correctly'
 */
router.patch('/:id/update-patient', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { dni, newAddress, newPhone } } = req

    logic.updatePatient(dni, newAddress, newPhone)
        .then(() => res.status(201).json({ message: 'patient data updated correctly' }))
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
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
 * To list all patients searched by name
 * Must send on the route path the name of the patient to search
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Patients array
 */
router.get('/patients/:name', jsonBodyParser, (req, res) => {
    let { params: { name } } = req

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
 * To register the caretaker
 * Must send on the body the dni, password, name, surname, age, gender and phone
 * Needs admin token
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'caretaker registered correctly'
 */
router.post('/:id/register-caretaker', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { dni, password, name, surname, age, gender, phone } } = req

    logic.registerCaretaker(dni, password, name, surname, age, gender, phone)
        .then(() => res.status(201).json({ message: 'caretaker registered correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To remove caretaker
 * Needs admin token
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'caretaker removed correctly'
 */
router.delete('/:id/remove-caretaker', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { dni } } = req

    logic.removeCaretaker(dni)
        .then(() => res.status(200).json({ message: 'caretaker removed correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * Returns a caretaker data
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} caretakers data
 */
router.get('/caretaker/:dni', jsonBodyParser, (req, res) => {
    let { params: { dni } } = req

    dni = parseInt(dni)

    logic.caretakerData(dni)
        .then(caretaker => res.json(caretaker)) 
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To list all caretakers
 *  
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} caretakers array
 */
router.get('/caretakers', jsonBodyParser, (req, res) => {
    logic.listCaretakers()
        .then(caretakers => res.json(caretakers))
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * Assign patients to caretakers
 * Needs admin token
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'patient assigned correctly to caretaker'
 */
router.patch('/:id/assign-patients', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { caretakerDni, patientDni } } = req

    logic.assignPatientToCaretaker(caretakerDni, patientDni)
        .then(() => res.status(200).json({ message: 'patient assigned correctly to caretaker' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * Unassign patients from caretakers
 * Needs admin token
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'patient unassigned correctly to caretaker'
 */
router.patch('/:id/unassign-patients', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { caretakerDni, patientDni } } = req

    logic.unassignPatientToCaretaker(caretakerDni, patientDni)
        .then(() => res.status(200).json({ message: 'patient unassigned correctly to caretaker' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
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


module.exports = router