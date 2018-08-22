require('dotenv').config()

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const package = require('./package.json')
const { MongoClient } = require('mongodb')

const { env: { mongo_path, port } } = process

MongoClient.connect(mongo_path, { useNewUrlParser: true }, (err, connect) => {
    if(err) throw new Error(err)

    const db = connect.db()

    const agendaApp = express()
    
    agendaApp.use(cors())
    agendaApp.use('/api', routes(db))

    agendaApp.listen(port, () => console.log(`${package.name} running on port ${port}`))
})