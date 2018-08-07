var fs = require('fs')

// var path = require('path')
let filePath = process.argv[2]; //directorio
let extName = process.argv[3];  // file extension

fs.readdir(filePath, 'utf-8', function(err, data) { //utf8 ya es por defecto
    if (err) throw err;
    data.forEach(element => {
        let temp = element.split('.');  // ['01-blabla', 'js']
        if(temp[1] === extName) {
            console.log(element)
        }
        
    })
})

// console.log(process.argv)

// fs.readdir(process.argv[2], function (err, list){
//     list.forEach(function(file){
//         if(path.extname(file) === "." + process.argv[3])
//         console.log(file)
//     })
// })

