const fs = require('fs')

const { argv: [, , file] } = process

//const text = fs.readFileSync(file).toString()
const text = fs.readFileSync(file, 'utf8')

const numOfBreaks = text.split('\n').length - 1

console.log(numOfBreaks)

