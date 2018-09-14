const express = require('express')
const cors = require('cors')
const userRouter = require('./routes.js')
require('dotenv').config()  

const {PORT} = process.env 

const app = express()
app.use(cors())
app.use('/api', userRouter)


app.listen(PORT || 5000, () => console.log("UP"))