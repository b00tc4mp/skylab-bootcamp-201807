const http = require('http')
const fs = require('fs')

const {argv: [,, file, host, port]} = process

const postData = fs.readFileSync(file)

const options = {
    hostname: host,
    port: parseInt(port),
    path: '/',
    method: 'POST'
};

const req = http.request(options,res => {

    res.setEncoding('utf8')

    let content = ''

    res.on('data', chunk => {
        content+=chunk
    })

    res.on('end', () => {
            console.log(content)
    })

})

req.on('error', ({message}) =>{
    console.error(`problem with request: ${message}`)
})

//write data to request body
req.write(postData)
req.end()
