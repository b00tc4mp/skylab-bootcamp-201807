var fs = require('fs')

const path = process.argv[2]

fs.readFile(path, function (err, lines){
    if (err) {
        return console.log(err)
    }
    else {
        var lines = lines.toString().split('\n').length-1
        console.log(lines)
    }
})