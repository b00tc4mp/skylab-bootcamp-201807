const http = require('http')
const fs = require('fs')

let port = process.argv[2]
let path = process.argv[3]

server = http.createServer(function(request, response){
    //To give a header
    response.writeHead(200, {
        'content/type': 'text/plain'
    })
    fs.createReadStream(path).pipe(response)
})
server.listen(port)