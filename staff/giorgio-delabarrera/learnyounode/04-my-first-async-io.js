fs = require('fs')

const [, , path] = process.argv

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data.split('\n').length - 1)
})