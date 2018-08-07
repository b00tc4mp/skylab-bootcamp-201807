const http = require('http')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    let content = ''

    if (req.method === 'POST') {
        req.on('data', chunk => content += chunk)

        req.on('end', () => res.end(content.toUpperCase()))
    }
})

server.listen(port)