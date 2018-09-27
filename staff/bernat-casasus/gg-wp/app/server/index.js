require('dotenv').config()

const express = require('express')
const cors = require('cors')
const package = require('./package.json')
// const routes = require('./routes')
const { user, game } = require('./routes/index')

const { env: { MONGO_URL } } = process

//MONGOSE
const mongoose = require('mongoose')

mongoose.connect(MONGO_URL, { useNewUrlParser: true })
.then(() => {
    const { env: { PORT } } = process
    const app = express()

    app.use(cors())
    app.use('/api', [user(),game()])
    app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))

})
.catch(err => console.log(err))