
console.log(isNumber(10));
console.log(isNumber(undefined) === false);
console.log(isNumber(NaN) === false);
console.log(isNumber('a4') === false);
console.log(isNumber('10') === false);
console.log(isNumber('10.5') === false);
console.log(isNumber('9876a') === false);
console.log(isNumber('') === false);
console.log(isNumber('\t') === false);
console.log(isNumber('1234\t') === false);
