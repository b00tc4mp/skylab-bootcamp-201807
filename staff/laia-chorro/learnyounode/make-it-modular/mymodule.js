var fs = require('fs');
var path = require('path');

function listFilesByExtension(pathDir, extension, callback) {
    fs.readdir(pathDir, function(error, files) {
        if (error) return callback(error)

        files = files.filter(file => path.extname(file) === '.' + extension);
        callback(null, files);
    })
}

module.exports = listFilesByExtension;



/*
var fs = require('fs')
    var path = require('path')
    
    module.exports = function (dir, filterStr, callback) {
      fs.readdir(dir, function (err, list) {
        if (err) {
          return callback(err)
        }
    
        list = list.filter(function (file) {
          return path.extname(file) === '.' + filterStr
        })
    
        callback(null, list)
      })
    }
*/


