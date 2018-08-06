//a) Declara tu nombre y muéstralo por consola:
 var tuNombre = "Pau"
 console.log(tuNombre);

 //b) Declara tu edad y muéstralo por consola:
 var tuEdad = 37
 console.log(tuEdad);

 //c) Declara tu nombre, tu apellido y tu edad en un array en diferentes posiciones y muéstrala por consola:
var tuArray = ['Pau','Sanchez',37]
console.log(tuArray);

//d) Declara tu nombre y tu edad dentro de un objeto y muéstralo por consola:

var tuObjeto ={name: 'Pau', age: 37}
console.log(tuObjeto);

//e) Ahora utiliza el array que has creado anteriormente para recorrerlo y mostrar una a una todas las posiciones del array.

var info = ['Pau','Sanchez',37]
for (var i=0; i<info.length; i++)
 {console.log(info[i]);}



//f) Crea una estructura condicional que imprima el número mayor entre dos números.

//var a = 25
//var b = 12
//if( a < b) ...

//25

var numberOne = 3;
var numberTwo = 6;
if (numberOne > numberTwo){
	console.log(numberOne)
} if (numberOne < numberTwo){
	console.log(numberTwo)
} else if (numberOne === numberTwo){
	console.log("Both numbers are equal")
};

//f1) Crea otra condicion else if para contemplar la posibilidad de que los dos números sean iguales:

//var a = 25
//var b = 12
//else if(...)
//// The numbers are equal

var numberOne = 3;
var numberTwo = 6;
if (numberOne > numberTwo){
	console.log(numberOne)
} if (numberOne < numberTwo){
	console.log(numberTwo)
} else if (numberOne === numberTwo){
	console.log("Both numbers are equal")
};


//g) Crea una array de 5 numeros, y recorrela, mostrando además un mensaje cuando, esté a la mitad, muestre un mensaje 'We are in the middle of loop'.

//for(...){
//    if(...){"We are in the middle of loop"}
//}

var arrayOf5 = [1,2,3,4,5];
for (var i = 0; i <= arrayOf5.length; i++) {
	if ((arrayOf5.length - arrayOf5[i]) === (arrayOf5[i] - 1)) {console.log('We are in the middle of loop')}
		else if (console.log(arrayOf5[i]));
}


//g1) Declara tu nombre y tu edad dos variables y crea un condicional para, en caso de no coincidir con tus datos, mostrar un error
//Hint: https://www.w3schools.com/js/js_comparisons.asp (Logical Operators section)

//var myName...
//var myAge...
//if(oneThing && otherThing...){"this is not you!"}
//else{"Hi!! Glad to see u again!"}

var myName = "Pau";
var myAge = 37;
if (myName == "Pau" && myAge == 37){console.log("this is you!")}
	else {console.log("Error")};




//g2) Crea una array, introduce los datos anteriores y unos cuantos más de forma que al recorrer la array, muestre un mensaje cuando encuentre tus datos.

//for(...){
//    if(...){"We find your data!" + data[...]}
//}


var data = ["Pau",37,"Maria",26,"Aurora",24,"Ale",22];
for (var i = 0; i < data.length; i++) {
	if (data[i]=="Pau" || data[i]==37) {console.log("We find your data "+data[i])
	} else (console.log("Is not your data "+data[i]));
}