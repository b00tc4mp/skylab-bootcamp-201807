// usage demos:
// $ node client.js file.data localhost 8080
// $ node client.js file.data 192.168.0.27 3000

const http = require('http')
const fs = require('fs')

const { argv: [, , file, host, port] } = process

const postData = fs.readFileSync(file)

const options = {
    hostname: host,
    port: parseInt(port),
    path: '/',
    method: 'POST',
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Content-Length': Buffer.byteLength(postData)
    // }
};

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

req.on('error', ({ message }) => {
    console.error(`problem with request: ${message}`)
})

// write data to request body
req.write(postData)
req.end()