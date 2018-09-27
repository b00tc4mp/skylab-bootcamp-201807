require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const routes = require('./routes')
const sockets = require('./sockets')

const {env: {MONGO_URL} } = process

mongoose.connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        const { PORT } = process.env
        const app = express()

        const http = sockets.init(app)

        app.use(cors())
        app.use('/api', routes)

        http.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))
    })
    .catch(err => console.log(err))