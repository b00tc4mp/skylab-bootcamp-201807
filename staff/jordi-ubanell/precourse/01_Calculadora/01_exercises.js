// STRINGS
// a) Puedes contar cuantas letras tiene tu nombre?

function count(name){
var n = name.length;{
console.log (n);
}
}

count ("Triceratops")

// b) Añade tu apellido e indica en que posición del string empieza (prueba a buscar el espacio entre el nombre y el apellido):

function lastName(myName) {
	for (var i = 0; i <= myName.length - 1; i++) {
		if (myName[i] == " ") {
			console.log("Your last name starts on position " + (i + 1));
		}
	}
}

lastName("Jordi Ubanell");


// c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre (lo que haya antes del espacio):

function firstName(myName) {
		var name = myName.split(' ');
		console.log("My name is " + name[0]);
}

firstName("Jordi Ubanell");


// d) Ahora, solo tu apellido.

function firstName(myName) {
		var name = myName.split(' ');
		console.log("My name is " + name[1]);
}

firstName("Jordi Ubanell");


// d1) Iguala el resultado a una variable nueva e imprímela por pantalla.

function firstName(myName) {
		var name = myName.split(' ');
		var name2 = name[1];
		console.log(myName + ", "+ name2) ;
}

firstName("Jordi Ubanell");


// e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.

function firstName(myName) {
		var name = myName.split(' ');
		var name2 = name[1];
		var presentation = "Hello, Mr. " + name2;
		console.log(presentation) ;
}

firstName("Mr Ubanell");


// f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.

function firstName(myName) {
		var name = myName.split(' ');
		var name2 = name[1].toUpperCase();
		var presentation = "My last name is " + name2;
		console.log(presentation) ;
}

firstName("Mr Ubanell");


// g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.

function firstName(myName) {
		var name = myName.split(' ');
		var name2 = name[0];
		var presentation = name2 + " is awesome";
		console.log(presentation) ;
}

firstName("Jordi Ubanell");


// h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?

function firstName(myName) {
		var first = myName.charAt(0);
		var space = myName.indexOf(" ");
		var second = space + 1;
		var result = first+"."+myName.charAt(second);  
		console.log(result);
}

firstName("Jordi Ubanell");


// ARRAYS
// a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"

function slashName(myName){

		var name = myName.split('');
		var slash = name.join('/');
		console.log(slash.toUpperCase());
}

slashName("Jordi Ubanell");


// b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"

function slashName(myName){

		var name = myName.split(' ');
		var surname = name[1].toUpperCase();
		var separated = surname.split('');
		var result = separated.join('|');
		console.log(result);
}

slashName("Jordi Ubanell");


// c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)

function slashName(myName){
	var parts = myName.split(' ');
	for (var i = 0; i < parts[0].length; i++){
		
		console.log(i +1 + 'º ' + parts[0][i].toUpperCase());
			
	}
}

slashName("Jordi Ubanell"); 


// d)Como en el ejercicio anterior, pero seleccionando tu apellido

function slashName(myName){
	var parts = myName.split(' ');
	var x = myName.indexOf(" ");
	for (var i = 0; i < parts[1].length; i++)
{		
		console.log(i +x+2 + 'º ' + parts[1][i].toUpperCase());
			
	}
}

slashName("Jordi Ubanell"); 


// e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings

function firstName(myName) {
		var name = myName.split(' ');
		var name1 = name[0].toUpperCase();
		var age = name[2];
		var presentation = name1 + " " + age;
		console.log(presentation) ;
}

firstName("Jordi Ubanell 48");

// f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, y además añade en otra posicion tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.

function firstName(myName) {
		var name = myName.split(' ');
		var name1 = name[0].toUpperCase();
		var age = name[2];
		var presentation = "My name is " + name1 + " and i'm "+ age+" years old";
		console.log(presentation) ;
}

firstName("Jordi Ubanell 48");

// g) Prepara una función para añadir tu City a la array, muestra un mensaje mostrando el contenido de toda la array, así aseguraremos los cambios.

function myCity(city) {
	var data = ["Jordi", "Ubanell", 48];
	data.push(city);
		var presentation = "City added to array! => " + data;
        console.log(presentation);
}

myCity("Barcelona");

// h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.

function myCity(city) {
	var data = ["Jordi", "Ubanell", 48, "Barcelona"];
	data.pop(city);
	var presentation = "City deleted! => " + data;
	console.log(presentation);
}

myCity("Barcelona");

// j) Ahora, elimina el nombre y asegura los cambios

function surnameAge(city) {
	var data = ["Jordi", "Ubanell", 48, "Barcelona"];
	data.pop();
	data.shift();
	var presentation = "Name and city deleted! => " + data;
	console.log(presentation);
}

surnameAge();


// k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, como podria hacer para introducirlo en la primera posición?

function surnameAge(name) {
	var data = ["Ubanell", 48, "Barcelona"];
	data.pop();
	data.unshift(name);
	var presentation = "Name added to array! => " + data;
	console.log(presentation);
}

surnameAge("Jordi");


// l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.

function double(decimal){ 
	for (var i = 1; i < decimal.length+1; i++)
	{
		console.log(i*2);
	}
}

double([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


// l1) Reformula la función para que puedas especificar por cual número debería multiplicar cada elemento de la array.


function multiplyNum (num, multiplier){
	var array = num.map(function(x){
		return x*multiplier;
	})
	console.log(array);
}

multiplyNum([3, 45, 2, 99], 7);

// m) Podrías mostrarlos en el orden inverso? 

function multiplyNum (num, multiplier){
var array = num.map(function(x){
return x*multiplier;
})
console.log(array.reverse());
}

multiplyNum([3, 45, 2, 99], 7);


// n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?

function repeatLetters(name, letter) {
	var counter = 0;
	for(i=0;i<=name.length;i++) {
		if(name[i] === letter) {
			counter++;			
		}
	}
	console.log(name + ", the letter '" + letter.toUpperCase() + "' => " + counter + " times");
}

repeatLetters("Jordi Ubanell", 'l');


// n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras

function repeatLetters(name, letter) {
	for(i=0;i<=name.length;i++) {
		if(name[i] === letter) {
			var removed = name.splice(i, 1);
		}
	}
	console.log(name + ", the letters => " +  + " are not repeated, the name is => " +  );
}

repeatLetters("Jordi Ubanell", 'l');

NO FUNCIONA... paso a la següent

// NUMBERS
// a) Que hora es? Declara la hora como número y devuelvela como String

function numberToString (numbers){
		var moment = numbers.toString();
		
		console.log("It's " + moment + " of morning");
}

numberToString(10.45);


// b) Nono, que hora exactamente? Dime la hora sin minutos!

function numberToString (numbers){
		var moment = numbers.toFixed(0);
		
		console.log("It's " + moment + " of morning");
}

numberToString(10.45);


// c) Ahora, declara tu hora y muéstrala redondeada.


function numberToString (numbers){
		var moment = Math.round(numbers);
		
		console.log("It's " + moment + " of morning");
}

numberToString(10.34);


// d) Hagamos una calculadora. Primero, la suma. Crea variables con valores distintos y súmalos.

function calculator(a, b){
		var result = a + b;
		console.log(result);
}

calculator(3, 7)


// d1) Añade la resta...

function calculator(a, b){
		var sum = a + b;
		var rest = a - b;
		var result = "The sum and rest of " + a + " and " + b + " is " + sum + " and " + rest;
		console.log(result);
}

calculator(9, 7)


// d2) La multiplicación...

function calculator(a, b){
		var sum = a + b;
		var rest = a - b;
		var mult = a * b;
		var result = "The sum, rest and multiplication of " + a + " and " + b + " is " + sum + " and " + rest + " and " + mult;
		console.log(result);
}

calculator(9, 7)


// d3) Y, por ultimo, la división.

function calculator(a, b){
		var sum = a + b;
		var rest = a - b;
		var mult = a * b;
		var div = a / b;
		var result = "The sum, rest, multiplication and division of " + a + " and " + b + " is " + sum + " and " + rest + " and " + mult + " and " + div;
		console.log(result);
}

calculator(9, 7)


// d4) Ahora, intenta multiplicar un número por una string, que devuelve? ////////Devuelve NaN

function multString(a, b){
		var mult = a * b;
			if (isNaN(mult)){
			console.log("You can't do this operation!");
	}else{
		console.log('¿?¿?¿¿')
												}
}

multString(10, "hour")
