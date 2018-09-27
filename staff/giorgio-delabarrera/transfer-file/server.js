const http = require('http')
const fs = require('fs')

const [, , port] = process.argv

http.createServer((req, res) => {

  if (req.method === 'POST') {

    const ws = fs.createWriteStream('file.data')

    req.pipe(ws)

    req.on('end', () => res.end('Yeah! File recived'))
  }

}).listen(port, () => {
  console.log('Yeah!')
})