//a) Primero, creamos una función que nos cree un saludo, pasa tu nombre como parámetro y devuélvelo por la consola.
function myName(myName) {
	console.log("Hola " + myName);
}
console.log(myName("Maider"));

//b) Intenta retornar los valores en lugar de usar console.log
function myName(myName) {
	return "Hola " + myName;
}
console.log(myName("Maider"));

//c) Ahora, añade tu edad y concaténala al return

//Primera opción
function myMessage(){
	function myName(myName) {
		return "Maider";
	}
	function myAge(myAge) {
		return 23;
	}
	return "Hola " + myName() + "! Tu edad es " + myAge();
}
console.log(myMessage());

//Segunda opción
function myMessage2(name2, age2){
	return "Hola " + name2 + "! Tu edad es " + age2;
}
console.log(myMessage2("Maider",23));

//d) Iguala tu función a una variable y ejecútala
//no entiendo bien el enunciado. He hecho lo siguiente tal como lo entiendo:
var myFunction = myMessage2("Ana", 25);
console.log(myFunction);

//e) Ahora declara otra funcion que devuelva tu edad y asigna su resultado a otra variable, intenta imprimir sus dos resultados concatenados
function myName(myName) {
	return "Maider";
}
function myAge(myAge) {
	return 23;
}
var myFunction2 = myName() + " " + myAge();
console.log(myFunction2);

//e1) Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10 y conviertelo todo a un solo string.
//opcion 1 (haciendo que el numero random sea seguido a la variable ya creada)
var myFunction2 = myName() + " " + (myAge() + Math.floor(Math.random() * 10 +1)).toString();
console.log(myFunction2);
//opcion 2 (haciendo que el numero random sea una función)
function myRandomNumber(){
	return Math.floor(Math.random() * 10 +1);
}
var myFunction3 = myName() + " " + (myAge() + myRandomNumber()).toString();
console.log(myFunction3);
//opcion 3 (haciendo que el numero random sea una variable)
var randomNumber = Math.floor(Math.random() * 10 +1);
var myFunction3 = myName() + " " + (myAge() + randomNumber).toString();
console.log(myFunction3);

//f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.
//no entiendo elenunciado bien


//g) Intenta englobar todas las funciones en una sola funcion padre, el return de dicha función padre deberá ser la llamada a las funciones hijas
//no entiendo elenunciado bien


//h) Haz otra función hija que solo devuelva un número random, ese número random será el argumento que se pasará como parámetro a la función age()
function myRandomNumber2(){
	return Math.floor(Math.random() * 100 +1);
}
function age(){
	return myRandomNumber2();
}
console.log(age());

//i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50
function myRandomNumber3(){
	return Math.floor(Math.random() * 50 +1);
}
function age(){
	if (myRandomNumber3()<=20) {
		return "Tienes " + myRandomNumber3() + " años. ¡Que joven!";
	} else {
		return "Tienes " + myRandomNumber3() + " años. ¡Poco a poco te haces mayor!";
	}
}
console.log(age());
//no me funciona el return (no hace caso al número...)

//j) Al return de la función name(), concaténale otro mensaje
function name(name) {
	return "Hola " + name + "! Un placer conocerte."
}
console.log(name("Maider"));

//



