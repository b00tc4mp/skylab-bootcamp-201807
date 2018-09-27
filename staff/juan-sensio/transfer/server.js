const http = require('http')
const fs = require('fs')
const { argv: [, , port] } = process
http.createServer((req, res) => {
    const ws = fs.createWriteStream('file.dat')
    req.pipe(ws)
    ws.on('close', () => {
        res.writeHead(200)
        res.end('ok, file recieved !')
    })
}).listen(port, () => console.log(`server listening on port ${port}`))