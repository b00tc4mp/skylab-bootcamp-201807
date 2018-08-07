// var fs = require('fs')

// const path = process.argv[2]

// fs.readFile(path, function (err, lines){
//     if (err) {
//         return console.log(err)
//     }
//     else {
//         var lines = lines.toString().split('\n').length-1
//         console.log(lines)
//     }
// })


const fs = require('fs')

const { argv: [, , file] } = process

fs.readFile(file, 'utf8', (err, content) => {
    if (err) throw err
    const numOfLines = content.split('\n').length - 1
    console.log(numOfLines)
})
