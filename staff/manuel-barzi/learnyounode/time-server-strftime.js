const net = require('net')
const strftime = require('strftime')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    const date = new Date()

    const res = strftime('%F %H:%M\n', date)

    socket.end(res)
})

function to2Digits(num) {
    return `${num < 10? 0 : ''}${num}`
}

server.listen(port)