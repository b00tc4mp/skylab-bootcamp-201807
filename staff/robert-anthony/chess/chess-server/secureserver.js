require('dotenv').config()


const fs = require('fs');
const http = require('http');
const https = require('https');

const { env: { MONGODB_URI } } = process
const express = require('express')
const cors = require('cors')
const pkg = require('./package.json')
const { mongoose } = require('chess-data')
const socketIO = require('socket.io');

const routes = require('./routes')
const { sockets } = require('./sockets')


mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err, conn) => {
  if (err) throw err


  const { HTTPSPORT } = process.env

  const app = express()

  app.use(cors())

  app.use('/api', routes())

  const credentials = {
    key: fs.readFileSync('server.key', 'utf8'),
    cert: fs.readFileSync('server.crt', 'utf8'),
    passphrase: 'secretstuff'
  }
  const httpsServer = https.createServer(credentials, app);
  const io = socketIO(httpsServer);
  sockets.setIO(io)
  httpsServer.listen(HTTPSPORT, () => console.log(`${pkg.name} ${pkg.version} https server up and running on port ${HTTPSPORT}`));
  // WARNING: app.listen(80) will NOT work here!


})

