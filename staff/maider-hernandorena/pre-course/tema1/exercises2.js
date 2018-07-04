//*c, *d, *n, *n1
//Arrays
//a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"
var myName = ["Maider", "Hernandorena"];;
console.log (myName[0].split ("").join("/") +"/"+ myName[1].split ("").join("/"));

//b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"
var myLastName = myName[1];
console.log (myLastName.split ("").join("|"));

//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)
var myFirstName = myName[0];
for ( i=0; i < myFirstName.length; i++) {
    console.log (myFirstName.charAt(i) + myFirstName.indexOf("Maider"));
}

//d) Como en el ejercicio anterior, pero seleccionando tu apellido
for ( i=0; i < myLastName.length; i++) {
    console.log (myLastName.charAt(i) + myLastName.indexOf("Hernandorena"));
}

//e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings
console.log(myFirstName[0]+"."+myLastName[0]);

//f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, y además añade en otra posicion tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.
myName.push(23);
console.log ("My name is "+ myName[0] + " and i'm " + myName[2] + " years old");

//g) Prepara una función para añadir tu City a la array, muestra un mensaje mostrando el contenido de toda la array, así aseguraremos los cambios.
function myCityAdd(city){
console.log (myName);
}
myCityAdd(myName.push("Beasain"));

//h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.
function myCityDelete(cityDelete){
console.log (myName);
}
myCityAdd(myName.pop("Beasain"));

//j) Ahora, elimina el nombre y asegura los cambios
function myNameDelete(nameDelete){
console.log (myName);
}
myCityAdd(myName.shift("Maider"));

//k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, como podria hacer para introducirlo en la primera posición? 
function myNameAdd(nameAdd){
console.log (myName);
}
myCityAdd(myName.unshift("Maider"));

//l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.
var numbers = [0,1,2,3,4,5,6,7,8,9,10];
var multByTwo = numbers.map(function(x){
	return x*2;
});
console.log(multByTwo);

//l1) Reformula la función para que puedas especificar por cual número debería multiplicar cada elemento de la array
var num = 3;
var arrayMult = numbers.map(function (x) {
    return x*num;
});
console.log(arrayMult);

//m) Podrías mostrarlos en el orden inverso?
console.log(arrayMult.reverse());

//n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?
function repeatLetters(text){
	var count = {};
	text.split('').forEach(function(s) {
		count[s] = count[s] ? count[s]+1 : 1;
	});
	return count;
}
console.log(repeatLetters("Maider,Hernandorena"));

//n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras
