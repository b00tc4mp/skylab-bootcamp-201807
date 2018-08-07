const { operate } = require('./math')

const [, , a, oper, b] = process.argv

try {
    console.log(operate(parseFloat(a), oper, parseFloat(b)))
} catch(err) {
    console.log(`wrong parameters, please use as follows: 

$ node calculator <operand> <operation> <operand>
    
    operand     A number
    operation   Any valid operation: add, sub, mul, div`)
}
