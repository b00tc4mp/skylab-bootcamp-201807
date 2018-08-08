const http = require('http')

const [, , url] = process.argv

http.get(url, res => {
  res.setEncoding('utf8')
  res.on('data', console.log)
  res.on('error', console.error)
})