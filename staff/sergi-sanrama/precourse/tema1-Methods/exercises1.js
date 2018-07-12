
//a) Puedes contar cuantas letras tiene tu nombre?
var myName = 'Sergi';

function countLetters (letters){
	var numLetters = letters.length;
	console.log('My name has '+ numLetters + ' letters');
}
countLetters(myName);

//b) Añade tu apellido e indica en que posición del string empieza (prueba a buscar el espacio entre el nombre y el apellido):

var myString = 'Sergi Sanrama';

console.log('Your last name starts on position '+ myString.indexOf(" ")); 


//c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre (lo que haya antes del espacio):

var myString = 'Sergi Sanrama';

function showTheName (myString){
	var myName = myString.substring(start, space);
	console.log('My name is '+ myName);
}

showTheName(myString);

//d) Ahora, solo tu apellido.

var myString = 'Sergi Sanrama';

function showTheLastName (myString){
	var myLastName = myString.substring(space);
	console.log('My lastname is' + myLastName);
}

showTheLastName(myString);

//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.

var myString = 'Sergi Sanrama';

function showTheLastName (myString){
	var myLastName = myString.substring(space);
	console.log(myString+ ','+myLastName);
}

showTheLastName(myString);


//e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.

var myString = 'Sergi Sanrama';

var newString = 'Hello, Mr. ';

function hiMr (myString){
	var myArray = myString.split(' ');
	console.log(newString + myArray[1]);
}

hiMr(myString);


//f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.

var myString = 'Sergi Sanrama';

function upMayus (myString){
	var myArray = myString.split(' ');
	var transform = myArray[1].toUpperCase();
	console.log('my lastname is ' + transform);
}

upMayus(myString);

//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.

var myString = 'Sergi Sanrama';

function upMayus (myString){
	var myArray = myString.split(' ');
	var transform = myArray[1].toUpperCase();
	console.log('my lastname is ' + transform);
}

var something = (upMayus(myString) + ' is awesome');
console.log(something);

//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?
var myString = 'Sergi Sanrama';

function myFirstLastnameLetters (myString){
	var myArray = myString.split(' ');
	console.log(myArray[0].substr(0,1) + '.' + (myArray[1].substr(0,1)));
}

myFirstLastnameLetters(myString);

//Arrays

//a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"

var myName = 'Sergi Sanrama Torrella';

function write (name){
	for (i = 0; i < myName.length ; i++){
		console.log(myName.charAt(i) + '/');
	}
}

write(myName);

//*****Error, en misma linea y no se trata como array.

var myName = 'Sergi Sanrama Torrella';

var myArray = myName.split(' ');

var primerElementLength = (5);

for (i = 0; i < 5; i++){
	var resultOne = myArray.charAt(5);
	console.log (resultOne);
}

console.log (resultOne);

//*****Error, si se trata como array, fallo con el length, cahpuzas reemplazando por 5.

//b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"
var fullName = 'Sergi Sanrama Torrella';

var fullArray = fullName.split(' ');

var apellido2 = fullArray[2];

for (i = 0; i < apellido2.length; i++){
	console.log(apellido2.charAt(i)+ '|');
}


//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)

var fullName = 'Sergi Sanrama Torrella';

var splitName = fullName.split(' ');

var myName = splitName[0];

for(i = 0; i < myName.length; i++){
	console.log((i+1) +'º '+ myName.charAt(i))
};

//d)Como en el ejercicio anterior, pero seleccionando tu apellido

var fullName = 'Sergi Sanrama Torrella';

var splitLastName = fullName.split(' ');

var myLastName = splitLastName[2];

for(i = 0; i < myLastName.length; i++){
	console.log((i+1) +'º '+ myLastName.charAt(i))
};


//e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings
var myName = 'Sergi Sanrama Torrella';
var myNameArray = myName.split (' ');
var myInitials = myNameArray.split('');

for (i = 0; i <myNameArray.length; i++){
	console.log(myInitials.charAt(i) + '.')
};

console.log(myInitials) // T.S

//f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, y además añade en otra posicion tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.

var misDatos = ['Sergi', 'Sanrama'];

misDatos.push(27);

console.log('My name is ' + misDatos[0] + " and i'm " + misDatos[2] + ' years old');

//g) Prepara una función para añadir tu City a la array, muestra un mensaje mostrando el contenido de toda la array, así aseguraremos los cambios.

var misDatos = ['Sergi', 'Sanrama'];

function myCityAdd (element){
	misDatos.push(element);
	console.log('City added to array!')
	for(i = 0; i< misDatos.length; i++){
		console.log(misDatos[i]);
	};
}
myCityAdd('Barcelona');

//h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.

var misDatos = ['Sergi', 'Sanrama'];

function myCityAdd (element){
	misDatos.push(element);
	console.log('City added to array!')
	for(i = 0; i< misDatos.length; i++){
		console.log(misDatos[i]);
	};
}

function myCityDelete (){
	misDatos.pop();
	console.log('City deleted!');
	for(i = 0; i< misDatos.length; i++){
		console.log(misDatos[i]);
	};
}
myCityAdd('Barcelona');
myCityDelete();

//j) Ahora, elimina el nombre y asegura los cambios Resources: https://www.w3schools.com/jsref/jsref_shift.asp

function myNameDelete(){
	misDatos.shift();
	for(i = 0; i< misDatos.length; i++){
		console.log(misDatos[i]);
	};
}
myNameDelete();

//k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, como podria hacer para introducirlo en la primera posición? Resources: https://www.w3schools.com/jsref/jsref_splice.asp

function addMyNameFirst(name){
	misDatos.unshift(name);
	for(i = 0; i< misDatos.length; i++){
		console.log(misDatos[i]);
	};
}
addMyNameFirst('Sergi');

//l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function multByTwo (){
	var result = numbers.map(function(x){
		return x*2;
	})
	for (i=0;i<result.length;i++){
		console.log(result[i]);
	}
}
multByTwo();

//l1) Reformula la función para que puedas especificar por cual número debería multiplicar cada elemento de la array.

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var multiplier = 3;

function multByTwo (multiplier){
	var result = numbers.map(function(x){
		return x*multiplier;
	})
	for (i=0;i<result.length;i++){
		console.log(result[i]);
	}
}
multByTwo(multiplier);

//m) Podrías mostrarlos en el orden inverso? Resources: https://www.w3schools.com/jsref/jsref_sort.asp

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var multiplier = 3;

function multByTwo (multiplier){
	var result = numbers.map(function(x){
		return x*multiplier;
	})
	for (i=0;i<result.length;i++){
		console.log(result[i]);
	}
}
numbers.reverse();
multByTwo(multiplier);

//Error incompleto, pendiente.

//n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?
//Pendiente
console.log(repeatLetters) // Tony Stark, the letter 'T' => 2 times.

//n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras
//Pendiente
console.log(repeatLetters) // Tony Stark, the letters => o, n, y, s, a, r, k are not repeated, the name is => Ony Sark

//a) Que hora es? Declara la hora como número y devuelvela como String
var hora = 10.45;
var horaToString = hora.toString()
console.log ("I'ts " + horaToString + ' of morning');

//b) Nono, que hora exactamente? Dime la hora sin minutos!
console.log(myString) // It's around 10 of morning

//c) Ahora, declara tu hora y muéstrala redondeada.
var hora = 17.57;
h = Math.round (hora);
console.log(h);

//d) Hagamos una calculadora. Primero, la suma. Crea variables con valores distintos y súmalos.
var a = 7; 
var b = 3; 
var sum = (a+b);
console.log(sum) //The sum of 7+3 is 10

//d1) Añade la resta...
var rest = (a-b);
console.log(rest);
console.log(sum + rest) // The sum and rest of 7 and 3 is 10 and 4 

//d2) La multiplicación...
var mult = (a*b);
console.log(mult);
console.log(sum + rest + mult) // 10, 4 and 21

//d3) Y, por ultimo, la división.
var div = (a/b);
console.log(div);
console.log(sum + rest + mult + div) // 10, 4, 21 and 2.3

//d4) Ahora, intenta multiplicar un número por una string, que devuelve?
// Error, project1.
console.log(10*"hour") // ....?!

//e) Podemos controlar este error con un condicional if?
//Controlado en project1.
console.log(10*"hour") // You can't do this operation!