const fs = require('fs')

const str = fs.readFile((process.argv[2]).toString(), 'utf-8', function test (err,str){
    console.log(str.split("\n").length-1)
})

