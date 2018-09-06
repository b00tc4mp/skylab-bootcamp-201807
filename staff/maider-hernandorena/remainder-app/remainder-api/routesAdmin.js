require('dotenv').config()

const { logic, LogicError } = require('./logic')
const express = require('express')
const jwt = require('jsonwebtoken')
const verifyJwt = require('./helpers/jwt')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const router = express.Router()

//AUTH ADMIN

//REMOVE DOCTOR

/**
 * To remove patient
 * Must send on the body the dni of the patient and on the route path the id of the patient
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'patient removed correctly'
 */
router.delete('/remove-patient/:id', jsonBodyParser, (req, res) => {
    const { params: { id }, body: { dni } } = req

    logic.removePatient(id, dni)
        .then(() => res.status(200).json({ message: 'patient removed correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * To update patients address and/or phone
 * Must send on the body the dni, new address and new phone of the patient and on the route path the id of the patient
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'patient data updated correctly'
 */
router.patch('/update-patient/:id', jsonBodyParser, (req, res) => {
    const { params: { id }, body: { dni, newAddress, newPhone } } = req

    logic.updatePatient(id, dni, newAddress, newPhone)
        .then(() => res.status(201).json({ message: 'patient data updated correctly' }))
        .catch(err => {
            const { message } = err
            res.status(400 || 500).json({ message })
        })
})

/**
 * To remove caretaker
 * Must send on the body the password
 * 
 * @throws {LogicError} Message of status
 * 
 * @returns {Response} Message 'caretaker removed correctly'
 */
router.delete('/unregister/:email', [verifyJwt, jsonBodyParser], (req, res) => {
    const { params: { email }, body: { password } } = req

    logic.removeCaretaker(email, password)
        .then(() => res.status(200).json({ message: 'caretaker removed correctly' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


//ASSIGN

module.exports = router