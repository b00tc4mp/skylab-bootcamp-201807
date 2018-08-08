// $ node cp-stream file.txt dest/file.txt 24

const fs = require('fs')
const printMem = require('./print-mem')

const { argv: [, , from, to, chunkSize] } = process

printMem()

// $ node cp-stream-piping.js file.data dest/file.data 64
// Memory used 19.34 MB
// Memory used 106.48 MB
// $ node cp-stream-piping.js file.data dest/file.data 24
// Memory used 19.48 MB
// Memory used 83.72 MB
// $ node cp-stream-piping.js file.data dest/file.data 12
// Memory used 19.45 MB
// Memory used 61.45 MB
// $ node cp-stream-piping.js file.data dest/file.data 8
// Memory used 19.57 MB
// Memory used 48.66 MB
// $ node cp-stream-piping.js file.data dest/file.data 1
// Memory used 19.54 MB
// Memory used 28.93 MB
// $ node cp-stream-piping.js file.data dest/file-steam-piping.data 256
// Memory used 19.62 MB
// Memory used 40.39 MB

const rs = fs.createReadStream(from, { highWaterMark: 1024 * (parseInt(chunkSize || 32)) })
const ws = fs.createWriteStream(to)

rs.pipe(ws)

rs.on('end', () => {
    ws.close()

    printMem()
})