const fs = require('fs')

let buf = fs.readFileSync(process.argv[2]).toString()

console.log(buf.split('\n').length-1);