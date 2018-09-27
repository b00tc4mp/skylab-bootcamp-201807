require('dotenv').config()

const express = require('express')
const cors = require('cors')
const package = require('./package.json')
const routes = require('./routes')

const { argv: [, , port] } = process

const app = express()

app.use(cors())

app.use('/api', routes)

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))