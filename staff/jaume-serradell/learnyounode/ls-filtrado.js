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





