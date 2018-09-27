var net = require('net')

var server = net.createServer(function (socket) {
    socket.write(info())

    socket.end() 
})

server.listen(process.argv[2])

function info(){
    let date = new Date()
    let year = date.getFullYear()
    let month = sumZero(date.getMonth() + 1)     // empieza en 0
    let day = sumZero(date.getDate())      // devuelve día del mes, empieza en 1s
    let hour = sumZero(date.getHours())
    let minute = sumZero(date.getMinutes())

    return `${year}-${month}-${day} ${hour}:${minute}\n` 
}

function sumZero(date){
    if(date < 10){
        return `${0}${date}`
    }else{
        return date
    }
}



     
     