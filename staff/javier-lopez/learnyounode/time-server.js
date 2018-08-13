const net = require('net')
let port = process.argv[2]

function addingZero (i) {
    return (i < 10 ? '0' : '') + i
  }

let server = net.createServer(function(socket){
    let date = new Date()
    let data = date.getFullYear()+'-'+addingZero(date.getMonth()+1)+'-'+addingZero(date.getDate())+" "+addingZero(date.getHours())+":"+addingZero(date.getMinutes())
    socket.write(data.toString()+'\n')
    socket.end()
})
server.listen(port)