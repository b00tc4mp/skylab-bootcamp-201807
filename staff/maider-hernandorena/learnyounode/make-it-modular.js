// var fs = require('fs')

// function list(path, extension, callback) {
//     fs.readdir(path, function (err, data) {
//         if (err) {
//             return callback(err)
//         } else {
//             const res = []
//             for (var i = 0; i < data.length; i++) {
//                 if (data[i].match('.' + extension)) {
//                     res.push(data[i])
//                 }
//             }
//             return callback(null, res)
//         }
//     })
// }

// module.exports = list

const fs = require('fs')
const path = require('path')

function filteredFiles(dir, ext, callback) {
    fs.readdir(dir, (err, files) => {
        if (err) return callback(err)
        const filtered = files.filter(file => path.extname(file) === `.${ext}`)
        return callback(undefined, filtered)
    })
}

module.exports = filteredFiles