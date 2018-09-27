
    var fs = require('fs')
    var path = require('path')
    
    module.exports = function (dir,ext,callback){
  
    fs.readdir(dir, function (err, list) {
        if (err) return callback(err)
            list = list.filter(function(element) {
                if (path.extname(element) === extension) {
                    return element;
                }
            })
        })
        callback(null, data)
    }
