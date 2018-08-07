var fs = require('fs')

var str = fs.readFile(process.argv[2].toString(),'utf8',function(error, data){
    if (error) throw error;
    console.log(data.split('\n').length-1)
})


//a diferencia del anterior, el readFile es asincrono, es decir que no bloquea el flujo. 