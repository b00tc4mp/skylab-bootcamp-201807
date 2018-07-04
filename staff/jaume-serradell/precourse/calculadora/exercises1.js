//Strings
//a) Puedes contar cuantas letras tiene tu nombre?
function manipulateName(name) {
	console.log('My name has ' + name.length + ' letters');
}
manipulateName('Jaume Serradell');

//b) Añade tu apellido e indica en que posición del string empieza (prueba a buscar el espacio entre el nombre y el apellido):
function manipulateName(name) {
	var positionName = name.indexOf(' ')+1; 
	console.log('Your lastName starts on position ' + positionName);
}
manipulateName('Jaume Serradell');

//c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre (lo que haya antes del espacio):
function manipulateName(name) {
	var firstName = name.substr(0, name.indexOf(' '));
	console.log('My Name is ' + firstName);
}
manipulateName('Jaume Serradell');

//d) Ahora, solo tu apellido.
function manipulateName(name) {
	var result = name.substr(name.indexOf(' ')+1);
	console.log('My lastName is ' + result);
}
manipulateName('Jaume Serradell');

//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.
function manipulateName(name) {
	var firstName = name.substr(0, name.indexOf(' '));
	var lastName = name.substr(name.indexOf(' ')+1);
	var nameComplete = firstName + ' ' + lastName;
	console.log(nameComplete + ', ' + lastName);
}
manipulateName('Jaume Serradell');

//e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.
function manipulateName(name) {
	var nameReplace = name.replace(name.substr(0, name.indexOf(' ')), 'Mr.');
	console.log('Hello, ' + nameReplace);
}
manipulateName('Jaume Serradell');

//f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.
function manipulateName(name) {
	var lastName = name.substr(name.indexOf(' ')+1).toUpperCase();
	console.log('my lastName is ' + lastName);
}
manipulateName('Jaume Serradell');

//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.
function manipulateName(name) {
	var result = name.substr(0, name.indexOf(' ')).concat(' is awesome');
	console.log(result);	
}
manipulateName('Jaume Serradell');

//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?
function manipulateName(name) {
	var result = name.substr(0,1) + '.' + name.substr(name.indexOf(' ')+1,1);
	console.log(result);
}
manipulateName('Jaume Serradell');

//Arrays
//a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"
function manipulateName(name) {
	var emptyArr = [];
	var joinName = name.join('');
	for(var i=0; i<joinName.length; i++) {
		emptyArr.push(joinName[i] + '/');
	}

	console.log(emptyArr.join('').toUpperCase());
}
manipulateName(['Jaume', 'Serradell']);

//b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"
function manipulateName(name, position) {
	var emptyArr = [];
	var joinName = name[position];
	
	for(var i=0; i<joinName.length; i++) {
		emptyArr.push(joinName[i] + '|');
	}
	console.log(emptyArr.join('').toUpperCase());
}
manipulateName(['Jaume', 'Serradell'], 1);

//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)
function manipulateName(name, position) {
	var emptyArr = [];
	var joinName = name[position].toUpperCase();
	
	for(var i=0; i<joinName.length; i++) {
		emptyArr.push(i+1 + 'º ' + joinName[i]);
	}
	console.log(emptyArr.join(', ').toString());
}
manipulateName(['Jaume', 'Serradell'], 0);

//d)Como en el ejercicio anterior, pero seleccionando tu apellido
function manipulateName(name, position) {
	var emptyArr = [];
	var joinName = name[position].toUpperCase();
	
	for(var i=0; i<joinName.length; i++) {
		emptyArr.push(i+name[0].length + 'º ' + joinName[i]);
	}
	console.log(emptyArr.join(', ').toString());
}
manipulateName(['Jaume', 'Serradell'], 1);

/*
e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el 
ejercicio h de la sección de strings
*/
function manipulateName(name) {
	
	var firstName = name[0].substr(0,1)
	var lastName = name[1].substr(0,1);
	console.log(firstName + '.' + lastName);
}
manipulateName(['Jaume', 'Serradell']);

/*
f) Ahora, reformula la array, introduciendo tu nombre en primera posición,
tu apellido en segunda, y además añade en otra posicion tu edad. Muestra por
pantalla solo tu nombre y tu edad en un solo mensaje.
*/
function manipulateName(name) {
	
	console.log('My name is ' + name[0] + ' and I\'m ' + name[2] + ' years old');
}
manipulateName(['Jaume', 'Serradell', 36]);

/*
g) Prepara una función para añadir tu City a la array, muestra un mensaje
mostrando el contenido de toda la array, así aseguraremos los cambios.
*/
function myCityAdd() {

    var myPerson = ['Jaume', 'Serradell', 36];
    console.log('Este es tu array myPerson => ' + myPerson);
	var userPrompt = prompt('Que ciudad quieres añadir?');

	if(userPrompt) {
		myPerson.push(userPrompt);
	} else {
		alert('Tienes que introducir una ciudad!!!');
		myCityAdd();
	}

	return myPerson;
}
var addCity = myCityAdd();
console.log('Ciudad añadida al array! => ' + addCity);

//h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.
function myCityDelete() {

	var userPrompt = prompt('Que ciudad quieres eliminar?');
	
	if(addCity[addCity.length-1] === userPrompt) {
		addCity.pop(userPrompt);
	} else {
		alert('Esta no es la ciudad a borrar!!!');
		myCityDelete();
	}

	return addCity;
}
var deleteCity = myCityDelete();
console.log('Ciudad borrada! => ' + deleteCity);

//j) Ahora, elimina el nombre y asegura los cambios
function deleteObject() {
	var myPerson = deleteCity;
	console.log('Este es tu array myPerson => ' + myPerson);
	var userPrompt = parseInt(prompt('Que quieres borrar de tu persona?\n1-Nombre\n2-Apellido\n3-Edad'));

	//Function para borrar cualquier elemento del array
	function deleteElements(num) {
		var index = myPerson.indexOf(myPerson[num]);
		if(index > -1) {
			myPerson.splice(index,1)
		}

		return myPerson;
	}
	
	if(userPrompt === 1) {
		myPerson.shift();
		console.log('Se ha borrado tu nombre, el array queda así: ' + myPerson);	
	} else if (userPrompt === 2) {
		deleteElements(1);
		console.log('Se ha borrado tu apellido, el array queda así: ' + myPerson);
	} else if (userPrompt === 3) {
		myPerson.pop();
		console.log('Se ha borrado tu edad, el array queda así: ' + myPerson);
	}

	return myPerson;
}
var deleteIndex = deleteObject();

/*
k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la
última posición, como podria hacer para introducirlo en la primera posición?
*/
var position = 0;

function addElement() {
	
	var myPerson = deleteIndex;
	console.log('Este es tu array original => ' + myPerson);
	var userPrompt = parseInt(prompt('Que quieres añadir de tu persona?\n1-Nombre\n2-Apellido\n3-Edad'));
	var userPrompt2 = prompt('Que valor quieres introducir?');

	if(userPrompt === 1) {
        myPerson.unshift();
		position = '0';
	} else if (userPrompt === 2) {
		myPerson.splice(1, 0, userPrompt2);
		position = '1';
	} else if (userPrompt === 3) {
		myPerson.push();
		position = '2';
	}

	return myPerson;
}
var addIndex = addElement();
console.log('Elemento añadido a la posición ' + position + ' del array => ' + addIndex);

//l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.
function manipulateNumbers(nums) {

	var multByTwo = nums.map(function(obj){
		return obj * 2;
	})

	console.log(multByTwo);
}
manipulateNumbers([0,1,2,3,4,5,6,7,8,9,10]);

/*
l1) Reformula la función para que puedas especificar por cual número debería multiplicar
cada elemento de la array.
*/
function manipulateNumbers(nums, numPerMult) {

	var multByTwo = nums.map(function(obj){
		return obj * numPerMult;
	})

	console.log(multByTwo);
}
manipulateNumbers([0,1,2,3,4,5,6,7,8,9,10], 4);

//m) Podrías mostrarlos en el orden inverso?
function manipulateNumbers(nums, numPerMult) {

	var multByTwo = nums.map(function(obj){
		return obj * numPerMult;
	})

	console.log(multByTwo.reverse());
}
manipulateNumbers([0,1,2,3,4,5,6,7,8,9,10], 4);

//n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?  // Tony Stark, the letter 'T' => 2 times.
function manipulateName(name) {
	
	var joinName = name.join('').toUpperCase();
	var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var emptyArr = [];
	
	//For para pushear las letras que coinciden entre el nombre i str letters
	for (var i=0; i<letters.length; i++) {
		var match = joinName.indexOf(letters[i]);

		//Hace la comprobación con indexOf y solo pushea las letras que coinciden con el nombre, las que no son -1
		if(match !== -1) {
			emptyArr.push(letters[i])
		}
	}

	//For para recorrer el array con las letras que pusheadas que han sido encontradas en el nombre
	for(var i=0; i<emptyArr.length; i++) {
		var counter = 0;

		//For para recorrer el nombre
		for (var j=0; j<joinName.length; j++) {

			//Cada vez que encuentre una coincidencia entre las letras del array y el nombre, suma 1 al contador
			if(emptyArr[i] === joinName[j]) {
				counter++;
			}
		}
		
		//Si el contador es mayor o igual que 2 (que se repiten más veces), príntamelas
		if(counter >= 2) {
			console.log(name.join(' ') + ', the letter \'' + emptyArr[i] + '\' => ' + counter + ' times');		
		}
	}
}
manipulateName(['Jaume', 'Serradell']);

//n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras   /// ARREGLAR ////
function manipulateName(name) {
	
	//Convierte el array en un string y lo junta todo en un sola palabra. También lo pone todo en mayúsculas
	var joinName = name.join('').toUpperCase();
	var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var emptyArr = [];

	for (var i=0; i<letters)
}
manipulateName(['Jaume', 'Serradell']);



//Numbers
//a) Que hora es? Declara la hora como número y devuelvela como String
function timeNow() {
	var date = new Date();
	var fullDate = date.getHours() + '.' + date.getMinutes();
	console.log(typeof fullDate);
	var dayTime = '';
	
	if(fullDate >= '5.00' && fullDate <= '11.59') {
		dayTime = 'of morning';
	} else if(fullDate >= '12.00' && fullDate <= '19.59') {
		dayTime = 'of evening';
	} else {
		dayTime = 'of night';
	}

	console.log('It\'s ' + date.getHours() + '.' + date.getMinutes() + ' ' + dayTime);
}
timeNow();

//b) Nono, que hora exactamente? Dime la hora sin minutos!
function timeNow() {
	var date = new Date();
	var fullDate = date.getHours();
	console.log(typeof fullDate);
	var dayTime = '';
	
	if(fullDate >= '5' && fullDate <= '11') {
		dayTime = 'of morning';
	} else if(fullDate >= '12' && fullDate <= '19') {
		dayTime = 'of evening';
	} else {
		dayTime = 'of night';
	}

	console.log('It\'s around ' + date.getHours() + ' ' + dayTime);
}
timeNow();

//c) Ahora, declara tu hora y muéstrala redondeada.
function hour() {
	var date = new Date();
	var fullDate = date.getHours() + '.' + date.getMinutes();
	console.log(Math.ceil(fullDate));
}
hour();

//d) Hagamos una calculadora. Primero, la suma. Crea variables con valores distintos y súmalos.
function operations(num1, num2) {
	var sum = num1 + num2;
	console.log('The sum of ' + num1 + '+' + num2 + ' is ' + sum);
}
operations(7,3);

//d1) Añade la resta...
function operations(num1, num2) {
	var sum = num1 + num2;
	var rest = num1 - num2;
	console.log('The sum and rest of ' + num1 + ' and ' + num2 + ' is ' + sum + ' and ' + rest);
}
operations(7,3);

//d2) La multiplicación...
function operations(num1, num2) {
	var sum = num1 + num2;
	var rest = num1 - num2;
	var mult = num1 * num2;
	console.log(sum + ', ' + rest + ' and ' + mult);
}
operations(7,3);

//d3) Y, por ultimo, la división.
function operations(num1, num2) {
	var sum = num1 + num2;
	var rest = num1 - num2;
	var mult = num1 * num2;
	var div = num1 / num2;
	console.log(sum + ', ' + rest + ', ' + mult + ' and ' + div.toFixed(1));
}
operations(7,3);

//d4) Ahora, intenta multiplicar un número por una string, que devuelve?
function operations(num1, num2) {
	var mult = num1 * num2;
	console.log(mult);
}
operations(10, 'hour');

//e) Podemos controlar este error con un condicional if?
function operations(num1, num2) {
	var mult = num1 * num2;
	if(isNaN(mult)) {
		console.log('You can\'t do this operation!')
	} else {
		console.log(num1 + ' * ' + num2 + ' = ' + mult)
	}
}
operations(10, 'hour');


