var fs = require('fs')
var path = require('path')

module.exports = function(dir, ext, callback) {
    fs.readdir(dir, function(error,list){
        if (error) return callback(error)
        list = list.filter(function(element){
            var extension = '.' + ext
            if(path.extname(element) === extension) {
                return element
            }
        })
        callback(null, list)
    })
}