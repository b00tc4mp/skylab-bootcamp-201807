const fs = require('fs')

const { argv: [, , file] } = process

// let numOfBreaks

fs.readFile(file, 'utf8', (err, text) => {
    if (err) throw err

    const numOfBreaks = text.split('\n').length - 1
    // numOfBreaks = text.split('\n').length - 1

    console.log(numOfBreaks)
})

// console.log(numOfBreaks)



