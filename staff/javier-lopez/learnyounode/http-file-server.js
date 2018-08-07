const http = require('http')
const fs = require('fs')

let port = process.argv[2]
let path = process.argv[3]

server = http.createServer(function(request, response){
    fs.createReadStream(path)
})
server.listen(port)