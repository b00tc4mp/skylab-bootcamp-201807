http = require('http')
fs = require("fs")

const fileloc = process.argv[3]

const server = http.createServer((req,res) => {

  const rs = fs.createReadStream(fileloc)

  rs.pipe(res)



})
server.listen(process.argv[2])