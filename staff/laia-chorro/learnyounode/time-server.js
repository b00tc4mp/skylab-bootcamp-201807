/*
Write a TCP time server!  
   
  Your server should listen to TCP connections on the port provided by the  
  first argument to your program. For each connection you must write the  
  current date & 24 hour time in the format:  
   
     "YYYY-MM-DD hh:mm"  
   
  followed by a newline character. Month, day, hour and minute must be  
  zero-filled to 2 integers. For example:  
   
     "2013-07-06 17:42"  
   
  After sending the string, close the connection.  
*/

var net = require('net');

var port = process.argv[2];

function parseTodayDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month > 9 ? month : '0' + month;
    var day = date.getDate(); 
    day = day > 9 ? day : '0' + day;
    var hours = date.getHours();
    hours = hours > 9 ? hours : '0' + hours;
    var minutes = date.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes;

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + '\n';
}

 
var server = net.createServer(function (socket) {  
    var data  = parseTodayDate();
    socket.write(data);
    socket.end();
})  
server.listen(port) 


/*

    var net = require('net')
    
    function zeroFill (i) {
      return (i < 10 ? '0' : '') + i
    }
    
    function now () {
      var d = new Date()
      return d.getFullYear() + '-' +
        zeroFill(d.getMonth() + 1) + '-' +
        zeroFill(d.getDate()) + ' ' +
        zeroFill(d.getHours()) + ':' +
        zeroFill(d.getMinutes())
    }
    
    var server = net.createServer(function (socket) {
      socket.end(now() + '\n')
    })
    
    server.listen(Number(process.argv[2]))

*/


