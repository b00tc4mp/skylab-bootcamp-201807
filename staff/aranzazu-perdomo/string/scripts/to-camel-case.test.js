console.log(toCamelCase('hello world')=== 'helloWorld');//true
console.log(toCamelCase('hola Mundo')=== 'holaMundo');//true
console.log(toCamelCase('HELLO WORLD')=== 'helloWorld');//true
console.log(toCamelCase('\thello\tworld\n')=== 'helloWorld');//true
console.log(toCamelCase('@HELLO#WORLD$')=== 'helloWorld');//true