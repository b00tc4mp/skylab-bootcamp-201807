const http = require('http')

const [, , url] = process.argv

http.get(url, res => {
  let body = ''
  res.setEncoding('utf8')
  res.on('data', chunk => {
    body += chunk
  })
  res.on('end', () => {
    console.log(body.length);
    console.log(body);
  })
})