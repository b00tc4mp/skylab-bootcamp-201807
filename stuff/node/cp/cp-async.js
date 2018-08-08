// $ node cp file.txt dest/file.txt

const fs = require('fs')
const printMem = require('./print-mem')

const { argv: [, , from, to] } = process

printMem()

fs.readFile(from, (err, content) => {
    if (err) throw err


    fs.writeFile(to, content, (err) => {
        if (err) throw err

        console.log(`copied ${from} to ${to}`)

        printMem()
    })
})

console.log('continue...')