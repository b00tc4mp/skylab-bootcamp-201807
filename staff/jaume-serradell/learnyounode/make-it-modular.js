var mymodule = require('./mymodule.js')

var folder = process.argv[2]
var ext = process.argv[3]

mymodule(folder, ext, function(error, data){
    if (error) console.log(error)
    data.forEach(element => {
        console.log(element)
    })
        
})