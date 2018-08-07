// const fs = require('fs')
// const path = require('path')

// module.exports = function (dir, filterStr, callback) {
//   fs.readdir(dir, function (err, list) {
//     if (err) {
//       return callback(err)
//     }

//     list = list.filter(function (file) {
//       return path.extname(file) === '.' + filterStr
//     })

//     callback(null, list)
//   })
// }


const fs = require('fs')
const path = require('path')

function filterByExt(dir, ext, cb) {
let results = []
    fs.readdir(dir, function (err, list) {
        if (err) return cb(err)
        var extension = '.'+ext
        for (let index = 0; index < list.length; index++) {
    
            if(path.extname(list[index]) == extension){
                results.push(list[index])
            }    
        }

       return cb(undefined, results)

    })

}

module.exports = filterByExt