// const fs = require('fs')

// const str = (fs.readFileSync(process.argv[2])).toString()

// let lines = []
// for (var i = 0; i < str.length; i++) {
//     lines = str.split('\n')
// }

// console.log(lines.length -1)


const fs = require('fs')

const { argv: [, , file] } = process

// const content = fs.readFileSync(file).toString()
const content = fs.readFileSync(file, 'utf8')

const numOfLines = content.split('\n').length - 1

console.log(numOfLines)