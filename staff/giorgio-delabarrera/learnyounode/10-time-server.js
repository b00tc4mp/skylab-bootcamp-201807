const net = require('net');

const [, , port] = process.argv

const server = net.createServer(socket => {
  
  const date = new Date()
  
  const year = date.getFullYear()
  const month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()
  const hour = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours()
  const minute = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()

  socket.write(`${year}-${month}-${day} ${hour}:${minute}`)
  socket.write('\n')

  socket.end()
});
server.on('error', (err) => {
  throw err;
});
server.listen(port, () => {
  // console.log('server bound');
});