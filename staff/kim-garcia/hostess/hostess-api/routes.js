require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')

const router = express.Router()

const jsonBodyParser = bodyParser.json({limit: '10mb'})

router.post('/hostess-register', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.registerHostess(email, password)
        .then(() => res.status(201).json({ message: 'hostess registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/business-register', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.registerBusiness(email, password)
        .then(() => res.status(201).json({ message: 'business registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/hostess-auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateHostess(email, password)
        .then(idH => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: idH }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'hostess authenticated', token, idH })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.post('/business-auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateBusiness(email, password)
        .then(idB => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: idB }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'business authenticated', token, idB })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

router.get('/hostess-details/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }} = req

    logic.retrieveHostess(id)
    .then(hostess => res.status(200).json({ status: 'OK', hostess }))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})

router.get('/business-details/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }} = req

    logic.retrieveBusiness(id)
    .then(business => res.status(200).json({ status: 'OK', business }))
    .catch(err => {
        const { message } = err

        res.status(err instanceof LogicError ? 400 : 500).json({ message })
    })
})

router.patch('/hostess-edit/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { password, newPassword } } = req

    logic.updatePasswordHostess(id, password, newPassword)
        .then(() => res.json({ message: 'password updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.patch('/business-edit/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { password, newPassword } } = req

    logic.updatePasswordBusiness(id, password, newPassword)
        .then(() => res.json({ message: 'password updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.patch('/hostess/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { password, name, birth, origin, phone, myself, gender, languages, jobType, photo } } = req

    logic.editHostessProfile(id, password, name, birth, origin, phone, myself, gender, languages, jobType, photo)
        .then(() => res.json({ message: 'hostess profile updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.patch('/business/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { password, name, web, boss, phone, philosophy, businessCard } } = req

    logic.editBusinessProfile(id, password, name, web, boss, phone, philosophy, businessCard)
        .then(() => res.json({ message: 'company profile updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.delete('/unregister-hostess/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { password } } = req

    logic.unregisterHostess(id, password)
        .then(() => res.json({ message: 'hostess deleted succesfully' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.delete('/unregister-business/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { password } } = req

    logic.unregisterBusiness(id, password)
        .then(() => res.json({ message: 'company deleted succesfully' }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/saveimage',jsonBodyParser, (req, res) => {
    const { body: { base64Image } } = req

    logic.saveImage(base64Image)
        .then(url => res.json({ message: 'Save image correctly', url }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/**
 * INTERNO
 */

 router.get('/:id/search', [validateJwt, jsonBodyParser], (req, res) => {
    const gender = req.query.gender
    const jobType = req.query.jobType
    const languages = req.query.languages ? req.query.languages.split('|') : undefined

    logic.searchWorkers(gender, languages, jobType)
        .then(hostesses => {
            res.status(200).json({ status: 'OK', hostesses })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


router.post('/create-event/:id', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { location, date, hours, salary, title, goal } } = req

    logic.newEvent(id, location, date, hours, salary, title, goal)
        .then(idE => {
            res.status(200).json({ status: 'OK', idE })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.post('/breafing-event/:id/:idE', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: {idE}, body: { contactName, contactPhone, briefing } } = req

    logic.makeBriefing(idE, contactName, contactPhone, briefing)
        .then(() => {
            res.status(200).json({ status: 'OK' })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.put('/send-request/:id/:idH', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id, idH } } = req

    logic.sendRequest(id, idH)
        .then(() => {
            res.status(200).json({ status: 'OK' })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.put('/accept-request/:id/:idB', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id, idB } } = req

    logic.acceptRequest(id, idB)
        .then(business => {

            res.status(200).json({ status: 'OK', business })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.put('/join-to-event/:id/:idE', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id, idE } } = req

    logic.joinToEvent(id, idE)
        .then(() => {
            res.status(200).json({ status: 'OK' })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.put('/close-event/:id/:idE/:idH', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { idE, idH } } = req

    logic.closeEvent(idE, idH)
        .then(() => {
            res.status(200).json({ status: 'OK' })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

router.put('/assist/:id/:idE', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { idE, id } } = req

    logic.iAssist(idE, id)
        .then(() => {
            res.status(200).json({ status: 'OK' })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


module.exports = router

