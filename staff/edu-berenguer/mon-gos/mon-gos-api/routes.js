require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logic, LogicError } = require('./logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('./helpers/validate-jwt')
const router = express.Router()
const jsonBodyParser = bodyParser.json({limit: '10mb'});


//USER ROUTES//

// Register User

router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, name, address, phone, password, latitude, longitude } } = req

    logic.register(email, name, address, phone, password, latitude, longitude)
        .then(() => res.status(201).json({ message: 'Shelter registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })

})

//LOGIN

router.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticate(email, password)
        .then(id => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'Shelter authenticated', token, id })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})


//ADD PHOTO CLOUDINARY
router.patch('/upload', jsonBodyParser, (req, res) => {
    const {
      body: { base64Image },
    } = req;
  
    return logic._saveImage(base64Image)
      .then(photo => res.status(200).json({ status: 'OK', photo }))
      .catch((err) => {
        const { message } = err;
        res.status(err instanceof LogicError ? 400 : 500).json({ message });
      });
  }); 


//ADD DOG

router.post('/shelter/:id/dog', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id }, body: { name, gender, age, weight, photo, description } } = req

    logic.insertDog(id, name, gender, age, weight, photo, description)
        .then(id => res.json({ message: 'Dog added correctly' , id}))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//DOG ADOPTED

router.put('/shelter/:id/dog/:dogId', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id, dogId } } = req
    logic.dogAdopted(id, dogId)
        .then(() => res.json({ message: "Dog adopted!", dogId }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 418 : 500).json({ message })
        })
})

//DOG NOT ADOPTED

router.put('/shelter/:id/dogNotAdopted/:dogId', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id, dogId } } = req
    logic.dogNotAdopted(id, dogId)
        .then(() => res.json({ message: "Dog not adopted", dogId }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 418 : 500).json({ message })
        })
})

//LIST DOGS NOT ADOPTEDS

router.get('/listNotAdopteds', (req, res) => {
    logic.listDogsNotAdopteds()
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//LIST DOGS ADOPTEDS

router.get('/listAdopteds', (req, res) => {
    logic.listDogsAdopteds()
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//LIST DOGS BY SHELTER

router.get('/listDogsByShelter/:id', [validateJwt], (req, res) => {
    const { params: { id } } = req
    logic.listDogsByShelter(id)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//RETRIEVE DOG BY ID

router.get('/retrieveDog/:dogId', (req, res) => {
    const { params: { dogId } } = req
    logic.retrieveDog(dogId)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//RETRIEVE SHELTER BY EMAIL

router.get('/retrieveShelter/:id', (req, res) => {
    const { params: { id } } = req
    logic.retrieveShelter(id)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//REMOVE DOG BY ID

router.delete('/remove/:id/dog/:dogId', [validateJwt], (req, res) => {
    const { params: { id, dogId } } = req
    logic.removeDog(id, dogId)
        .then(() => res.status(201).json({ message: 'Dog removed' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//UPDATE DOG BY ID

router.put('/update/shelter/:id/dog/:dogId', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { id, dogId }, body: { newName, newGender, newAge, newWeight, newPhoto, newDescription } } = req
    logic.updateDog(id, dogId, newName, newGender, newAge, newWeight, newPhoto, newDescription)
        .then(() => res.json({ message: 'Dog updated succesfully', dogId }))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

//LIST DOG BY QUERY

router.get('/listByQuery', (req, res) => {
    const { gender, age, weight } = req.query

    return logic.listDogsByQuery(gender, age, weight)
        .then((data) => res.json(data))
        .catch(err => {
            const { message } = err
            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})


module.exports = router
