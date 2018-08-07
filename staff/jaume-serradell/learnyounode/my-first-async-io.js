var fs = require('fs')

var str = fs.readFile(process.argv[2], 'utf8', function(error,data){
   if (error) throw new Error (error);
   console.log(data.split('\n').length-1)
})