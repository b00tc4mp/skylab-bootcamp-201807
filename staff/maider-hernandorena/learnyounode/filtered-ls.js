// var fs = require('fs')

// const path = process.argv[2]

// const ls = '.' + process.argv[3]

// fs.readdir(path, function (err, data){
//     if (err) {
//         return console.log(err)
//     }
//     else {
//         for (var i = 0 ; i < data.length; i++)
//         if(data[i].match(ls)) {
//             console.log(data[i])
//         }
//     }
// })


const fs = require('fs')
const path = require('path')

const { argv: [, , dir, ext] } = process

fs.readdir(dir, (err, files) => {
    if (err) throw err
    files.filter(file => path.extname(file) === `.${ext}`).forEach(file => console.log(file))
})