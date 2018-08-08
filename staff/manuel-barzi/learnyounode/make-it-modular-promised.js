const filterFilesByExtension = require('./filter-files-by-extension-promised')

const { argv: [, , dir, ext] } = process

filterFilesByExtension(dir, ext)
    .then(files => files.forEach(file => console.log(file)))
    .catch(console.error)

