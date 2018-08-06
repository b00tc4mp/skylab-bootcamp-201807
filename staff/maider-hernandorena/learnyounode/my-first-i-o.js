var fs = require('fs')

const str = (fs.readFileSync('./baby-steps.js')).toString()

console.log(str)