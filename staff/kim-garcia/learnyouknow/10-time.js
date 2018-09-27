//mirar el month +1 y el addZero, tienen q ser toto strings o todo numeros

var net = require('net')
function addZero(num) {
  if (num < 10) {
    return `${0}${num}`
  }else{
    return num
  }
}
// const {argv: {, , ...port}} = process

function add (num){
  return `${num < 10? 0:''}${num}`
}

///solucion de aqui
function zeroFill (i) {
  return (i < 10 ? '0' : '') + i
}

var server = net.createServer(socket => {

  let date = new Date()
  let FullYear = date.getFullYear()
  let Month = (date.getMonth()+1)     // starts at 0)
  let Day = date.getDate()      // returns the day of month
  let Hours = date.getHours()
  let Minutes = date.getMinutes()

  const today = `${FullYear}-${addZero(Month)}-${add(Day)} ${Hours}:${Minutes}
`

  // socket.emit('datetime', { datetime: new Date().getTime() });
  socket.write(today)
  socket.end()
})
server.listen(process.argv[2])

// "YYYY-MM-DD hh:mm"

//   console.log('client connected');
//   c.on('end', () => {
//     console.log('client disconnected');
//   });
//   c.write('hello\r\n');
//   c.pipe(c);
// });
// server.on('error', (err) => {
//   throw err;
// });
// server.listen(8124, () => {
//   console.log('server bound');
// });