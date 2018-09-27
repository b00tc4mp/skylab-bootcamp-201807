const http = require('http')
const fs = require('fs')

const {argv: [, , port]} = process

http.createServer((req,res) => {

    if(req.method === 'POST') {

        const ws = fs.createWriteStream('file.data')

        req.pipe(ws)

        req.on("end", () => res.end("ok, filed received"))
    }

}).listen(port || 8080, () => console.log(`transfer-file server up and running on port ${port}`))