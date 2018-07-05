/*
a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.
*/

function myName(name) {
	console.log("Hello " + name);
}

myName("Jaume");


/*
b) Intenta retornar los valores en lugar de usar console.log
*/

function myName(name) {
	return "Hello " + name;
}

myName("Jaume");


/*
c) Ahora, añade tu edad y concaténala al return
*/

function myName(name, age) {
	return "Hello " + name + ", you're " + age + " years old.";
}

myName("Jaume", 36);


/*
d) Iguala tu función a una variable y ejecútala
*/

var myFunction = function(name, age){
	return "Hello " + name + ", you're " + age + " years old.";	
}

myFunction("Jaume", 36);


/*
e) Ahora declara otra funcion que devuelva tu edad y asigna su resultado
a otra variable, intenta imprimir sus dos resultados concatenados
*/

var myName = function(name) {
	return "Hello " + name + ", ";
}

var myAge = function(age) {
	return "you're " + age + " years old.";
}

var resultName = myName("Jaume");
var resultAge = myAge(36);

console.log(resultName + resultAge);



/*
e1) Intenta sumarle al resultado de tu segunda funcion, un numero
random del 0-10 y conviertelo todo a un solo string.
*/

var myName = function(name) {
	return name;
}

var myAge = function(age) {
	return age + Math.floor((Math.random() * 10) + 1);
}

var resultName = myName("Jaume");
var resultAge = myAge(36);

console.log(resultName + " " + resultAge.toString());



/*
f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.
*/





/*
g) Intenta englobar todas las funciones en una sola funcion padre, el return de
dicha función padre deberá ser la llamada a las funciones hijas
*/

function father() {

	var myName = function(name) {
	return name;
}

	var myAge = function(age) {
		return age + Math.floor((Math.random() * 10) + 1);
	}

	return myName("Jaume") + " " + myAge(36);

}

father();

/*
h) Haz otra función hija que solo devuelva un número random, ese número random
será el argumento que se pasará como parámetro a la función age()
*/

function father() {

	function myName(name) {
		return name;
	}

	function myAge(age) {
		return age
	}

	function randomNumber() {
		return Math.floor((Math.random() * 100000) + 1);
	}

	return myName("Jaume") + " " + myAge(randomNumber());

}

father();


/*
i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age
es < 20 y otro si es de 21 - 50
*/

function father() {

	function myName(name) {
		return name;
	}

	function myAge(age) {
		return age
	}

	function randomNumber() {
		var random = Math.floor((Math.random() * 50) + 1);
		
		if (random<20) {
			return random + "...Sure you're Tony Stark?";
		} else {
			return random + "...Sure, you're Tony Stark!"; 
		}
	}

	return myName("Jaume") + " " + myAge(randomNumber());

}

father();


/*
j) Al return de la función name(), concaténale otro mensaje
*/

function father() {

	function myName(name) {
		return "Tony Stark...aka " + name + ",";
	}

	function myAge(age) {
		return age
	}

	function randomNumber() {
		var random = Math.floor((Math.random() * 50) + 1);
		
		if (random<20) {
			return random + "...Sure you're Tony Stark?";
		} else {
			return random + "...Sure, you're Tony Stark!"; 
		}
	}

	return myName("IronMan") + " " + myAge(randomNumber());

}

father();


/*
k) Ahora, modifica el return de la función padre para que
devuelva sus datos en un mensaje amigable
*/

function father() {

	function myName(name) {
		return "Tony Stark...aka " + name + ",";
	}

	function myAge(age) {
		return age
	}

	function randomNumber() {
		var random = Math.floor((Math.random() * 50) + 1);
		
		if (random<20) {
			return random + "...Sure you're Tony Stark?";
		} else {
			return random + "...Sure, you're Tony Stark!"; 
		}
	}

	return "The first function returns: " + myName("IronMan") + " The second function returns: " + myAge(randomNumber());

}

father();

/*
l) Modifica la primera función y la función padre para, si el parámetro introducido
no es tu nombre, no siga con la segunda llamada
*/





/*
m) Vamos a complicarlo un poco... El número random debería generarse en otra función
separada del padre. Retorna a la funcion padre y concaténalo en el return padre.
*/

function randomNumber() {
	var random = Math.floor((Math.random() * 50) + 1);
		
	if (random<20) {
		return random + "...Sure you're Tony Stark?";
	} else {
		return random + "...Sure, you're Tony Stark!"; 
	}
}

var numRandom = randomNumber();

function father() {

	function myName(name) {
		return "Tony Stark...aka " + name + ",";
	}

	function myAge(age) {
		return age
	}

	
	return "The first function returns: " + myName("IronMan") + " The second function returns: " + myAge(numRandom);

}

father();


/*
n) Refactorizemos nuestro código dejando todas las funciones separadas del padre,
éste último se encargará de llamarlas todas y mostrar sus resultados.
*/

function myName(name) {
	return "Tony Stark...aka " + name + ",";
}

function myAge(age) {
	return age;
}

function randomNumber() {
	var random = Math.floor((Math.random() * 50) + 1);
		
	if (random<20) {
		return random + "...Sure you're Tony Stark?";
	} else {
		return random + "...Sure, you're Tony Stark!"; 
	}
}

function father() {

	var nombre = myName("IronMan");
	var edad = myAge(randomNumber());

	return nombre + " " + edad;

}

father();


/*
ñ) Intenta hacer push de todos los resultados de las funciones a una array declarada
en el padre, muestra los resultados de esta array como siempre.
*/


function myName(name) {
	return "Tony Stark...aka " + name + ",";
}

function myAge(age) {
	return age;
}

function randomNumber() {
	var random = Math.floor((Math.random() * 50) + 1);
		
	if (random<20) {
		return random + "...Sure you're Tony Stark?";
	} else {
		return random + "...Sure, you're Tony Stark!"; 
	}
}

function father() {

	var emptyArray = [];

	var nombre = myName("IronMan");
	var edad = myAge(randomNumber());

	emptyArray.push(nombre, edad);

	return emptyArray;

}

father();

/*
o) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de
llamarla, deberá hacer otro push "hello from the dark side..."
a la array que crea father(). Muestra toda la array completa.
*/

function myName(name) {
	return "Tony Stark...aka " + name + ",";
}

function myAge(age) {
	return age;
}

function randomNumber() {
	var random = Math.floor((Math.random() * 50) + 1);
		
	if (random<20) {
		return random + "...Sure you're Tony Stark?";
	} else {
		return random + "...Sure, you're Tony Stark!"; 
	}
}

function father() {

	var emptyArray = [];

	var nombre = myName("IronMan");
	var edad = myAge(randomNumber());

	emptyArray.push(nombre, edad);

	return emptyArray;

}

function firstFather() {

	var results = father();
	results.push("Hello from the dark side...");
	
	return results;

}

firstFather();

/*
p) 🔞 👊🏼 Llama a ésta nueva función dos veces, muestra sus resultados por
pantalla y compara sus randomNums, mostrando un mensaje indicando cual es mayor.
El nombre pasado por parámetro también deberá ser random entre una array de
nombres, con lo cual, también deberás refactorizar las funciones hijas.
*/

function myName(name) {
	return "Tony Stark...aka " + name + ",";
}

function myAge(age) {
	return age;
}

function randomNumber() {
	var random = Math.floor((Math.random() * 50) + 1);
		
	if (random<20) {
		return random + "...Sure you're Tony Stark?";
	} else {
		return random + "...Sure, you're Tony Stark!"; 
	}
}

function father(nombre) {

	var emptyArray = [];

	var nombre = myName(nombre);
	var edad = myAge(randomNumber());

	emptyArray.push(nombre, edad);

	return emptyArray;

}

function firstFather() {

	var results = father();
	results.push("Hello from the dark side...");
	
	return results;

}

function grandFather(nombre){

	var names = ["Hulk", "Black Widow", "Captain America", "Black Phanter"];

	var function1 = firstFather();
	var function2 = firstFather();

	if (function1 < function2) {
		return function2;
	} else {
		return function1;
	}
}


grandFather();



/*
p1) En lugar de retornar los valores como una array, prepara tus funciones
para que devuelvan los resultados como OBJECTS. Muestra por pantalla los
objetos sin estilizar el output.
*/

//var favorites = ["http://google.com", "http://yahoo.com", "http://msn.com", "http://apple.com"];
//var favorite = favorites[Math.floor(Math.random() * favorites.length)];
//var postmessage = "hi my favorite site is " + favorite;



/*
p2) Muestra los resultados de los OBJECTS recorriendolos y mostrando
los valores de una forma amigable.
*/

































/*
a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como
parámetro y devuélvelo por la consola.
*/

function myName(nombre) {
	console.log("Hello " + nombre);
}

myName("Jaume");


//b) Intenta retornar los valores en lugar de usar console.log

function myName(nombre) {
	return "Hello " + nombre;
}

myName("Jaume");


//c) Ahora, añade tu edad y concaténala al return

function myName(nombre, edad) {
	var myMessage = "Hello " + nombre + ", you're " + edad + " years old."
	return myMessage;
}

myName("Jaume", 36);


//d) Iguala tu función a una variable y ejecútala

function myName(nombre, edad) {
	var myMessage = "Hello " + nombre + ", you're " + edad + " years old."
	return myMessage;
}

var x = myName("Jaume", 36);

console.log(x);

/*
e) Ahora declara otra funcion que devuelva tu edad y asigna su resultado a otra variable,
intenta imprimir sus dos resultados concatenados
*/

function myName(nombre) {
	return nombre;
}

function myAge(edad) {
	return edad;
}

var miNombre = myName("IronMan");
var miEdad = myAge(40);

console.log(miNombre + " " + miEdad);

/*
e1) Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10
y conviertelo todo a un solo string.
*/

function myName(nombre) {
	return nombre;
}

function myAge(edad) {
	var myRandom = Math.floor(Math.random()*10);
	console.log(myRandom);
	return (edad + myRandom).toString();
}

var miNombre = myName("IronMan");
var miEdad = myAge(40);

console.log(miNombre + " " + miEdad);


//f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.

function myName(nombre) {
	return nombre;
}

function myAge(edad) {
	var myRandom = Math.floor(Math.random()*10);
	return (edad + myRandom).toString();
}

var miNombre = myName("IronMan");
var miEdad = myAge(40);

console.log(myName(miNombre) + " " + myAge(miEdad));


/*
g) Intenta englobar todas las funciones en una sola funcion padre, el return de dicha
función padre deberá ser la llamada a las funciones hijas
*/

function father() {

	function myName(nombre) {
		return nombre;
	}

	function myAge(edad) {
		var myRandom = Math.floor(Math.random()*10);
		return (edad + myRandom).toString();
	}

	return myName("IronMan") + " " + myAge(40);
}

father()


/*
h) Haz otra función hija que solo devuelva un número random, ese número random será el
argumento que se pasará como parámetro a la función age()
*/

function father(nombre) {

	function myName(nombre) {
		return nombre;
	}

	function myAge(edad) {
		return edad;
	}

	function generateRandom() {
		return Math.floor(Math.random()*1000000);
	}

	var returnRandom = generateRandom();

	return myName("IronMan") + " " + myAge(returnRandom);
}

father();



/*
i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output
age es < 20 y otro si es de 21 - 50
*/

function father(nombre) {

	function myName(nombre) {
		return nombre;
	}

	function myAge(edad) {
		return edad;
	}

	function generateRandom(min, max) {
		var random = Math.floor(Math.random()*(min+max));

		if (random <= 20) {
			return random + "... Are you Tony Stark?";
		} else {
			return random + "... You are Tony Stark!";
		}
	}

	var x = myName("IronMan");
	var y = myAge(generateRandom(0, 50));
	
	return x + " " + y	
}

father();




/*
j) Al return de la función name(), concaténale otro mensaje
*/


// output: Tony Stark...aka IRONMAN, 34...Sure you're Tony Stark? 

function father(realName, edad) {

	function myName() {
		return realName + "...aka IronMan, ";
	}

	function myAge() {
		return edad;
	}

	function generateRandom() {
		var random = Math.floor(Math.random()*50);
		var totaledad = edad+random;

		if (totaledad <= 20) {
			return totaledad + "... Are you " + realName + "?";
		} else {
			return totaledad + "... You are " + realName + "!"
		}
	}
	
	return myName() + generateRandom();	
}

father("Tony Stark", 0);




///// REVISAR A PARTIR DE AQUI/////

/*
k) Ahora, modifica el return de la función padre para que devuelva sus datos en un mensaje amigable
*/

function father(realName, edad) {

	function myName() {
		if (realName === "Tony Stark") {
			return realName + "...aka IronMan', ";
		} else {
			return realName + "...You're not IronMan! ";
		} 
	}

	function myAge() {
		return edad;
	}

	function generateRandom() {
		var random = Math.floor(Math.random()*50);
		var totaledad = edad+random;

		if (totaledad <= 20) {
			return totaledad + "... Are you " + realName + "?";
		} else {
			return totaledad + "... You are " + realName + "!"
		}
	}
	
	return  "The first function returns: '" + myName() + "The second function returns: '" + generateRandom() + "'";
}

father("Tony Stark", 0);


/*
l) Modifica la primera función y la función padre para, si el parámetro introducido
no es tu nombre, no siga con la segunda llamada
*/

//return x + y // output: "The first function returns: Hulk... You're not IRONMAN!"

function father(realName, edad) {

		



	function myName() {
		
		var results = "";

		if (realName === "Tony Stark") {
			results = realName + "...aka IronMan', ";
		} else {
			results = realName + "...You're not IronMan! ";
		}

		return results;
	}

	function myAge() {
		return edad;
	}

	function generateRandom() {
		var random = Math.floor(Math.random()*50);
		var totaledad = edad+random;

		if (totaledad <= 20) {
			return totaledad + "... Are you " + realName + "?";
		} else {
			return totaledad + "... You are " + realName + "!"
		}
	}
	
	return  "The first function returns: '" + myName() + "The second function returns: '" + generateRandom() + "'";
}

father("Tony Stark", 0);
































/*
m) Vamos a complicarlo un poco... El número random debería generarse en otra
función separada del padre. Retorna a la funcion padre y concaténalo en el return padre.
*/

function generateRandom() {
		var random = Math.floor(Math.random()*50);
		var totaledad = edad+random;

		if (totaledad <= 20) {
			return totaledad + "... Are you " + realName + "?";
		} else {
			return totaledad + "... You are " + realName + "!"
		}
	}


function father(realName, edad) {

	function myName() {
		
		var results = "";

		if (realName === "Tony Stark") {
			results = realName + "...aka IronMan', ";
		} else {
			results = realName + "...You're not IronMan! ";
		}

		return results;
	}

	function myAge() {
		return edad;
	}

	return  "The first function returns: '" + myName() + "The second function returns: '" + generateRandom() + "'";
}

father("Tony Stark", 0);

















function generateRandom() {
	var randomNumber = Math.floor((Math.random()*100000)+1);
	return randomNumber;
}

function father() {
	var numR = generateRandom();
	return numR;
}

father();

/*
n) Refactorizemos nuestro código dejando todas las funciones separadas del padre,
éste último se encargará de llamarlas todas y mostrar sus resultados.
*/

function myName(name) {
	return name;
}

function myAge(age) {
	return age;
}

function generateRandom(num) {
	return Math.floor((Math.random()*num)+1);
}

function father() {
	var a = myName("Jaume");
	var b = myAge(36);
	var c = generateRandom(10000);

	return a + " " + b + " " + c;
}

father();


/*
ñ) Intenta hacer push de todos los resultados de las funciones a una array
declarada en el padre, muestra los resultados de esta array como siempre.
*/

function myName(name) {
	return name;
}

function myAge(age) {
	return age;
}

function generateRandom(num) {
	return Math.floor((Math.random()*num)+1);
}

function father() {
	
	var emptyArray = [];

	var a = myName("Jaume");
	var b = myAge(36);
	var c = generateRandom(10000);

	var d = a + "," + b + "," + c;

	emptyArray.push(d.split(","));

	return emptyArray
}

father();


/*
o) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, 
deberá hacer otro push "hello from the dark side..." a la array que crea father(). 
Muestra toda la array completa.
*/

function myName(name) {
	return name;
}

function myAge(age) {
	return age;
}

function generateRandom(num) {
	return Math.floor((Math.random()*num)+1);
}

function father() {
	
	var emptyArray = [];

	var a = myName("Jaume");
	var b = myAge(36);
	var c = generateRandom(10000);

	var d = a + "," + b + "," + c;

	emptyArray.push(d.split(","));

	return emptyArray
}

function callFather() {
	
	var addToArray = father();
	addToArray.push("Hello from the dark side...")

	return addToArray;
}

callFather();














function myName(name){
  if(name=="Tony Stark "){
  return name+"Avenger:IronMan!! ";
}
  
  
     return name+"you are not Ironman!!";
   
  
  
  
}
function myAge (age){
  
  return age+" Sure you're Tony Stark?";
  
}
function myRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
  
  
}
function father(name){
  
    var array_resultados=[];
    array_resultados.push(myName(name),myAge(myRandomNumber(1,50)));


    console.log(array_resultados);
    return array_resultados;
}
function bigFather(name){
    var resultados=father(name);
    console.log(resultados);


    resultados.push("Hello from the dark side..." );
    
    return "The first function returns:"+resultados[0]+" The second function returns: "+resultados[1]+"."+resultados[2];
}
console.log(bigFather("Tony Stark "));











