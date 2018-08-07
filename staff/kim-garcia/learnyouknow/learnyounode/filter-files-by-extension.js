const fs = require('fs')
const path = require('path')

function filterFilesByExtension(dir, ext, cb) {
    fs.readdir(dir, (err, files) => {
        // if (err) {
        //     cb(err)

        //     return
        // }

        // if (err) cb(err)
        // else {

        // }

        if (err) return cb(err)

        const filtered = files.filter(file => path.extname(file) === `.${ext}`)

        cb(undefined, filtered)
    })
}

module.exports = filterFilesByExtension