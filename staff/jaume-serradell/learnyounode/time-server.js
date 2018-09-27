var net = require('net')

var server = net.createServer(function (socket) {
    socket.write(infoDate())
    socket.end()
})
server.listen(process.argv[2])

function infoDate(){
    let date = new Date();
    
    let fullYear = date.getFullYear()
    let month = addZero(date.getMonth()+1)
    let day = addZero(date.getDate())
    let hours = addZero(date.getHours())
    let minutes = addZero(date.getMinutes())

    return `${fullYear}-${month}-${day} ${hours}:${minutes}\n`
}

function addZero(date) {
    if(date < 10) {
        return `${0}${date}`
    } else {
        return date;
    }
}