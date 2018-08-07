const http = require('http')
const fs = require('fs')

const { argv: [, , serv, file] } = process

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' })
    fs.createReadStream(file).pipe(res)
})

server.listen(serv)