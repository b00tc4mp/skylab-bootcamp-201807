fs = require('fs')

const [ ,, filename ] = process.argv

const getLineNumbers = path => {
  const bufferStr = fs.readFileSync(path).toString()

  return bufferStr.split('\n').length - 1
}

console.log(getLineNumbers(filename))