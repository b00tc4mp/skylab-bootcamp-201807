require('dotenv').config()

const { logic, LogicError } = require('./logic')
const express = require('express')
const jwt = require('jsonwebtoken')
const verifyJwt = require('./helpers/jwt')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const router = express.Router()


router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { code, password } } = req

    logic.registerDoctor(code, password)
        .then(() => res.status(201).json({ message: 'doctor registered correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

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

router.post('/add-patient', jsonBodyParser, (req, res) => {
    const { body: { name, dni, surname, age, gender, address, phone } } = req

    logic.addPatient(name, dni, surname, age, gender, address, phone)
        .then(patient => {
            const { JWT_SECRET, JWT_EXP } = process.env
            const token = jwt.sign({ sub: patient.id }, JWT_SECRET, { expiresIn: JWT_EXP })
            const id = patient.id

            res.status(201).json({ message: 'patient added correctly', token, id })
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.delete('/remove-patient/:id', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { dni } } = req

    logic.removePatient(id, dni)
        .then(() => res.status(201).json({ message: 'patient deleted correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.patch('/update-patient/:id', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { dni, newAddress, newPhone } } = req

    logic.updatePatient(id, dni, newAddress, newPhone)
        .then(() => res.json({ message: 'patient data updated correctly' }))
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})

router.get('/patients/:name', jsonBodyParser, (req, res) => {
    const { params: { name } } = req

    logic.searchPatients(name)
        .then(patients => res.json(patients)) 
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})

router.patch('/patient/:id/add-treatment', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { dni, pill, quantity, frequency } } = req

    logic.addTreatment(id, dni, pill, quantity, frequency)
        .then(() => {
            res.status(201).json({ message: 'treatment added correctly'})
        })
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.delete('/patient/:id/remove-treatment', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { dni, pill } } = req

    logic.removeTreatment(id, dni, pill)
        .then(() => res.status(201).json({ message: 'treatment deleted correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.get('/patient/:id/treatments', jsonBodyParser, (req, res) => {
    const { params: { id } } = req

    logic.listTreatments(id)
        .then(treatments => res.json(treatments)) 
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})

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

router.delete('/remove-cite', jsonBodyParser, (req, res) => {
    const { body: { code, dni, name, date } } = req

    let citeDate = new Date(date)

    logic.removeCite(code, dni, name, citeDate)
        .then(() => res.status(201).json({ message: 'cite removed correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.get('/cites/:date', jsonBodyParser, (req, res) => {
    const { params: { date } } = req

    let citeDate = new Date(date)

    logic.listCites(citeDate)
        .then(cites => res.json(cites)) 
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})

router.get('/patient/:id/cites/:date', jsonBodyParser, (req, res) => {
    const { params: { id, date } } = req

    let citeDate = new Date(date)
    
    logic.listPatientCites(id, citeDate)
        .then(cites => res.json(cites)) 
        .catch(err => {
            const {message} = err
            res.status(400 || 500).json({message})
        })
})


module.exports = router