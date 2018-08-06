http = require('http')


const fileloc = process.argv[3]

const server = http.createServer((req,res) => {

  req.pipe(map(chunk =>  chunk.toString().toUpperCase())).pipe(res)





})
server.listen(process.argv[2])