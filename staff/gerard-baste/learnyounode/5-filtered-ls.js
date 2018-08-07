const fs = require('fs')

const path = require('path')

fs.readdir(process.argv[2], function(err,list){
    for (let index = 0; index < list.length; index++) {
        if(path.extname(list[index]) == `.${process.argv[3]}`){
            console.log(list[index])
        }
    }
}) 