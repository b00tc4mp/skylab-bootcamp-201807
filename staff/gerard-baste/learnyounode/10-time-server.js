const net = require('net')

const server = net.createServer(function (socket) {

socket.write(info())
socket.end()
})



function info (){
    const date = new Date()
    const year = date.getFullYear()
    const month = sumZero(date.getMonth() +1)
    const day = sumZero(date.getDate())
    const hour = sumZero(date.getHours())
    const minutes = sumZero(date.getMinutes())

    return `${year}-${month}-${day} ${hour}:${minutes}\n` 

}

function sumZero (date){
 if (date < 10){

    return `${0}${date}`
 }
    return date
}

server.listen(process.argv[2])