const net = require('net')

const { argv: [, , port]} = process

const server = net.createServer(socket => {
    const date = new Date()


    socket.end(`${date.getFullYear()}-${date.getMonth()+1}-${to2Digits(date.getDate())} ${to2Digits(date.getHours())}:${to2Digits(date.getMinutes())}`)
})

function to2Digits(num){
    return `${num <10? 0 : ``}${num}`
}

server.listen(port)