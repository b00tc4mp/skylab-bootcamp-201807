//const operate = require('./math')
//import operate from './math' // not supported yet

const { operate } = require('./math')

let a, oper, b

a = 123, oper = 'add', b = 654
console.log(operate(a, oper, b) === a + b) // true

a = 1234, oper = 'sub', b = 654
console.log(operate(a, oper, b) === a - b) // true

a = 123, oper = 'mul', b = 7654
console.log(operate(a, oper, b) === a * b) // true

a = 12345, oper = 'div', b = 7654
console.log(operate(a, oper, b) === a / b) // true

a = 0.2, oper = 'add', b = -0.5
//console.log(operate(a, oper, b) === 0.3) // WARN false!!! 
//console.log(((operate(a, oper, b)) ** 2) ** 0.5 - 0.3 < Number.EPSILON) // HORROR! cannot actually check 'operate' works fine, returns positive or negative, etc.
console.log(operate(a, oper, b) === a + b)

