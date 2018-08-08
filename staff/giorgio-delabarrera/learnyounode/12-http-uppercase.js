const http = require('http')

const [, , port] = process.argv

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let rawData = ''
    req.on('data', chunk => {
      rawData += chunk
    })
    req.on('end', () => {
      res.write(rawData.toUpperCase())
    })
  }
}).listen(port, () => {
  // console.log('listening');
})