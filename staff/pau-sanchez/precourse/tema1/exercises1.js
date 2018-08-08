//Strings
//a) Puedes contar cuantas letras tiene tu nombre?

//console.log(myName) // My Name has 4 letters 
//Check this: http://bfy.tw/AlDi 👈🏼

function howLonng (myName) {
	console.log("My name has "+myName.length+" letters");
};

howLonng("Pau");

//b) Añade tu apellido e indica en que posición se encuentra

//console.log(myString)// Your first last name starts on position 5


function firstLast (name) {
	var posicion = name.indexOf("Sanchez");
	console.log("Your first last name starts on position "+posicion);
};
firstLast("Pau Sanchez");

//c) Ahora, con tu apellido y nombre en la misma variable, muestra solo el nombre.

//console.log(myString) // My Name is Tony 

function justName (name){
var myName = name.match("Pau");
console.log("My name is "+myName);
};
justName("Pau Sanchez");



//d) Ahora, solo tu apellido.

//console.log(myString) // My lastname is Stark

function justLastName (name) {

var lastName = name.match("Sanchez");
console.log("My last name is "+lastName);
};
justLastName ("Pau Sanchez");


//d1) Iguala el resultado a una variable nueva e imprímela por pantalla.

//console.log(myFirstString +", " + myNewString) // Tony Stark, Stark

function justLastName (name) {

var lastName = name.match("Sanchez");
console.log(name+", "+lastName);
};
justLastName ("Pau Sanchez");





//e) Ahora, reemplaza tu nombre por "Mr/Ms" y vuelve a mostrar la variable con los cambios.

//console.log(myNewString) // Hello, Mr. Stark 

function mr (name) {
var titleName = name.replace("Pau", "Mr.");
console.log("Hello, "+titleName)
}
mr("Pau Sanchez");

//f) Selecciona tu apellido y transfórmalo a MAYÚSCULAS.

//console.log(mySelection) // my lastname is STARK

function justLastName (name) {

var lastName = name.slice(name.indexOf(" ")).toUpperCase();

console.log("My last name is"+ lastName)
}
justLastName ("Pau Sanchez");




//g) Ahora declara una variable nueva e igualala a la anterior variable sumándole, además, un mensaje.

//var something = myFirstString + "is awesome"
//console.log(something) \\ "Tony is awesome"


function nuevaVariable(text1){
var text2= " is awesome";
var text1plustext2 = text1 + text2; 
console.log(text1plustext2);
}
nuevaVariable("Tony");




//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?

//console.log(myFirstLastnameLetters) // S.Y

function iniciales (fullname){
var firstInitial = fullname.slice(0,1);
var indiceEmpiezaApellido = fullname.indexOf(" ") + 1;
var secondInitial = fullname.slice((indiceEmpiezaApellido),(indiceEmpiezaApellido + 1));
console.log(firstInitial+"."+secondInitial);
};
iniciales("Pau Sanchez");



Arrays
//a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"

//console.log(myName) // T/O/N/Y/S/T/A/R/K

function ejercicioA (par) {
	var myNameArray = [par];
	console.log(myNameArray.toString().toUpperCase().replace(/\s/g,"").split("").join(" ").replace(/\s/g,"/"));
	
};

ejercicioA("Pau Sanchez");

//b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|"

//console.log(myName) // S|T|A|R|K

function ejercicioB (par) {
	var myNameArray = [par];
	console.log(myNameArray.toString().toUpperCase().split("").join(" ").replace(/\s/g,"|"));
	
};

ejercicioB("Sanchez");



//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for)

//console.log(myName) // 1º T, 2º O, 3º N, 4º Y
//Resource: https://www.w3schools.com/jsref/jsref_split.asp

function ejercicioC (myfullName) {
	var onlyName = myfullName.split(" ").splice(0,1).toString();
	var nameLetters = onlyName.split("")
	//var numberLetters = nameLetters.map (function (letter,index) {letter + "hola"});
	//console.log(nameLetters);
	
//var arrStr = [];
	for (var i = 0; i < nameLetters.length; i++) {
		nameLetters[i]=i+1+"º "+nameLetters[i].toUpperCase();
	};
	

	console.log(nameLetters);

};
ejercicioC("Pau Sanchez");


//cupensystems@gmail.com
//edgry colmenares

//d)Como en el ejercicio anterior, pero seleccionando tu apellido

//console.log(myLastName) // 5º S, 6º T, 7º A, 8º R, 9º K
//Resource: https://www.w3schools.com/jsref/jsref_length_array.asp

function ejercicioD (myfullName) {
	var onlyName = myfullName.split(" ").splice(0,1).toString();
	var onlyLastName = myfullName.split(" ").splice(1,1).toString();
	console.log(onlyName)
	var nameLetters = onlyName.split("")
	var lastnameLetters = onlyLastName.split("")
	
	

	for (var i = 0; i < lastnameLetters.length; i++) {
		lastnameLetters[i]=i+1+nameLetters.length+"º "+lastnameLetters[i].toUpperCase();
	};
	

	console.log(lastnameLetters);

};
ejercicioD("Pau Sanchez");



//e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings

//console.log(myInitials) // T.S


function ejercicioE (myFullName) {

var onlyName = myFullName.split(" ").splice(0,1).toString().charAt(0);
var onlyLastName = myFullName.split(" ").splice(1,1).toString().charAt(0);

var myInitials = onlyName+"."onlyLastName;
console.log(myInitials);
//console.log(onlyName);
//console.log(onlyLastName);
};

ejercicioE("Pau Sanchez");

//f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, 
//y además añade en otra posicion tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.

//console.log(mySelector) // My name is TONY and i'm 40 years old

function ejercicioF (myDetails) {
var onlyName = myDetails.split(" ").splice(0,1).toString().toUpperCase(); 
var onlyAge = myDetails.split(" ").splice(2,1).toString(); 
var mySelector = "My name is "+onlyName+" and i'm "+onlyAge+" years old";
//console.log(onlyAge);
//console.log(onlyName);
console.log(mySelector);


};

ejercicioF("Pau Sanchez 37");


//g) Prepara una función para añadir tu City a la array, muestra un mensaje mostrando el contenido de toda la array, así aseguraremos los cambios.

//console.log(myCityAdd) // City added to array! => Tony, Stark, 40, New York

function ejercicioG (myCity) {

var myDetailsArr = ["Pau","Sanchez",37];
myDetailsArr.push(myCity);
var myCityAdd = myDetailsArr.toString();
//console.log(myDetailsArr);
console.log("City added to array! => "+myCityAdd);

};

ejercicioG ("Tarragona");


//h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.

//myCityAdd() // City added to array! => Tony, Stark, 40, New York
//myCityDelete() // City deleted! => Tony, Stark, 40

var myDetailsArr = ["Pau","Sanchez",37];

function myCityAdd (myCity){


myDetailsArr.push(myCity);
var myCityAdd = myDetailsArr.toString();
//console.log(myDetailsArr);
console.log("City added to array! => "+myCityAdd);

};

function myCityDelete (){
myDetailsArr.pop();	
var myCityDeleted = myDetailsArr.toString();
console.log("City deleted! => "+myDetailsArr);

}; 

myCityAdd("Tarragona");
myCityDelete();



//j) Ahora, elimina el nombre y asegura los cambios Resources: https://www.w3schools.com/jsref/jsref_shift.asp


var myDetailsArr = ["Pau","Sanchez",37];

function myCityAdd (myCity){


myDetailsArr.push(myCity);
var myCityAdd = myDetailsArr.toString();
//console.log(myDetailsArr);
console.log("City added to array! => "+myCityAdd);

};

function myNameDelete (){
myDetailsArr.shift();	
var myNameDeleted = myDetailsArr.toString();
console.log("Name deleted! => "+myDetailsArr);

}; 

myCityAdd("Tarragona");
myNameDelete();



//k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, 
//como podria hacer para introducirlo en la primera posición? Resources: https://www.w3schools.com/jsref/jsref_splice.asp


var myDetailsArr = ["Pau","Sanchez",37];

function myCityAdd (myCity){


myDetailsArr.push(myCity);
var myCityAdd = myDetailsArr.toString();
//console.log(myDetailsArr);
console.log("City added to array! => "+myCityAdd);

};

function myNameDelete (){
myDetailsArr.shift();	
var myNameDeleted = myDetailsArr.toString();
console.log("Name deleted! => "+myNameDeleted);

};

function myNameBack (myName) {

myDetailsArr.splice(0, 0, myName);
var myNameAdded = myDetailsArr.toString();
console.log("Name Added! => "+myNameAdded);


};

myCityAdd("Tarragona");
myNameDelete();
myNameBack("Pau");

//l) Ahora, declara una array con los números del 0 a 10 y muestra cada número multiplicado por dos.

//numbers = [...]
//var multByTwo = numbers.map(...)


var numbers = [0,1,2,3,4,5,6,7,8,9,10];
var multByTwo = numbers.map(function (x){x*2})


console.log(multByTwo);

//l1) Reformula la función para que puedas especificar por cual número debería multiplicar 
//cada elemento de la array.

//var num = 3; // cada número se multiplicará por 3
//function multByNum(num){
//    var arrayMult = numbers.map(...)
//    return arrayMult
//}
//Resource: https://www.w3schools.com/jsref/jsref_map.asp
var numbers = [0,1,2,3,4,5,6,7,8,9,10];
 // cada número se multiplicará por 3
function multByNum(num){
    var arrayMult = numbers.map(function (x){return x*num;})
    console.log(arrayMult);
};
var num = 3;
multByNum(num);

//m) Podrías mostrarlos en el orden inverso? Resources: https://www.w3schools.com/jsref/jsref_sort.asp


var numbers = [0,1,2,3,4,5,6,7,8,9,10];

function multByNum(num){
    var arrayMult = numbers.map(function (x){return x*num;});
    console.log(arrayMult.sort(function(a, b) {return b - a;}));
};
var num = 3;
multByNum(num);


//n) Puedes indicarme que letras se repiten de tu nombre y cuantas veces?

//console.log(repeatLetters) // Tony Stark, the letter 'T' => 2 times.


function letrasRepes (name){

	
	var arrayCharacters = name.toUpperCase().replace(/\s/g,"").split("").sort();

	/*function duplicated(value,i,arr){
		var index = arr.indexOf(arr[i])
		var lastindex = arr.lastIndexOf(arr[i])
		return (index < lastindex)
	}

	function notDuplicated(value,i,arr){
		var index = arr.indexOf(arr[i])
		var lastindex = arr.lastIndexOf(arr[i])
		return (index == lastindex)
	}*/

	function howManyTimes(value,i,arr){
		var index = arr.indexOf(arr[i])
		var lastindex = arr.lastIndexOf(arr[i])
		var times = lastindex - index
		if (times > 0){
			console.log(name +",the letter'" + arr[i] + "' => " + ++times + " times.");
			arr.splice(i,times);
		}

	}

	
	var howManyTimes = arrayCharacters.filter(howManyTimes);
	
};
letrasRepes("Pau Sanchep Gonzalezp");

/*var arrDuplicates = arrayCharacters.filter(duplicated);
	var arrNotDuplicates = arrayCharacters.filter(notDuplicated);*/
	/*console.log("ORIGINAL: "+arrayCharacters);
	console.log("DUPLICATED: "+arrDuplicates);
	console.log("NOT DUPLICATED: "+arrNotDuplicates);*/






/*String.prototype.count=function(s1) { 
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
}*/

/*function letrasRepes (name){

	
	var arrayCharacters = name.toUpperCase().replace(/\s/g,"").split("").sort();
	
	var arrDuplicates = [];
	var arrTestDuplicates = [];
	var arrNotDuplicates = [];


	for (var i = 0; i <= arrayCharacters.length; i++) {
		for (var j = i; j <= arrayCharacters.length; j++) {
			if (arrayCharacters[i] == arrayCharacters[j] && i != j ){
				arrDuplicates.push(arrayCharacters[i]);
			}
			

		}	
	}
console.log("Original: "+arrayCharacters);
console.log("Duplicates: "+arrDuplicates);
console.log("TestDuplcates: "+arrTestDuplicates);
console.log("NotDuplcates: "+arrNotDuplicates);
};
letrasRepes("Pau Sanchep Gonzalezp");


	function duplicated(value,i,arr){
		var indice = arr.indexOf(arr[i])
		var indiceX = arr.indexOf(arr[!i])
		var indiceY = arr.indexOf(arr[--i])
		return (indice ==! -1 && indiceX ==! -1)
	}

	function notDuplicated (value,i,arr){
		return (arr.indexOf(arr[i]) >= 0)
	}

	var arrDuplicates = arrayCharacters.filter(duplicated);
	var arrNotDuplicates = arrayCharacters.filter(notDuplicated);

	console.log("ORIGINAL:"+ arrayCharacters);
	console.log("Duplicadas: "+ arrDuplicates);
	console.log("No duplicadas"+ arrNotDuplicates);



function isEven(x) {
	return (x % 2 == 0)
}

x => x % 2 == 0









	/*for (var i = 0; i < arrayCharacters.length; i++) {
		if (arrNotDuplicates.indexOf(arrayCharacters[i]) === -1) {
			arrNotDuplicates.push(arrayCharacters[i])}
		
		else {arrDuplicates.push(arrayCharacters[i])};
	}
		
	console.log("original: "+ arrayCharacters);
	
	console.log("Duplicadas: "+ arrDuplicates);
	console.log("No duplicadas"+ arrNotDuplicates);*/
	






//n1) Ahora muestra por consola que letras NO se repiten y muestra tu nombre sin esas letras

//console.log(repeatLetters) // Tony Stark, the letters => o, n, y, s, a, r, k are not repeated, the name is => Ony Sark


function letrasRepes (name){

	
	var arrayCharacters = name.toLowerCase().replace(/\s/g,"").split("").sort();
	var arrayRepCharacters = name.toLowerCase().replace(/\s/g,"").split("").sort();

	var arrayName = name.split("");
	

	function notDuplicated(value,i,arr){
		var index = arr.indexOf(arr[i])
		var lastindex = arr.lastIndexOf(arr[i])
		return (index == lastindex)

	}
	
	function repeatLetters(value,i,arr){
		var index = arr.indexOf(arr[i])
		var lastindex = arr.lastIndexOf(arr[i])
		var times = lastindex - index
		if (times != 0){
			arr.splice(arr[i],times--)
			return value;
		}

	}

	
	var notDupli = arrayCharacters.filter(notDuplicated);
	var notRepeatedUpperCases = notDupli.map((val, i, arr) => {
  	return val.toUpperCase();
	});
	var notlowerUpper = notDupli.concat(notRepeatedUpperCases).sort();





	var repeatArr = arrayRepCharacters.filter(repeatLetters);
	var repeatedUpperCases = repeatArr.map((val, i, arr) => {
  	return val.toUpperCase();
	});
	var lowerUpper = repeatArr.concat(repeatedUpperCases).sort();
	
	
	
	/*function filterReps (value,i,arr){
		if (arr[!i] === lowerUpper[i]){return value}
		  }  
	var filterReps = arrayName.filter(filterReps);
	console.log(filterReps);*/
	var uniques = [];
	var notuniques = [];
	for (var i = 0; i < lowerUpper.length; i++) {
		for (var j = 0; j <= arrayName.length; j++) {
			if (arrayName[j] === lowerUpper[i]){
				uniques.push(lowerUpper[i]);
			}
			
		}	
	}
	for (var i = 0; i < arrayName.length; i++) {
		for (var j = 0; j <= notlowerUpper.length; j++) {
			if (arrayName[i] == notlowerUpper[j] || arrayName[i] == " "){
				notuniques.push(arrayName[i]);
			}
			else if (arrayName[i] == " " && i == 0){
				notuniques.push(arrayName[i]);
			} 
			
		}	
	}

	var onySark = notuniques.join("");
	var arronySark = onySark.split(" ").join("");

	console.log("arronySark: "+arronySark);
	/*console.log("uniques: "+uniques);*/
	console.log(name+", the letters => " + notDupli + " are not repeated, the name is => "+onySark);
	console.log("notuniques: "+notuniques.join(""));
	console.log("arrayName: "+arrayName);
	console.log("lowerUpper: "+lowerUpper);
	console.log(arrayName.toString().replace(/,/g, ''));
	 
	// Tony Stark, the letters => o, n, y, s, a, r, k are not repeated, the name is => Ony Sark
};
letrasRepes("Pau Sanchep Gonzalezp");








Numbers (https://github.com/agandia9/Subjects-PreCourse/blob/master/methods.md)

//a) Que hora es? Declara la hora como número y devuelvela como String
//console.log(myString + myNumberStringify) // I'ts 10.45 of morning
//Hint => https://www.w3schools.com/jsref/jsref_tostring_number.asp

function ejercicioA(hora){

var hourNumber = hora
var hourString = hourNumber.toString();

console.log("Its "+hourString+" of morning");
};

ejercicioA(10.45);

//b) Nono, que hora exactamente? Dime la hora sin minutos
//console.log(myString) // It's around 10 of morning

function ejercicioB(hora){

var hourNumber = Math.round(hora);
var hourString = hourNumber.toString();

console.log("It's around "+hourString+" of morning");
};

ejercicioB(10.45);


//c) Ahora, declara tu hora y muéstrala redondeada.
//console.log(...(10.34)) // 11!
//Hint => https://www.w3schools.com/jsref/jsref_round.asp

function ejercicioC(hora){

var hourNumber = Math.round(hora, 1);
var hourString = hourNumber.toString();

console.log(hourString+"!");
};

ejercicioC(10.34);

//d) Hagamos una calculadora. Primero, la suma.
//console.log(sum) //The sum of 7+3 is 10

function ejercicioD(suma1,suma2){

var num1 = suma1;
var num2 = suma2;
var sum = num1 + num2;
console.log("The sum of " + num1 + " + " + num2 + " is "+sum);

};

ejercicioD(7,3);

//d1) Añade la resta...
//console.log(sum + rest) // The sum and rest of 7 and 3 is 10 and 4 

function ejercicioD(suma1,suma2){

var num1 = suma1;
var num2 = suma2;
var sum = num1 + num2;
var subtraction = num1 - num2;
console.log("The sum of " + num1 + " + " + num2 + " is " + sum +" and the subtraction " + subtraction );

};

ejercicioD(7,3);


//d2) Y la multiplicación
//console.log(sum + rest + mult) // 10, 4 and 21

function ejercicioD2(suma1,suma2){

var num1 = suma1;
var num2 = suma2;
var sum = num1 + num2;
var subtraction = num1 - num2;
var multiplication = num1 * num2;
console.log(sum + " , " + subtraction + " and " + multiplication);

};

ejercicioD2(7,3);




//d3) Por ultimo, la división
//console.log(sum + rest + mult + div) // 10, 4, 21 and 2.3

function ejercicioD3(suma1,suma2){

var num1 = suma1;
var num2 = suma2;
var sum = num1 + num2;
var subtraction = num1 - num2;
var multiplication = num1 * num2;
var division = num1 / num2;
console.log(sum + " , " + subtraction + " , " + multiplication + " and " + division.toFixed(1));

};

ejercicioD3(7,3);


//d4) Ahora, intenta multiplicar un número por una string, que devuelve?
//console.log(10*"hour") // ....?!

function ejercicioD4 (numero,texto){

var num = numero;
var text = texto;

console.log(num*text);

};

ejercicioD4 (10,"hour")


//e) Podemos controlar este error con un condicional if?
//console.log(10*"hour") // You can't do this operation!


function ejercicioD4 (numero,texto){

	var numerO = numero;
	var textO = texto;

if (typeof numerO  == typeof textO ) {
		console.log(numerO*textO);
	} else {console.log("You can't do this operation");
		}

};

ejercicioD4 (10,10);

