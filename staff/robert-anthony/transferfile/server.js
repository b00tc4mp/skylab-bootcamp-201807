const http = require('http')
const fs = require('fs')

const  {argv: [,,port]} = process


const server =  http.createServer((req,res)=>
{

  if (req.method === "POST") {
    const ws = fs.createWriteStream("file.data")
    req.pipe(ws)

    req.on('end',() =>res.end("file received"))
  }

})

server.listen(port , () => console.log(`listening on port ${port}`))

