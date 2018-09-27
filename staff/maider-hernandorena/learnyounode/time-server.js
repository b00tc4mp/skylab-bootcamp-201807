// const net = require('net')

// const tpc = process.argv[2]

// const server = net.createServer(function (socket) {
//     let date = new Date()
//     let getDate = `${date.getFullYear()}-${date.getMonth() < 9 ? ('0'+(date.getMonth()+1)) : (date.getMonth()+1)}-${date.getDate() < 10 ? ('0'+date.getDate()) : date.getDate()} ${date.getHours() < 10 ? ('0'+date.getHours()) : date.getHours()}:${date.getMinutes() < 10 ? ('0'+date.getMinutes()) : date.getMinutes()}`

//     socket.write(getDate+'\n')
//     socket.end(data)
    
// })

// server.listen(tpc)


const net = require('net')

const { argv: [, , tpc] } = process

const server = net.createServer(socket => {
    let date = new Date()
    let getDate = `${date.getFullYear()}-${date.getMonth() < 9 ? ('0'+(date.getMonth()+1)) : (date.getMonth()+1)}-${date.getDate() < 10 ? ('0'+date.getDate()) : date.getDate()} ${date.getHours() < 10 ? ('0'+date.getHours()) : date.getHours()}:${date.getMinutes() < 10 ? ('0'+date.getMinutes()) : date.getMinutes()}\n`
    socket.end(getDate)    
})

server.listen(tpc)