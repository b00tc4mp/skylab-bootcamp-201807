const fs = require('fs')
const path = require('path')

const { argv: [, , dir, ext] } = process

// fs.readdir(dir, (err, files) => {
//     if (err) throw err

//     files.filter(file => file.endsWith(`.${ext}`)).forEach(file => console.log(file))
// })

fs.readdir(dir, (err, files) => {
    if (err) throw err

    files.filter(file => path.extname(file) === `.${ext}`).forEach(file => console.log(file))
})