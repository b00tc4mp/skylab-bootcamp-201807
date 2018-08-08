const http = require('http')
const url = require('url')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    const { pathname, query: { iso } } = url.parse(req.url, true)

    if (iso) {
        const date = new Date(iso)

        switch (pathname) {
            case '/api/parsetime':
                const time = {
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    second: date.getSeconds()
                }

                res.writeHead(200, { 'Content-Type': 'application/json' })

                res.end(JSON.stringify(time))

                return
            case '/api/unixtime':
                res.writeHead(200, { 'Content-Type': 'application/json' })

                res.end(JSON.stringify({
                    unixtime: date.getTime()
                }))

                return
        }
    }

    res.writeHead(404)

    res.end('cannot understand you :(')
})

server.listen(port || 8080)