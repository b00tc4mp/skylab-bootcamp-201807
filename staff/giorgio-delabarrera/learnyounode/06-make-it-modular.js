const filteredLs = require('./filteredLs')

const [, , directory, extension] = process.argv

if (!directory) throw Error('directory is required')
if (!extension) throw Error('extension is required')

filteredLs(directory, extension, (err, filteredFiles) => {
  if (err) console.error(err)

  filteredFiles.forEach(file => console.log(file));
})