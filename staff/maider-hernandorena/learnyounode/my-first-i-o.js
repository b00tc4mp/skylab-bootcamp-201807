var fs = require('fs')

const str = (fs.readFileSync(process.argv[2])).toString()

var lines = []
for (var i = 0; i < str.length; i++) {
    lines = str.split('\n')
}

console.log(lines.length -1)