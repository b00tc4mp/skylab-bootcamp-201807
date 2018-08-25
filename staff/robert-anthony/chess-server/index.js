require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pkg = require('./package.json')
const routes = require('./routes')
var socketIO = require('socket.io');
const http = require('http')
const {env: {MONGO_URL}} = process
const mongoose = require('mongoose')
const {logic} = require('./logic')

mongoose.connect(MONGO_URL, {useNewUrlParser: true}, (err, conn) => {
  if (err) throw err


  const {PORT} = process.env

  const app = express()

  app.use(cors())

  app.use('/api', routes())

  const server = http.createServer(app);
  const io = socketIO(server);
  logic.setIO(io)

  server.listen(PORT, () => console.log(`${pkg.name} ${pkg.version} up and running on port ${PORT}`));
// WARNING: app.listen(80) will NOT work here!



})

