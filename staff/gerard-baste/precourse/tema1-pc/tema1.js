//a) Puedes contar cuantas letras tiene tu nombre?

function myName(name) {
	console.log('my name ' + name + ' have ' + name.length + ' letters');
}
myName('Gerard');

//b) Añade tu apellido e indica en que posición del string empieza (prueba a buscar el espacio entre el nombre y el apellido):

function surnameStarts(myName) {
	for (var i = 0; i <= myName.length - 1; i++) {
		if (myName[i] == " ") {
			return console.log("Your first last name starts on position " + (i + 1));
		}
	}
}

surnameStarts("Gerard Baste");


//c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre (lo que haya antes del espacio):

function surnameStarts(myName) {
	for (var i = 0; i <= myName.length - 1; i++) {
		if (myName[i] == " ") {
			return console.log(myName.slice(0, i));
		}
	}
}

surnameStarts("Gerard Baste");


//d) Ahora, solo tu apellido.

function surnameStarts(myName) {
	for (var i = 0; i <= myName.length - 1; i++) {
		if (myName[i] == " ") {
			return console.log(myName.slice(i, myName.length));
		}
	}
}

surnameStarts("Gerard Baste");


//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.


function surnameStarts(myName) {
	for (var i = 0; i <= myName.length - 1; i++) {
		if (myName[i] == " ") {
			var surname = (myName.slice(i, myName.length));

			return console.log(myName + ' ,' + surname);
		}
	}
}

surnameStarts("Gerard Baste");

console.log(myFirstString + ", " + myNewString); // Tony Stark, Stark



//e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.

function surnameStarts(myName) {

	var separated = myName.split(' ');

	separated[0] = "Mr.";
	return console.log('Hello ' + separated[0] + separated[1]);

}

surnameStarts("Gerard Baste");

console.log(myNewString); // Hello, Mr. Stark 


//f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.

function surnameStarts(myName) {

	var separated = myName.split(' ');
	var result = (separated[1]);
	return console.log(result.toUpperCase());

}

surnameStarts("Gerard Baste");


console.log(mySelection); // my lastname is STARK
//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.

function surnameStarts(myName) {

	var separated = myName.split(' ');
	var name = separated[0] + ' is awsome';
	return console.log(name);
}

surnameStarts("Gerard Baste");


var something = myFirstString + "is awesome";
// console.log(something) \\ "Tony is awesome"

//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?

function initials(myName) {

	var separated = myName.split('');
	var initial = [];
	for (var i = 0; i < separated.length; i++) {
		if (separated[i] === " ") {
			initial.push(separated[i + 1]);
		}
	}
	return console.log(separated[0] + '.' + initial);
}
initials("Gerard Baste");


console.log(myFirstLastnameLetters); // S.Y

//a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"

function surnameSeparated(myName) {

	var separated = myName.split('');
	var name = [];
	for (var i = 0; i < separated.length; i++) {
		if (separated[i] !== " ") {
			name.push(separated[i] + '/');
		} else {}
	}
	console.log(name.join(''));
}
surnameSeparated("Gerard Baste");

console.log(myName); // T/O/N/Y/S/T/A/R/K

//b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"

function surnameSeparated(myName) {
	var separated = myName.split('');
	for (var i = 0; i < separated.length; i++) {
		if (separated[i] === " ") {
			var result = separated.slice(i + 1, separated.length);
		}
	}
	console.log(result.join('|').toString());
}
surnameSeparated("Gerard Baste");


console.log(myName); // S|T|A|R|K

//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)

function slashName(myName) {
	var parts = myName.split(' ');
	for (var i = 0; i < parts[0].length; i++) {
		console.log(i + 1 + 'º ' + parts[0][i].toUpperCase());

	}
}

slashName("Gerard Baste");

console.log(myName); // 1º T, 2º O, 3º N, 4º Y


//d)Como en el ejercicio anterior, pero seleccionando tu apellido

function slashName(myName) {
	var parts = myName.split(' ');
	var x = myName.indexOf(" ");
	for (var i = 0; i < parts[1].length; i++) {
		console.log(i + x + 2 + 'º ' + parts[1][i].toUpperCase());
	}
}
slashName("Gerard Baste");

	//e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings

	function initials(myName) {
		var lettersString = myName.join(' ');
		var result = [];
		for (var i = 0; i < lettersString.length; i++) {
			if (lettersString[i] === ' ') {
				result.push(lettersString[i + 1]);
			}
		}
		return console.log(lettersString[0] + '.' + result);
	}
initials(['Gerard', 'Baste']);

console.log(myInitials); // T.S

//f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, y además añade en otra posicion tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.

function myAge(myInfo) {
	console.log('My Name is ' + myInfo[0] + " and i'm " + myInfo[2] + ' years');
}

myAge(['Gerard', 'Baste', 32]);

console.log(mySelector); // My name is TONY and i'm 40 years old

//g) Prepara una función para añadir tu City a la array, muestra un mensaje mostrando el contenido de toda la array, así aseguraremos los cambios.

function myAge(myInfo) {
	myInfo.push('Barcelona');
	console.log(myInfo.toString());
}
myAge(['Gerard', 'Baste', 32, ]);

console.log(myCityAdd); // City added to array! => Tony, Stark, 40, New York

//h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.

var dataToAdd = '';
var arr = ['Gerard', 'Baste', 32];

function adding(city) {
	arr.push(city);
	dataToAdd = city;
	console.log(arr.toString());
	console.log(dataToAdd);
}
adding('Barcelona');

function deleting(dataToAdd) {
	var index = arr.indexOf(dataToAdd);
	if (index > -1) {
		arr.splice(index, 1);
	}
	console.log(arr);
}

deleting(dataToAdd);

myCityAdd(); // City added to array! => Tony, Stark, 40, New York
myCityDelete(); // City deleted! => Tony, Stark, 40


//j) Ahora, elimina el nombre y asegura los cambios Resources: https://www.w3schools.com/jsref/jsref_shift.asp

var dataToAdd = '';
var arr = ['Gerard', 'Baste', 32];

function adding(city) {
	arr.push(city);
	dataToAdd = city;
	console.log(arr.toString());
	console.log(dataToAdd);
}
adding('Barcelona');


function deletingCity(dataToAdd) {
	var index = arr.indexOf(dataToAdd);
	if (index > -1) {
		arr.splice(index, 1);
	}
	console.log(arr);
}

deletingCity(dataToAdd);

function deletingName(name) {
	var index = arr.indexOf(name);
	if (index > -1) {
		arr.splice(index, 1);
	}
	console.log(arr);
}

deletingName('Gerard');

//k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, como podria hacer para introducirlo en la primera posición? Resources: https://www.w3schools.com/jsref/jsref_splice.asp

var dataToAdd = '';
var arr = ['Gerard', 'Baste', 32];

function adding(city) {
	arr.push(city);
	dataToAdd = city;
	console.log(arr.toString());
	console.log(dataToAdd);
}
adding('Barcelona');


function deletingCity(dataToAdd) {
	var index = arr.indexOf(dataToAdd);

	if (index > -1) {
		arr.splice(index, 1);
	}
	console.log(arr);
}

deletingCity(dataToAdd);

function deletingName(name) {
	var index = arr.indexOf(name);
	if (index > -1) {
		arr.splice(index, 1);
	}
	console.log(arr);
}

deletingName('Gerard');

function addName(name) {
	arr.unshift(name);
	console.log(arr);
}

addName('Gerard');

//l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.

var result = [];

function multByTwo(nums) {
	var mult = nums.map(function (x) {
		result.push(x * 2);
	});
	console.log(result.toString());
}

multByTwo([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// numbers = [...]
// var multByTwo = numbers.map(...)


//l1) Reformula la función para que puedas especificar por cual número debería multiplicar cada elemento de la array.

var result = [];

function multByTwo(nums, mult) {
	var mult = nums.map(function (x) {
		result.push(x * mult);
	});
	console.log(result.toString());
}

multByTwo([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3);

// var num = 3; // cada número se multiplicará por 3
// function multByNum(num){
//     var arrayMult = numbers.map(...)
//     return arrayMult
// }
// Resource: https://www.w3schools.com/jsref/jsref_map.asp

//m) Podrías mostrarlos en el orden inverso? Resources: https://www.w3schools.com/jsref/jsref_sort.asp

function multByTwo(nums, mult) {

	var mult = nums.map(function (x) {
		result.push(x * mult);
	});
	result.sort(function (a, b) {
		return b - a;
	});
	console.log(result);
}

multByTwo([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3);

//n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?

function manipulateName(name) {
	var joinName = name.join('').toUpperCase();
	console.log(joinName);

	var joinName = name.join('').toUpperCase();
	var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var acc = 0;
	var emptyArr = [];

	for (var i = 0; i < letters.length; i++) {
		var match = joinName.indexOf(letters[i]);
		//console.log(letters[i] + ' ' + match);
		if (match > -1) {
			//console.log('La letra ' + letters[i] + ' se repite ' + acc + ' veces');
			emptyArr.push(letters[i])
		}
	}
	console.log(emptyArr);

	for (var i = 0; i < emptyArr.length; i++) {
		var repeat = 0;
		for (var j = 0; j < joinName.length; j++) {
			if (emptyArr[i] === joinName[j]) {
				repeat++;
			}
		}
		console.log('la letra ' + emptyArr[i] + ' se repite ' + repeat);
	}
}
manipulateName(['Gerard', 'Baste']);

//n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras

function manipulateName(name) {

	var joinName = name.join('').toUpperCase();
	var letters = joinName;
	var acc = 0;
	var emptyArr = [];
	var result = [];

	for (var i = 0; i < letters.length; i++) {
		var match = joinName.indexOf(letters[i]);
		//console.log(letters[i] + ' ' + match);

		if (match > -1) {
			//console.log('La letra ' + letters[i] + ' se repite ' + acc + ' veces');
			emptyArr.push(letters[i]);
		}
	}

	for (var i = 0; i < emptyArr.length; i++) {
		var repeat = 0;
		for (var j = 0; j < joinName.length; j++) {
			if (emptyArr[i] === joinName[j]) {
				repeat++;
			}
		}
		if (repeat === 1) {
			result.push(emptyArr[i]);
		}

	}
	console.log('My name is ' + result.join(''));
}
manipulateName(['Gerard', 'Baste']);

//a) Que hora es? Declara la hora como número y devuelvela como String

function time(whatTime) {
	console.log("I'ts " + whatTime.toString() + " of morning");
}

time(9.45);

console.log(myString + myNumberStringify); // I'ts 10.45 of morning
// Hint => https://www.w3schools.com/jsref/jsref_tostring_number.asp

//b) Nono, que hora exactamente? Dime la hora sin minutos!

function time(whatTime) {

	console.log("I'ts around " + Math.round(whatTime) + " of morning");
}

time(9.45);

console.log(myString); // It's around 10 of morning
//c) Ahora, declara tu hora y muéstrala redondeada.

function time(whatTime) {

	console.log("I'ts around " + Math.round(whatTime) + " of morning");
}

time(9.45);

console.log(...(10.34)); // 11!
// Hint => https://www.w3schools.com/jsref/jsref_round.asp

// //d) Hagamos una calculadora. Primero, la suma. Crea variables con valores distintos y súmalos.

// console.log(sum) //The sum of 7+3 is 10
// //d1) Añade la resta...

// console.log(sum + rest) // The sum and rest of 7 and 3 is 10 and 4 
// //d2) La multiplicación...

// console.log(sum + rest + mult) // 10, 4 and 21
// d3) Y, por ultimo, la división.

// console.log(sum + rest + mult + div) // 10, 4, 21 and 2.3
// d4) Ahora, intenta multiplicar un número por una string, que devuelve?

// console.log(10*"hour") // ....?!
// e) Podemos controlar este error con un condicional if?

// console.log(10*"hour") // You can't do this operation!