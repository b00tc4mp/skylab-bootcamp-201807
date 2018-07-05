//a) Declara tu nombre y muéstralo por consola:
var name = "Edu";
console.log(name);

//b) Declara tu edad y muéstralo por consola:
var age = 33;
console.log(age);


//c) Declara tu nombre, tu apellido y tu edad en un array en diferentes posiciones y muéstrala por consola:
var array = ["Edu","Berenguer",33,]; 
console.log(array);

//d) Declara tu nombre y tu edad dentro de un objeto y muéstralo por consola:
var object = {name:"Edu" , age: 33};
console.log(object); 

/*e) Ahora utiliza el array que has creado anteriormente para recorrerlo y 
mostrar una a una todas las posiciones del array.*/
for(var i = 0; i < array.length; i++){
	console.log(array[i]);
};

//f) Crea una estructura condicional que imprima el número mayor entre dos números.
var num1 = 13;
var num2 = 23;
if(num1 > num2){
	console.log("El número mayor es el " + num1);
}else{
	console.log("El número mayor es el " + num2);
}

//f1) Crea otra condicion else if para contemplar la posibilidad de que los dos números sean iguales:
var num1 = 13;
var num2 = 23;
if(num1 > num2){
	console.log("El número mayor es el " + num1);
	
}else if (num2 > num1){
	console.log("El número mayor es el " + num2);

}else{
	console.log("Los números són iguales");
}

/*g) Crea una array de 5 numeros, y recorrela, mostrando además un mensaje cuando, esté a la mitad, 
muestre un mensaje 'We are in the middle of loop'.*/
var numArray =[2,34,4,1,4];

for(var i = 0; i < numArray.length; i++){
	if(i === 2){
		console.log('We are in the middle of loop');
		i++;
	}
	console.log(numArray[i]);
} 

/*g1) Declara tu nombre y tu edad dos variables y crea un condicional para, 
en caso de no coincidir con tus datos, mostrar un error*/
var myName = "Edu";
var myAge = 33;
var oneThing = "Pablo";
var otherThing = 34;

if(oneThing != myName || otherThing != myAge){
	console.log("this is not you!");
}else{
	console.log("Hi!! Glad to see u again!");
}

/*g2) Crea una array, introduce los datos anteriores y unos cuantos más de forma que al recorrer la array,
muestre un mensaje cuando encuentre tus datos.*/

var array = ["Edu",33,"Pablo",23,"Sofia","Daniel",12];

for(var i = 0; i < array.length;i++){
	for(var k = 0; k < array.length;k++){
		if(array[i] == "Edu" && array[k] == 33){
			console.log("We find your data! " + array[i]);
		}
	}
}
