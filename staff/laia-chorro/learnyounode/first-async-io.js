var fs = require('fs')

const file = process.argv[2];

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data.split('\n').length -1);
  });



  /*
  fs.readFile(file, function (err, data) {
    if (err) throw err;
    console.log(data.toString()split('\n').length -1);
  });
  */

