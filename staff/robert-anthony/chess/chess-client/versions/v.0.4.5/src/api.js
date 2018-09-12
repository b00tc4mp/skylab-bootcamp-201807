import openSocket from 'socket.io-client';
//const socket = openSocket('https://tranquil-ridge-60570.herokuapp.com/');
 const socket = openSocket(process.env.REACT_APP_SOCKET_SERVER_URL);

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer }