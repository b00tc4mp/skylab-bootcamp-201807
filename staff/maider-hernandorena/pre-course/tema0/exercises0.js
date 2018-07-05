//a) Declara tu nombre y muéstralo por consola:
var name = "Maider";
console.log (name);

//b) Declara tu edad y muéstralo por consola:
var age = 23;
console.log (age);

//c) Declara tu nombre, tu apellido y tu edad en un array en diferentes posiciones y muéstrala por consola:
var info = ["Maider", "Hernandorena", 23];
console.log (info);

//d) Declara tu nombre y tu edad dentro de un objeto y muéstralo por consola:
var data = { name:"Maider", age:23 };
console.log (data);

//e) Ahora utiliza el array que has creado anteriormente para recorrerlo y mostrar una a una todas las posiciones del array.
for (i=0; i<info.length; i++) {
	console.log (info[i]);
}

//f) Crea una estructura condicional que imprima el número mayor entre dos números.
var a=25;
var b=12;
if (a>b) {
	console.log (a);
}

//f1) Crea otra condicion else if para contemplar la posibilidad de que los dos números sean iguales:
var a=25;
var b=12;
if (a>b) {
	console.log (a);
} else if (a=b) {
	console.log (b);
}

//g) Crea una array de 5 numeros, y recorrela, mostrando además un mensaje cuando, esté a la mitad, muestre un mensaje 'We are in the middle of loop'.
var numbers = [1,3,5,7,8];
for (i=0; i<numbers.length; i++) {
	console.log (numbers[i]);
	if (numbers[i]===5) {
		numbers.splice (3,0, "We are in the middle of loop");
	}
}

//g1) Declara tu nombre y tu edad dos variables y crea un condicional para, en caso de no coincidir con tus datos, mostrar un error
var myName = "Maider";
var myAge = 23;
if (myName!=="Maider" && myAge!==23) {
	console.log ("this is not you!");
	} else { 
	console.log ("Hi!! Glad to see u again!");
	}

//g2) Crea una array, introduce los datos anteriores y unos cuantos más de forma que al recorrer la array, muestre un mensaje cuando encuentre tus datos.
