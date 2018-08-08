net = require('net')
strftime = require("strftime")

const { argv:[port]} = process

const server = net.createServer(socket => {

  // "YYYY-MM-DD hh:mm"

  const datetime = strftime("%Y-%m-%d %H:%M") + "\n"
  socket.end(datetime)

})
server.listen(port)