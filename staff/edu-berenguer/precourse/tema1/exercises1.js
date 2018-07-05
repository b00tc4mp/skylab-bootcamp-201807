//STRINGS
//a) Puedes contar cuantas letras tiene tu nombre?
function showLetters(name){
	console.log("My name has " + name.length + " letters");
}
showLetters("Edu");

//b) Añade tu apellido e indica en que posición se encuentra
function firstName(name){
	var position = name.indexOf("B");
	console.log("Your first last name starts on position " + position);
}
firstName("Edu Berenguer");

//c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre.
var myName = "Edu Berenguer";

//Opción1
function showName(name){
	var position = name.indexOf("B");
	var newName = name.substr(0, position -1);
	console.log("My name is " + newName);
}
showName(myName);
//Opción2
function showName(name){
	var name = myName.split(" ");
	console.log("My name is " + name[0]);
}
showName(myName);

//d) Ahora, solo tu apellido.
function showLastName(name){
	var array = name.split(" ");
	console.log("My lastname is " + array[1]);
}
showLastName(myName);

//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.
function name(myFirstString){
	var array = myFirstString.split(" ");
	var myNewString = array[1];
	console.log(myFirstString + " ," + myNewString);
}
name("Edu Berenguer");

//e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.
function newName(name){
	var array = name.split(" ");
	var myNewString = "Hello, Mr." + array[1];
	console.log(myNewString);
}
newName("Edu Berenguer");

//f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.
function upperLastName(name){
	var array = name.split(" ");
	console.log("My lastname is " + array[1].toUpperCase());
}
upperLastName("Edu Berenguer");

//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.
function newName(myFirstString){
	var something = myFirstString + " is awesome";
	console.log(something);
}
newName("Edu");

//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?
function myFirstLastNameLetters(name){
	var position = name.indexOf("B");;
	var lastName = name.substr(position);
	console.log(name.substr(0,1) + "." + lastName.substr(0,1));
}
myFirstLastNameLetters("Edu Berenguer");

//ARRAYS
//a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"
function myArray(array){
	for(var i = 0; i < array.length; i++){
		var newArray = array[i].split("");
		console.log(newArray.join("/"));
	}
}
myArray(["Edu","Berenguer","Aragon"]);

//b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"
function myLastNameArray(array){
	var newArray = array[1];
	var lastName = newArray.split("");
	console.log(lastName.join("|"));

}
myLastNameArray(["Edu","Berenguer","Aragon"]);

//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)
function showPosition(array){
	var name = array[0];
	var newName = name.split("");
	for(var i = 0; i < newName.length; i++){

		console.log(i + 1 +"º " + newName[i]);
	}
}
showPosition(["Edu", "Berenguer","Aragon"]);

//d)Como en el ejercicio anterior, pero seleccionando tu apellido
function showPositionLastName(){
	var lastName = array[1];
	var newName = lastName.split("");
	for(var i = 0; i < newName.length;i++){
		console.log(i+1 + "º " + newName[i]);
	}

}
showPositionLastName(["Edu","Berenguer","Aragon"]);

//e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings
function myFirstLastNameLetters(array){
	console.log(array[0].substr(0,1) + "." + array[1].substr(0,1));
}
myFirstLastNameLetters(["Edu","Berenguer"]);

/*f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, 
y además añade en otra posicion tu edad. 
Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.*/
function mySelector(array){
	console.log("My name is" + array[0] + " and i'm " + array[2] + "years old");
}
mySelector(["Edu","Berenguer",33]);

/*g) Prepara una función para añadir tu City a la array, 
muestra un mensaje mostrando el contenido de toda la array, así aseguraremos los cambios.*/
var array = ["Edu","Berenguer",33];
function addCity(city){
	array.push(city);
	console.log("City added to array! => " + array);
}
addCity("Barcelona");

//h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.
function deleteCity(){
	array.pop();
	console.log("City deleted! => " + array);
}
deleteCity();

//j) Ahora, elimina el nombre y asegura los cambios 
function deleteName(){
	array.shift();
	console.log(array);
}
deleteName();

/*k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, 
como podria hacer para introducirlo en la primera posición?*/
function addName(name){
	array.splice(0,0,name);
	console.log(array);

}
addName("Edu");

//l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.
var numbers = [0,1,2,3,4,5,6,7,8,9,10];
function multByTwo(array){
	var byTwo = array.map(function(x){
		return x * 2 ;
	});
	console.log(byTwo);
}
multByTwo(numbers);

//m) Podrías mostrarlos en el orden inverso?
var numbers = [0,1,2,3,4,5,6,7,8,9,10];
function sortArray(array){
	var table = array.sort(function(a,b){
		return b-a;
	});
	console.log(table);
}
sortArray(numbers);

//n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?
var myName = ["Edu","Berenguer"];

function countLetters(array){
	var string = array[0].toLowerCase();
	var string1 = array[1].toLowerCase();
	var firstName = string.split("");
	var lastName = string1.split("");
	var totalName = firstName.concat(lastName);

	var max = 0;
	var moda = "";

	for(var i = 0; i<totalName.length;i++){
		var count = 0;
		for(var k = 0; k<totalName.length;k++){
			if(totalName[i] === totalName[k]){
				count++;
			}
			if(count > max){
				moda = totalName[k];
				max = count;
			}
	}
}
	console.log(array[0] + " " + array[1] + " the letter " + moda + " => " + max + " times.");
}
countLetters(myName);

//n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras
var myName = ["Edu","Berenguer"];

function countLetters2(array){
	var string = myName[0].toLowerCase();
	var string1 = myName[1].toLowerCase();
	var firstName = string.split("");
	var lastName = string1.split("");
	var total = firstName.concat(lastName);
	var moda = "";
	var max=0;

	for(var i = 0; i<total.length;i++){
		var count = 0;
		for(var k = 0; k<total.length;k++){
			if(total[i] === total[k]){
				count++;
				
			}
			if(count > 1){
				moda = total[i];
				var position = total.indexOf(moda);
				max = count;
				delete total[position];
			}

		}

	}
	//delete total.splice(-3);
	console.log(position);
	console.log(total);
	console.log(moda);
	//console.log(myName[0] + " " + myName[1] + " the letter " + letter + "=>" + count + " times.");
}
countLetters2(myName);
// Tony Stark, the letters => o, n, y, s, a, r, k are not repeated, the name is => Ony Sark

//NUMBERS
//a) Que hora es? Declara la hora como número y devuelvela como String
function returnTime(){
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var time = hours.toString() + "."+ minutes.toString();
	console.log("It´s " + time + " of morning");

}
returnTime();

//b) Nono, que hora exactamente? Dime la hora sin minutos
function returnHour(){
	var date = new Date();
	var hours = date.getHours();
	console.log("It´s around " + hours + " of morning");
}
returnHour();

//c) Ahora, declara tu hora y muéstrala redondeada.
function returnFixed(){
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var time = hours.toString() + "." + minutes.toString();
	time = parseInt(time);
	console.log(Math.round(time) + "!!");
}
returnFixed();

//d) Hagamos una calculadora. Primero, la suma.
function calculator(a,b){
	var sum = a + b; 
	console.log("La suma de " + a + " + " + b + " es " + sum );
}
sum(3,4);

//d1) Añade la resta...
function calculator2(a,b){
	var sum = a + b; 
	var subs = a - b;
	console.log("La suma y resta de " + a + " y " + b + " es " + sum + " y " + subs);

}
calculator2(3,4);

//d2) Y la multiplicación
function calculator3(a,b){
	var sum = a + b;
	var subs = a - b;
	var mult = a * b;
	console.log(sum + " , " + subs + " y " + mult);

}
calculator3(3,4);

//d3) Por último, la división
function calculator4(a,b){
	var sum = a + b;
	var subs = a - b;
	var mult = a * b;
	var div = a / b ;
	console.log(sum + " , " + subs + " , " + mult + " y " + div);
}
calculator4(3,4);

//d4) Ahora, intenta multiplicar un número por una string, que devuelve?
function multString(a,b){
	var mult = a * b;
	console.log(mult);
}
multString(2,"hello");
//Devuelve que no es un número

//e) Podemos controlar este error con un condicional if?
function mult(a,b){
	if(isNaN(a) || isNaN(b)){
		console.log("You cant do this operation!");
	}else{
		var total = a * b;
		console.log(total);
	}
}
mult();

















































































