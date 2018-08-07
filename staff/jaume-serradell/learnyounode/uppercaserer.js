const http = require('http')
const map = require('through2-map')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    if (req.method === 'POST')
        req.pipe(map(chunk => chunk.toString().toUpperCase())).pipe(res)
})

server.listen(port, () => console.log(`uppercaserer server running on port ${port}`))