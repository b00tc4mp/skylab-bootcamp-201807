require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { logicUser, logicProduct, LogicError } = require('../logic')
const jwt = require('jsonwebtoken')
const validateJwt = require('../helpers/validate-jwt')
const fileUpload = require('express-fileupload')

const userRouter = express.Router()

const jsonBodyParser = bodyParser.json()


userRouter.post('/register', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logicUser.register(email, password)
        .then(() => res.status(201).json({ message: 'user registered' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

userRouter.post('/authenticate', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logicUser.authenticate(email, password)
        .then(userId => {
            const { JWT_SECRET, JWT_EXP } = process.env

            const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXP })

            res.json({ message: 'user authenticated', token, user: userId })
        })
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 401 : 500).json({ message })
        })
})

userRouter.get('/me/:user', validateJwt, (req, res) => {
    const { params: { user } } = req

    logicUser.listPrivateUser(user)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

userRouter.get('/user/:user', (req, res) => {
    const { params: { user } } = req

    logicUser.listPublicUser(user)
        .then(res.json.bind(res))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

userRouter.patch('/me/:user/password', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { user }, body: { old_password, new_password } } = req

    logicUser.updatePassword(user, old_password, new_password)
        .then(() => res.json({ message: 'user password updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

userRouter.patch('/me/:user/email', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { user }, body: { old_email, new_email } } = req

    logicUser.updateEmail(user, old_email, new_email)
        .then(() => res.json({ message: 'user email updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

userRouter.patch('/me/:user/profile', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { user }, body: { data } } = req

    logicUser.updateProfile(user, data)
        .then(() => res.json({ message: 'user profile updated' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

/*userRouter.patch('/user/:user/photo', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { user }, body: { base64Image } } = req
  
    return logicUser.updateProfilePhoto(user,base64Image)
      .then(photo => res.status(200).json({ status: 'OK',photo }))
      .catch((err) => {
        const { message } = err;
        res.status(err instanceof LogicError ? 400 : 500).json({ message });
      });
  })*/

userRouter.patch('/me/:user/photo', [validateJwt, fileUpload()], (req, res) => {
    const { params: { user }, files } = req

    if (files && files.image) {
        const { image: { name, data } } = files
    
        logicUser.updateProfilePhoto(user, name, data)
            .then(() => res.status(200).json({ message: 'photo uploaded' }))
            .catch((err) => {
                const { message } = err
                res.status(err instanceof LogicError ? 400 : 500).json({ message })
            })
    } else {
        res.status(418).json({ message: 'no image received' })
    }
})

userRouter.post('/unregister', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logicUser.unregister(email, password)
        .then(() => res.status(201).json({ message: 'user unregister' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

userRouter.post('/me/:user/review', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { user }, body: { userTo, score, idProd, description } } = req

    logicUser.addReview(user, userTo, score, idProd, description)
        .then(() => res.json({ message: 'review added' }))
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

userRouter.patch('/me/:user/prod/:prod/favs', [validateJwt, jsonBodyParser], (req, res) => {
    const { params: { user, prod } } = req
debugger;
    logicUser.addFavourite(user, prod)
        .then(() => logicProduct.incrementFavs(user, prod))
        .then(() => {
            debugger;
            return res.json({ message: 'product added as favourites', user, product: prod })})
        .catch(err => {
            const { message } = err

            res.status(err instanceof LogicError ? 400 : 500).json({ message })
        })
})

module.exports = userRouter