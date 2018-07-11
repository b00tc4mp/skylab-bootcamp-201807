console.log(toCamelCase('hello world') === 'helloWorld'); // true
console.log(toCamelCase('Hola Mundo') === 'holaMundo'); // true
console.log(toCamelCase('HELLO WORLD') === 'helloWorld'); // true
console.log(toCamelCase(' hello\tworld\n') === 'helloWorld'); // true
console.log(toCamelCase('@HELLO#WORLD$') === 'helloWorld'); // true
console.log(toCamelCase('Hola') === 'hola'); // true
console.log(toCamelCase('HELLO') === 'hello'); // true
console.log(toCamelCase('aBrACAdaBrA') === 'abracadabra'); // true
console.log(toCamelCase('i love js') === 'iLoveJs'); // true
console.log(toCamelCase('# @ | & % = ?') === ''); // true


// console.log(toCamelCase('HalloWelt')==='halloWelt'); // true // ESTE COMO PRUEBA DE CRACK!!!!


