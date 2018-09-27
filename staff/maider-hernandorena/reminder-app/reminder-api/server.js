require('dotenv').config()

const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const routesDoctor = require('./routesDoctor')
const routesCaretaker = require('./routesCaretaker')
const routesAdmin = require('./routesAdmin')
const { mongoose } = require('reminder-data')

const fs = require('fs')
const https = require('https')
const privateKey = fs.readFileSync('ssl/server.key', 'utf-8')
const certificate = fs.readFileSync('ssl/server.crt', 'utf-8')
const secret = fs.readFileSync('ssl/passphrase.txt', 'utf-8')
const credentials = { key: privateKey, cert: certificate, passphrase: secret }

const { env: { MONGO_URL, PORT_SSL } } = process

const app = express()

app.use(cors())

app.use('/api/doctor', routesDoctor)
app.use('/api/caretaker', routesCaretaker)
app.use('/api/admin', routesAdmin)

app.get('/', (req, res) => {
    res.end('ok')
})

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(PORT_SSL, () => console.log(`${package.name} ${package.version} up and running on port ${PORT_SSL}`))

mongoose.connect(MONGO_URL, () => console.log('DB connected'))