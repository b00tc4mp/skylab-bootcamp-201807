var fs = require('fs')
var path = require('path')


let { argv:[,,filename,ext]} = process.argv
ext = "." + ext

fs.readdir(filename,cb);

function cb(err,list) {
  for (item of list) {
    if ( path.extname(item) === ext) console.log(item) ;
  }

}


