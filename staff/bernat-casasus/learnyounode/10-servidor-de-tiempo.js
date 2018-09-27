const net = require('net')

const port = process.argv[2]
const date = new Date()

const server = net.createServer(function (socket) {
    socket.write(setNewDate(date))
    socket.end()
})
server.listen(port)

function setNewDate(date) {

    const year = date.getFullYear()
    const month = fixDateSyntax(date.getMonth() + 1)
    const day = fixDateSyntax(date.getDate())
    const hours = fixDateSyntax(date.getHours())
    const minutes = fixDateSyntax(date.getMinutes())

    return `${year}-${month}-${day} ${hours}:${minutes}\n`
}

fixDateSyntax = (element) => {

    return element < 10 ? `0${element}` : element
}