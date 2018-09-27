const fs = require('fs')
const http = require('http')
const port = process.argv[2]
const path = process.argv[3]

const server = http.createServer(function (req, res) {
    // manejo del socket
    fs.createReadStream(path).pipe(res)
})
server.listen(port)



// var http = require('http')
// var fs = require('fs')

// var server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type': 'text/plain' })

//   fs.createReadStream(process.argv[3]).pipe(res)
// })

// server.listen(Number(process.argv[2]))
