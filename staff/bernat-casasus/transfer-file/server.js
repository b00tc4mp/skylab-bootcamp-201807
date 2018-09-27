const fs = require('fs')
const http = require('http')
const map = require('through2-map')
const {argv: [,, port]} = process


const server = http.createServer(function (req, res) {
    if(req.method == 'POST'){
        const ws = fs.WriteStream('file-data')
        req.pipe(ws)
        req.on('end', () => res.end('ok, file recived'))

    }
})
server.listen(port, ()=> console.log(`transfer-file server up and running on port ${port}`))