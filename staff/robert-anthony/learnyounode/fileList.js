var fs = require('fs')
var path = require('path')

const ext = "." + process.argv[3]



fs.readdir(process.argv[2],cb);

function cb(err,list) {
  for (item of list) {
    if ( path.extname(item) === ext) console.log(item) ;
  }

}


