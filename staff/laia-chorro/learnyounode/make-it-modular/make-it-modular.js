var mymodule = require('./mymodule.js')


const pathDir = process.argv[2],
    fileExt = process.argv[3],
    callback = function(error, files) {
                        if (error) throw error;

                        for (var i = 0; i < files.length; i++) {
                            console.log(files[i]);
                        }
                    };

mymodule(pathDir, fileExt, callback);

/*
 var filterFn = require('./solution_filter.js')
    var dir = process.argv[2]
    var filterStr = process.argv[3]
    
    filterFn(dir, filterStr, function (err, list) {
      if (err) {
        return console.error('There was an error:', err)
      }
    
      list.forEach(function (file) {
        console.log(file)
      })
    })


*/

