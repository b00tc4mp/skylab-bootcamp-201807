var fs = require('fs')

var line = (fs.readFileSync(process.argv[2]).toString())  // utf8 es lo mismo q toString

console.log(line.split('\n').length-1) 

