require('dotenv').config()  

const express = require('express')  
const bodyParser = require('body-parser')   

const {logic, logicError} = require('./logic')    

const userRouter = express.Router() 

const jsonBodyParser = bodyParser.json({ limit: '10mb' })   

userRouter.post('/register', jsonBodyParser, (req, res) => {
    const {
        email, password,
    } = req.body    

    logic.register(email, password)
        .then(() => {
            res.status(201).json({ status: 'OK' })  
        })
        .catch((err) => {
            const { message } = err 
            res.status(500).json({ message })   
        })  
})


userRouter.post('/login', jsonBodyParser, (req,res) => {
    const {
        email, password,
    } =req.body
    
    logic.login(email, password)
    .then (() => {
        res.status(200).json({status: 'OK'})
    })
    .catch((err) => {
        const {message}= err
        res.status(500).json({message})
    })
})


userRouter.patch('/update/:email', jsonBodyParser, (req,res) => {
    const {
        email, password, newPassword
    } =req.body
    
    logic.update(email, password, newPassword)
    .then (() => {
        res.status(200).json({status: 'OK'})
    })
    .catch((err) => {
        const {message}= err
        res.status(500).json({message})
    })
})

module.exports = userRouter