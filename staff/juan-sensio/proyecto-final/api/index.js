const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const routes = require('./routes')
const mongoose = require('mongoose')

const { env: { MONGO_URL } } = process

mongoose.connect(MONGO_URL, { useNewUrlParser: true }, (err, conn) => {
    if (err) throw err

    const { PORT } = process.env

    const app = express()

    app.use(cors())

    app.use('/api', routes)

    app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))
})
