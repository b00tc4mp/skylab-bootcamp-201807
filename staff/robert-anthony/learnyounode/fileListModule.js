var fs = require('fs')
var path = require('path')


function fileLister(directory,ext,cb) {
  fs.readdir(directory,function(err,data) {

    if (err) return cb(err);

      const arr = []
      for (item of data) {
        if ( path.extname(item) === ("." + ext)) arr.push(item)
      }

      cb(null,arr)


  });



}

module.exports = fileLister