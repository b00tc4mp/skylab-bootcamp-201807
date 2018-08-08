// to create a big dummy file:
// $ mkfile 100M file.data

// $ node cp file.txt dest/file.txt

const fs = require('fs')
const printMem = require('./print-mem')

const { argv: [, , from, to] } = process

printMem()

const content = fs.readFileSync(from)

fs.writeFileSync(to, content)

console.log(`copied ${from} to ${to}`)

console.log('continue...')

printMem()