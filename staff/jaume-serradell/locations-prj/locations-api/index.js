require('dotenv').config()

const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const routes = require('./routes')
const mongoose = require('mongoose')

const { env: { MONGO_URL } } = process

const { PORT } = process.env

const app = express()

mongoose.connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        app.use(cors())

        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))

        process.on('SIGINT', () => {
            console.log('\n stoping server');
            process.exit();
        })
    })
    .catch(err => {
        console.error('App started error:', err.stack);
        process.exit();
    })