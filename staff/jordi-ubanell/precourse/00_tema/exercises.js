// a) Declara tu nombre y muéstralo por consola:

function myName(name){
	console.log(name)
}

myName('Jordi')


// b) Declara tu edad y muéstralo por consola:

function myAge(age){
	console.log(age)

}

myAge('48')


//c) Declara tu nombre, tu apellido y tu edad en un array en diferentes posiciones y muéstrala por consola:

function data(info){
	console.log(info)
}

data(['Jordi', 'Ubanell', 48])


//d) Declara tu nombre y tu edad dentro de un objeto y muéstralo por consola:

function object (myName,myAge){

	var data = {name:myName, age:myAge}
	console.log(data)
}

object('Jordi',48)


// e) Ahora utiliza el array que has creado anteriormente para recorrerlo y mostrar una a una todas las posiciones del array.

function array(info){
	for (var i = 0;i < info.length;i++){
		console.log(info[i])
	}
}

array(['Jordi', 'Ubanell', 48])


// f) Crea una estructura condicional que imprima el número mayor entre dos números.

function testNum(a,b) {
	if (a > b) {
		console.log(a);
	} else {
		console.log (b);
	}

testNum(28,300)


// f1) Crea otra condicion else if para contemplar la posibilidad de que los dos números sean iguales:

function testNum(a,b) {
	if (a > b) {
		console.log(a)
	} else if (b > a){
		console.log (b)
	} else {
		console.log ('The numbers are equal')
	}
}

testNum(228,228)

// g) Crea una array de 5 numeros, y recorrela, mostrando además un mensaje cuando, esté a la mitad, muestre un mensaje 'We are in the middle of loop'.

function enumeration(info){
	var x = (info.length/2);
	var y = parseInt(x);
	for(var i = 0;i<info.length;i++){

		if (i === y) {
			console.log("We are in the middle of the loop");
		}
		console.log(info[i])
	}
}

enumeration([10,20,30,40,50])

// g1) Declara tu nombre y tu edad dos variables y crea un condicional para, en caso de no coincidir con tus datos, mostrar un error

function recognition(name,age){
	var myName = name;
	var myAge = age;
	
	if(myName==="Jordi" && myAge===48){
		console.log("Hi!! Glad to see u again!")
	} else {
		console.log("this is not you!")
	}

}

recognition('Jordi', 48)


// g2) Crea una array, introduce los datos anteriores y unos cuantos más de forma que al recorrer la array, muestre un mensaje cuando encuentre tus datos.



function find (info){

	if (info.indexOf("Pedro") !== -1 && info.indexOf(41) !== -1) {
		console.log("We find your data!")
	}
	else{
		console.log("Nops")
		
	}
}

find (["Pedro", 30, "Janina", 25, "Jordi", 48, "Catalina", 41])

alternativa ---

function numbered(myName){
		var name = myName.split(' ');
		for (var i = 0; i < name[0].length; i++) 
		var surname = name;
		var separated = surname.split('');
		var result = separated.join(indexOf(i)+"º");{
		if (i == x){
		
		console.log(name[0]);
}
}
} 

numbered("Jordi Ubanell");
