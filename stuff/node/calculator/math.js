function operate(a, operation, b) {
    switch (operation) {
        case 'add':
            return a + b
            break
        case 'sub':
            return a - b
            break
        case 'mul':
            return a * b
            break
        case 'div':
            return a / b
            break
        default:
            throw new Error('cannot understand operation')
    }
}

//module.exports = operate
//export default operate // not supported yet

// NOTE that module.exports === exports => true

//exports.operate = operate
//module.exports.operate = operate

module.exports = {
    operate
}