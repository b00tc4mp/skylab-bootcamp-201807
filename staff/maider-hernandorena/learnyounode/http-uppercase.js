// const http = require('http')
// const map = require('through2-map')

// const { argv: [, , serv] } = process

// const server = http.createServer((req, res) => {
//     let content = ''
//     if (req.method === 'POST') {
//         req.on('data', chunk => content += chunk)
//         req.on('end', () => res.end(content.toUpperCase()))
//     }
// })

// server.listen(serv)


const http = require('http')
const map = require('through2-map')

const { argv: [, , serv] } = process

const server = http.createServer((req, res) => {
    if (req.method === 'POST') req.pipe(map(chunk => chunk.toString().toUpperCase())).pipe(res)
})

server.listen(serv)