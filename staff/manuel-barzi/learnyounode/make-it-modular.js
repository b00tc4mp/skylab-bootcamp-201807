const filterFilesByExtension = require('./filter-files-by-extension')

const { argv: [, , dir, ext] } = process

filterFilesByExtension(dir, ext, (err, files) => {
    if (err) throw err

    files.forEach(file => console.log(file))
})