// to camel case test

console.log(toCamelCase('hello world') === 'helloWorld'); // true
console.log(toCamelCase('Hola Mundo') === 'holaMundo'); // true
console.log(toCamelCase('HELLO WORLD') === 'helloWorld'); // true
console.log(toCamelCase('\thello\tworld\n') === 'helloWorld'); // true
console.log(toCamelCase('@HELLO#WORLD$') === 'helloWorld'); // true




