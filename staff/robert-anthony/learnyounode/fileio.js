var fs = require('fs')

const [,, filename] = process.argv

const buff = fs.readFileSync(filename);

const n = buff.toString().split("\n").length -1;

console.log(n)