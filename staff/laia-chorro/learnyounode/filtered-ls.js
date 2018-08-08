var fs = require('fs')

const pathDir = process.argv[2],
    fileExt = process.argv[3];

fs.readdir(pathDir, function(error, files) {
    if (error) throw error;

    for (var i = 0; i < files.length; i++) {
        if (files[i].endsWith('.' + fileExt)) console.log(files[i]);
    } 
})

