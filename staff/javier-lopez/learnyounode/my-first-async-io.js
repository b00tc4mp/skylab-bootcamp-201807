var fs = require('fs')

function callback(err, data){
    if(err) return console.error(err) 
    else{console.log(data.split('\n').length-1)}
}

fs.readFile((process.argv[2]).toString(), 'utf8' ,callback)
