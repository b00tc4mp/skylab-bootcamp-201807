
const filteredLs = (directory, extension, callback) => {
  fs = require('fs')

  if (!directory) throw Error('directory is required')
  if (!extension) throw Error('extension is required')
  if (!callback) throw Error('callback is required')

  fs.readdir(directory, (err, files) => {
    if (err) return callback(err);
    return callback(null, files.filter(file => file.endsWith(`.${extension}`)))
  })
}

module.exports = filteredLs