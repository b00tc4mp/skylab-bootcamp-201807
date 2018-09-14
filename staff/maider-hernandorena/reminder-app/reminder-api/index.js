require('dotenv').config()

const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const routesDoctor = require('./routesDoctor')
const routesCaretaker = require('./routesCaretaker')
const routesAdmin = require('./routesAdmin')
const { mongoose } = require('reminder-data')

const { env: { MONGO_URL, PORT } } = process

const app = express()

app.use(cors())

app.use('/api/doctor', routesDoctor)
app.use('/api/caretaker', routesCaretaker)
app.use('/api/admin', routesAdmin)

app.listen(PORT, () => console.log(`${package.name} ${package.version} up and running on port ${PORT}`))

mongoose.connect(MONGO_URL, () => console.log('DB connected'))