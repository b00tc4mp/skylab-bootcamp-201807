require('dotenv').config()

const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const routes = require('./routes')
const mongoose = require('mongoose')

const { env: { MONGO_URL } } = process

const { PORT } = process.env

const app = express()

app.use(cors())

app.use('/api', routes)

app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))

mongoose.connect(MONGO_URL, () => console.log('DB IS CONNECTED!'))
        // .then(() => {
        //     db = mongoose.connection
        //     app.use('/api', routes(db)) 
        // })


