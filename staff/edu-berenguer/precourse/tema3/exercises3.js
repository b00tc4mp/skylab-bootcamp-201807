//a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.
function hello(name){
	console.log("hello " + name);
}
hello("Edu");

//b) Intenta retornar los valores en lugar de usar console.log
function helloReturn(name){
	return("hello " + name);
}
hello("Edu");

//c) Ahora, añade tu edad y concaténala al return
var name = "Edu";
function nameAge(myName, age){
	var message = "hello " + myName + ", you're " ;
	return message + age + " years old.";
}
nameAge(name,33);

//d) Iguala tu función a una variable y ejecútala
var myFunction = function(myName, age){
	return " hello " + myName + ", you " + age + " years old.";
} 
var result = myFunction("Edu",33);
console.log(result);

/*e) Ahora declara otra funcion que devuelva tu edad y asigna su resultado a otra variable,
 intenta imprimir sus dos resultados concatenados 
 Now, try to declare other function and assign it result to other variable called myAge, 
 and try to print the result of both functions in one line.*/
var myName = function(name){
 	return name;
}
var myAge = function(age){
 	return age;
}
myName("Edu") + " " + myAge(33);

/*e1) Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10 y 
conviertelo todo a un solo string.*/
myName("Edu") + " " + (myAge(33) + Math.round(Math.random()*10)).toString();

//f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.
var name = "Edu";
var age = 33;
myName(name) + " " + myAge(age);

/*g) Intenta englobar todas las funciones en una sola funcion padre, 
el return de dicha función padre deberá ser la llamada a las funciones hijas*/
//function con el ejercicio i incorporado
function father(name,age){
	var name = myName(name);
	var age = myAge(age);
	if(age < 20){
		return name + " ," + age + " ,tienes menos de 20 años";
	}else if(age > 21 && age < 50){
		return name + " , " + age + " ,tienes mas de 20 años"
	}
}
father("Edu",33);

/*h) Haz otra función hija que solo devuelva un número random, 
ese número random será el argumento que se pasará como parámetro a la función age()*/
function random(){
	var random = (Math.random()*1000000).toFixed();
	return random;
}
father("Edu",random());

//i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50
function newRandom(){
	var newRandom = (Math.random()*50).toFixed();
	return newRandom;
}
father("Edu",newRandom()); //cambiado la function father para modificar el return dependiendo de la edad

//j) Al return de la función name(), concaténale otro mensaje
 var myName = function(name){
 	return name + "...aka IRONMAN";
 }
 father(myName(),newRandom()); //Si no modifico la función padre me devuelve el mensaje "aka ironman" 2 veces

//k) Ahora, modifica el return de la función padre para que devuelva sus datos en un mensaje amigable
function newFather(name,age){
	var name = name;
	var age = myAge(age);
	if(age < 20){
		return "The first function return: " + name + " .The second function return: " + age + 
		" you are less than 20 years old";
	}else{
		return "The first function return: " + name + " .The second function return: " + age +
		" you are more than 20 years old";
	}
}
newFather(myName("Edu"),newRandom());

/*l) Modifica la primera función y la función padre para, 
si el parámetro introducido no es tu nombre, no siga con la segunda llamada*/
 var myNewName = function(name){
 	return name
 }

 function newFather2(name,age){
	var name = name;
	var age = myAge(age);
	if(name !== "Iron Man"){	
		return "The first function returns:" + name + "... You're not IRONMAN!"
	}else{
		if(age < 20){
			return "The first function return: " + name + " .The second function return: " + age + 
			" you are less than 20 years old";

		}else{
			return "The first function return: " + name + " .The second function return: " + age +
			" you are more than 20 years old";
		}
	}
}
newFather2(myNewName("Hulk"),newRandom());

/*m) Vamos a complicarlo un poco... El número random debería generarse en otra función separada del padre. 
Retorna a la funcion padre y concaténalo en el return padre.*/
function generateRandom(){
	var numberRandom = (Math.random()*50).toFixed();
	return numberRandom;
}
function newFather3(name){
	var name = name;
	var numR = generateRandom();
	if(name !== "Iron Man"){	
		return "The first function returns:" + name + "... You're not IRONMAN!"
	}else{

		if(numR < 20){
			return "The first function return: " + name + " .The second function return: " + numR + 
			" you are less than 20 years old";

		}else{
			return "The first function return: " + name + " .The second function return: " + numR +
			" you are more than 20 years old";
		}
	}
}
newFather3(myNewName("Iron Man"));

/*n) Refactorizemos nuestro código dejando todas las funciones separadas del padre, 
éste último se encargará de llamarlas todas y mostrar sus resultados.*/
function father(){
	myNewName("Iron Man");
	generateRandom();
	return "I´am " + myNewName("Iron Man") + " , i have " + generateRandom() + " years old.";
}
father();

/*ñ) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre, 
muestra los resultados de esta array como siempre.*/
function arrayFather(){
	var array = new Array();
	array.push(myNewName("Iron Man"));
	array.push(generateRandom());
	return array;
}
arrayFather();

/*o) Crea una funcion que llame a nuestra funcion father(), ésta, a parte de llamarla, 
deberá hacer otro push "hello from the dark side..." a la array que crea father(). 
Muestra toda la array completa.*/
function callFather(){
	var newArray = arrayFather();
	newArray.push("hello from the dark side...");
	return newArray;
}
callFather();

/*p) 🔞 👊🏼 Llama a ésta nueva función dos veces, muestra sus resultados por pantalla y
 compara sus randomNums, mostrando un mensaje indicando cual es mayor. 
 El nombre pasado por parámetro también deberá ser random entre una array de nombres, con lo cual, 
 también deberás refactorizar las funciones hijas.*/
var myNewName2 = function(){
	var names = ["Iron Man","Hulk","Captain America","Spiderman","Batman",
	"Superman","Goku","Green Lanter","Vegeta","Krilin","Musculman","Jon Snow"];	
	var limit = names.length-1;
	var nRandom = (Math.random()*limit).toFixed();
 	return names[nRandom];
}

function arrayFather2(){
	var array = new Array();
	array.push(myNewName2());
	array.push(generateRandom());
	return array;
}
arrayFather2();

function gandFather(){
	var name1 = new Array();
	var name2 = new Array();
	name1 = arrayFather2();
	name2 = arrayFather2();

	while(name1[0] === name2[0]){
		name2 = arrayFather2();
	}
	if(name1[1] > name2[1]){
		return name1[0] + " es mas mayor que " + name2[0];
	}else{
		return name2[0] + " es mas mayor que " + name1[0];
	}
}
gandFather();

/*p1) En lugar de retornar los valores como una array, prepara tus funciones 
para que devuelvan los resultados como OBJECTS. Muestra por pantalla los objetos sin estilizar el output.*/
var myNewName3 = function(){
	var names = ["Iron Man","Hulk","Captain America","Spiderman","Batman",
	"Superman","Goku","Green Lanter","Vegeta","Krilin","Musculman","Jon Snow"];
	var limit = names.length-1;
	var nRandom = (Math.random()*limit).toFixed();
 	return names[nRandom];
}

function objectFather(){
	var object = new Object();
	object.name = myNewName3();
	object.age = generateRandom();
	return object;
}
objectFather();

function gandFather2(){
	var name1 = new Object();
	var name2 = new Object();
	name1 = objectFather();
	name2 = objectFather();
	console.log(name1.name);
}
gandFather2();

//p2) Muestra los resultados de los OBJECTS recorriendolos y mostrando los valores de una forma amigable.
function showResults(){
	var name1 = new Object();
	var name2 = new Object();
	name1 = objectFather();
	name2 = objectFather();

	while(name1.name === name2.name){
		name2 = objectFather();
	}
	if(name1.age > name2.age){
		return name1.name + " con " + name1.age + " años, es más mayor que " + name2.name;
	}else{
		return name2.name + " con " + name2.age + " años, es más mayor que " + name1.name;
	}
}
showResults();






















