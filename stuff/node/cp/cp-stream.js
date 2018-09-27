// $ node cp-stream file.txt dest/file.txt 24

const fs = require('fs')
const printMem = require('./print-mem')

const { argv: [, , from, to, chunkSize] } = process

printMem()

// $ node cp-stream.js file.data dest/file.data 256
// Memory used 19.36 MB
// Memory used 324.61 MB
// $ node cp-stream.js file.data dest/file.data 64
// Memory used 19.64 MB
// Memory used 150.31 MB
// $ node cp-stream.js file.data dest/file.data 32
// Memory used 19.57 MB
// Memory used 92.75 MB
// $ node cp-stream.js file.data dest/file.data 24
// Memory used 19.41 MB
// Memory used 51.88 MB
// $ node cp-stream.js file.data dest/file.data 1
// Memory used 19.48 MB
// Memory used 30 MB

const rs = fs.createReadStream(from, { highWaterMark: 1024 * (parseInt(chunkSize || 32)) })
const ws = fs.createWriteStream(to)

rs.on('data', data => ws.write(data))

rs.on('end', () => {
    ws.close()

    printMem()
})