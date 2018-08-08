let fs = require('fs')
let path = require('path')

let dir = process.argv[2]
let ext = '.'+process.argv[3]

fs.readdir(dir, function (err, data){
    for (let i = 0; i < data.length; i++) {
        const file = data[i].toString()
        if(path.extname(file) === ext){
            console.log(file)
        }
    }
})