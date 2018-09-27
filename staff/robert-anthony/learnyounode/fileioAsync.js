var fs = require('fs')

const buff = fs.readFileSync(process.argv[2]);

const n = buff.toString().split("\n").length -1;

console.log(n)