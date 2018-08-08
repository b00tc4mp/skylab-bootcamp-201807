fs = require('fs')

const [, , directory, extension] = process.argv

if (!directory) {
  throw Error('directory is required')
}

if (!extension) {
  throw Error('extension is required')
}

fs.readdir(directory, (err, files) => {
  if (err) throw err;
  const filtered = files.filter(file => file.endsWith(`.${extension}`))
  filtered.forEach(file => console.log(file));
})