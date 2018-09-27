require('dotenv').config()

const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const routes = require('./routes')

const { env: { MONGO_URL } } = process

const { MongoClient } = require('mongodb')

MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, conn) => {
    if (err) throw err

    const db = conn.db() // ??

    const { PORT } = process.env

    const app = express()
    
    app.use(cors())
    
    app.use('/api', routes(db))
    
    app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))
})

