const fs = require('fs')
const path = require('path')

function filterFilesByExtension(dir, ext) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) return reject(err)
    
            const filtered = files.filter(file => path.extname(file) === `.${ext}`)
    
            resolve(filtered)
        })
    })
}

module.exports = filterFilesByExtension