http = require('http')
fs = require("fs")

const { argv:[,,port,fileloc]} = process

const server = http.createServer((req,res) => {

  res.writeHead(200, {'content-type': 'text/plain'})
  const rs = fs.createReadStream(fileloc)

  rs.pipe(res)



})
server.listen(port)