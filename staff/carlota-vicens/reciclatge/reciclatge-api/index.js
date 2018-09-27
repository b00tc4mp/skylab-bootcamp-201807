require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const package = require('./package.json')
var cors = require('cors')

const {
    env: { MONGO_URL,MONGO_URL_PROD,PORT },
} = process;


const userRouter = require('./routes')


mongoose.connect(MONGO_URL_PROD)
    .then(() => {
        const app = express()

        app.use(cors())
        app.use('/api', userRouter)

        app.listen(PORT || 8080, () => console.log(`${package.name} ${package.version} up and running on port 8080`))

        process.on('SIGINT', () => {
            console.log('\nstopping server');

            mongoose.connection.close(() => {
                console.log('db connection closed');

                process.exit();

            })
        })

    })