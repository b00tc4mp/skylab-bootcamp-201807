const http = require('http')
const url = require('url')

const { argv: [, , port] } = process

const server = http.createServer((req, res) =>{
    res.end('ok')


})

server.listen(port || 8080)