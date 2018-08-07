const net = require('net')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    const date = new Date()

    const res = `${date.getFullYear()}-${to2Digits(date.getMonth() + 1)}-${to2Digits(date.getDate())} ${to2Digits(date.getHours())}:${to2Digits(date.getMinutes())}\n`

    // socket.write(res)
    // socket.end()

    socket.end(res)
})

function to2Digits(num) {
    return `${num < 10? 0 : ''}${num}`
}

server.listen(port)

// $ nc localhost 8080