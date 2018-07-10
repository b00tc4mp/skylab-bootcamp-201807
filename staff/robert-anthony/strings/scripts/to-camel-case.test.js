
console.log(toCamelCase("hello world") === "helloWorld");
console.log(toCamelCase("Hola Mundo") === "holaMundo");
console.log(toCamelCase("HELLO WORLD") === "helloWorld");
//console.log(toCamelCase("HalloWelt")) === "hallowWelt";
console.log(toCamelCase("\thello\tworld\n") === "helloWorld");
console.log(toCamelCase("@HELLO#WORLD") === "helloWorld");
