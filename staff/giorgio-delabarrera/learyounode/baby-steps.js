const [ ,, ...numbers ] = process.argv

const result = numbers.reduce((accumulator, value) => {
  return accumulator + (new Number(value)).valueOf()
}, 0)

console.log(result)