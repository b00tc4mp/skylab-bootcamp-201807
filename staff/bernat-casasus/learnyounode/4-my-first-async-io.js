var fs = require('fs')
var file = process.argv[2]

var buffer = fs.readFile(file.toString(), 'utf8', function callback(err, data) {

    var array = data.split('\n')
    console.log(array.length - 1)
})

//learnyounode solution

// var fs = require('fs')                                    
// var file = process.argv[2]                                
                                                          
// fs.readFile(file, function (err, contents) {              
//   if (err) {                                              
//     return console.log(err)                               
//   }                                                       
//   // fs.readFile(file, 'utf8', callback) can also be used 
//   var lines = contents.toString().split('\n').length - 1  
//   console.log(lines)                                      
// })                                                        