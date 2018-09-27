var mymodule = require('./my-module.js')

function bar (callback) {
    foo(function (err, data) {
      if (err)
        return callback(err) 

      callback(null, data)
    })
  }