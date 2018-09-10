require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pkg = require('./package.json')

const http = require('http')
const { env: { MONGODB_URI } } = process
const { mongoose } = require('chess-data')
const socketIO = require('socket.io');
/*

var consoleFormatter = {
  stdout: true, // this is actually the default and can be removed
  inspectArgsMaxLen: 100,
  indentationChar: '    ',
  inspectOptions: {colors: true}
};


const fileFormatter = {
  stdout: 'trace.out',
  inspectArgsMaxLen: 0,
  indentationChar: '\t'
};


const njstrace = require('njstrace').inject({
  formatter: [consoleFormatter, fileFormatter]
})

*/

const routes = require('./routes')
const { sockets } = require('./sockets')


mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err, conn) => {
  if (err) throw err


  const { PORT } = process.env

  const app = express()

  app.use(cors())

  app.use('/api', routes())

  const server = http.createServer(app);
  const io = socketIO(server);
  sockets.setIO(io)
  server.listen(PORT, () => console.log(`${pkg.name} ${pkg.version} up and running on port ${PORT}`));
  // WARNING: app.listen(80) will NOT work here!


})

