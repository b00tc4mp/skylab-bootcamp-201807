// const list = require('./make-it-modular')

// const path = process.argv[2]
// const extension = process.argv[3]

// function callback(err, res) {
//     if(err) console.log(err)
//     else {
//         res.forEach(result => console.log(result))    
//     }
// }

// list(path, extension, callback) 


const filteredFiles = require('./make-it-modular')

const { argv: [, , dir, ext] } = process

filteredFiles(dir, ext, (err, files) => {
    if (err) throw err
    files.forEach(file => console.log(file))
}) 