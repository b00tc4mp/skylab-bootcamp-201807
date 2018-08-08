const http = require('http'),
  fs = require('fs')

const [, , port, path] = process.argv

const server = http.createServer((request, response) => {

  response.writeHead(200, { 'content-type': 'text/plain' })

  const stream = fs.createReadStream(path);
  let rawData = ''
  stream.setEncoding('utf8')
  stream.on('data', chunk => rawData += chunk)
  stream.on('end', () => {
    response.write(rawData)
    response.end()
  })
})
server.listen(port, () => {
  // console.log('listening');
})