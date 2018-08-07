var fs = require('fs')

const file = process.argv[2]

fs.readFile(file, function(err, content){
    if(err){
        return console.log(err)
    }
    const lines = content.toString().split('\n').length -1
    console.log(lines)
})

// var fs = require('fs')
// var myNumber = undefined

// function addOne(callback) {
//   fs.readFile('number.txt', function doneReading(err, fileContents) {
//     myNumber = parseInt(fileContents)
//     myNumber++
//     callback()
//   })
// }

// function logMyNumber() {
//   console.log(myNumber)
// }

// addOne(logMyNumber)
