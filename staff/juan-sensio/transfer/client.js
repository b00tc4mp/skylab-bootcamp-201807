const http = require('http')
const fs = require('fs')
const { argv: [, , file, host, port] } = process
const options = {
    hostname: host,
    port: parseInt(port),
    path: '/',
    method: 'POST'
}
const req = http.request(options, res => {
    res.setEncoding('utf8')
    let content = ''
    res.on('data', chunk => {
        content += chunk
    })
    res.on('end', () => {
        console.log(content)
    })
})
req.on('error', err => {
    console.log(err.message)
})

const rs = fs.createReadStream(file)
rs.pipe(req)
rs.on('end', () => req.end())