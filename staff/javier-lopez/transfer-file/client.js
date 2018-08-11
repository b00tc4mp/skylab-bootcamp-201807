const http = require('http')
const fs = require('fs')

const { argv: [,, file, host, port]} = process

const postData = fs.readFileSync(file)

const options = { 
    hostname: host,
    port: parseInt(port),
    path: '/',
    method: 'POST'
}

const req = http.request(options, (res) => {
    res.setEncoding('utf8')

    let content = ''

    res.on('data', chunk => {
      content += chunk
    })
    res.on('end', () => {
        console.log(content);
    })
    res.on('error', ({message}) => {
      console.log(`Problem with request: ${message}`)
    })
  })

  req.write(postData)
  req.end()