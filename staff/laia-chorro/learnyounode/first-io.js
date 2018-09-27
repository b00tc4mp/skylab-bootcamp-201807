var fs = require('fs')

const file = process.argv[2];
const bufferContent = fs.readFileSync(file)
const strContent = bufferContent.toString()
const arrayNewLine = strContent.split('\n')

console.log(arrayNewLine.length - 1);

  