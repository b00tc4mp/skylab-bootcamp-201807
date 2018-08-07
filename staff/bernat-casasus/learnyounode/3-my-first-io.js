var fs = require('fs')

var file = process.argv[2]

var buffer = fs.readFileSync(file)

var str = buffer.toString()

var count = str.split('\n')

var result = count.length -1

console.log(result)