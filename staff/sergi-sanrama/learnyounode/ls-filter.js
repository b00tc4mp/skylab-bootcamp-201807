// var fs = require('fs')

// var path = require('path')

// var str = fs.readdir(myPath, function(error, list){

// })


var fs = require('fs')
var path = require('path');

var folder = process.argv[2]
var ext = '.' + process.argv[3]

var str = fs.readdir(folder,function(error,list){
   if (error) throw error
   list.forEach(function(list) {
       if (path.extname(list) === ext) {
           console.log(list)
       }
   })
})

/*
var fs = require('fs')
var path = require('path');

const { argv: [, , dir, ext] } = process

fs.reddir(dir, (err, files) => files.filter(file => file.endsWith(`.${ext}`)).forEach(file => console.log(file)))

*/