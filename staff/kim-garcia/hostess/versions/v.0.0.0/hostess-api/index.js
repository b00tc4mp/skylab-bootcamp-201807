require('dotenv').config()

const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const router = require('./routes.js')
const mongoose = require('mongoose')

const { env: { MONGO_URL } } = process


mongoose.connect(MONGO_URL, { useNewUrlParser: true })
.then(() => {
    const { PORT } = process.env

    const app = express()

    app.use(cors())

    app.use('/api', router)

    app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))
})
.then(console.log('mongo db connected'))
.catch(console.error)



