net = require('net')
strftime = require("strftime")

const server = net.createServer(socket => {

  // "YYYY-MM-DD hh:mm"

  const datetime = strftime("%Y-%m-%d %H:%M") + "\n"
  socket.end(datetime)

})
server.listen(process.argv[2])