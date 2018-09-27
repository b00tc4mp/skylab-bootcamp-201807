var mymodule = require('./my-module.js')

var folder = process.argv[2]
    var ext = '.' + process.argv[3]
        

function bar (callback) {
    foo(function (err, data) {
      if (err)
        return callback(err) 

      callback(null, data)
    })
  }

