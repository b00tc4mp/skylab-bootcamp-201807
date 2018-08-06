var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};
console.log(avenger.name) // "Tony"

//a) Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto creado más arriba)
//console.log(something, somethingMore, somethingMoreAndMore)
//name, class, id
==> https://stackoverflow.com/questions/2717767/javascript-retrieve-object-property-names
==> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys

function exerciseA(){

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};
console.log(Object.keys(avenger).join());

};

exerciseA();

//b) Ahora, crea una función que liste solo los valores de las propiedades.
//console.log(somethingThatShowsThings) //Tony, VII, 01
==> https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/values



function exerciseB(){

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

console.log(Object.values(avenger).join());


};

exerciseB();



//c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.
//console.log(property.ThisProperty) //new class = XI
==>http://www.dyn-web.com/tutorials/object-literal/properties.php

function exerciseC(classObj) {

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

avenger.class = classObj;

console.log("new class = "+avenger.class);


};

exerciseC("XI");


//d) Ahora, elimina la propiedad ID y asegura los cambios.
//console.log(property.ThisProperty) //Not exist :(
==> https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object
==> https://stackoverflow.com/questions/455338/how-do-i-check-if-an-object-has-a-key-in-javascript

function exerciseD(keyDelete){

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

delete avenger.keyDelete;

var keyExists = "";

if (keyDelete in avenger){
	keyExists = "Not exist :("
};


console.log(keyExists);

};

exerciseD("id");



//e) Añade una nueva propiedad, por ejemplo city y dale un valor.
//http://www.w3schools.com/js/js_properties.asp
==>https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object

function exerciseE(addKey,keyValue){

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

avenger[addKey] = keyValue;

console.log(avenger[addKey]);


};

exerciseE ("Hero",true);




//e1) Asegura los cambios solo imprimiendo esa nueva propiedad.
//console.log(city) // City => New York City

function exerciseE(addKey,keyValue){

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

avenger[addKey] = keyValue;
var nameKey = addKey;
console.log(nameKey+" => "+avenger[addKey]);


};

exerciseE ("Hero",true);





//f) Lista el numero de propiedades que contiene el objeto.
//console.log() // There are 4 info fields
==>https://stackoverflow.com/questions/5533192/how-to-get-object-length

function exerciseE(addKey,keyValue){

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

avenger[addKey] = keyValue;
var nameKey = addKey;
var ObjectLength = Object.keys(avenger).length;
console.log(nameKey+" => "+avenger[addKey]);
console.log("There are "+ObjectLength+" info fields");


};

exerciseE ("Hero",true);





//g) Cambia la propiedad name por fullName.
==>https://medium.com/front-end-hacking/immutably-rename-object-keys-in-javascript-5f6353c7b6dd

function exerciseG(){

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

avenger.fullName = avenger.name;
delete avenger.name;

console.log(avenger);


};

exerciseG ();






//g1) Asegura los cambios.
//console.log(fullName) // Tony Stark

function exerciseG1(){

var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

avenger.fullName = avenger.name;
delete avenger.name;

console.log(avenger.fullName);


};

exerciseG1 ();







//h) Lista todas las propiedades del objeto a través de un console.log()
//console.log(...) // "Hi there, I'm Tony Stark..."

function exerciseH(){

var avenger = {
	name: "Tony Stark",
	class: "VII",
	id: 1

};

console.log("Hi there, I'm "+avenger.fullName+" my class is "+avenger.class+" and my id is the "+avenger.id)

};

exerciseH();





//h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...
var avenger = {
	fullName:"Tony Stark",
	class: "VII",
	id: 1
    };


function addProps(keyName,propertyValue){
	avenger[keyName] = propertyValue;
};

function exerciseH1(keyName,propertyValue){
	addProps(keyName,propertyValue);
	console.log(avenger);
};

exerciseH1("markAverage",3);


//h2) Asegura los cambios volviendo a listar los valores del objeto
//console.log(location) // NYC

var avenger = {
	fullName:"Tony Stark",
	class: "VII",
	id: 1
    };


function addProps(keyName,propertyValue){
	avenger[keyName] = propertyValue;
};

function exerciseH2(keyName,propertyValue){
	addProps(keyName,propertyValue);
	console.log(avenger);
};

exerciseH2("location","NYC");
console.log(avenger.location);




//i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros, 
//creando una instancia del objeto con las propiedades de nuestro objeto creado. (Échale un ojo a la referencia de abajo.)
//http://www.w3schools.com/js/js_object_definition.asp
//Example:

function Avenger(fullName, classRoom, city, job, studies,markAv) {
this.fullName = fullName;
this.classRoom = classRoom;
this.city = city;
this.job= job;
this.studies= studies;
this.markAv = markAv;
}
var tonyStark = new Avenger ("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10)
console.log(tonyStark)

function Vengadores(nombreCompleto, clase, ciudad, trabajo, estudios, puntuacion) {
this.nombreCompleto = nombreCompleto;
this.clase = clase;
this.ciudad = ciudad;
this.trabajo = trabajo;
this.estudios = estudios;
this.puntuacion = puntuacion;
};

var tonyStark = new Vengadores("Tony Stark", "XX", "Barcelona", "Ingeniero", "UPC", 100);
console.log(tonyStark);




//j) Crea otro objeto y imprime sus propiedades por pantalla.

//var otherAvenger = new Avenger...
//console.log(otherAvenger) // Hulk...

var Hulk = new Vengadores ("Hulk Hogan", "XX2", "Torremolinos", "Actor", "UAB", 65);
console.log(Hulk);






//k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia. . Example of property:
==>https://www.thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/
==>Nota: para acceder (y ejecutar) directamenta a la función que hay dentro de un objeto (específico): xxnombrevarobjetoxx.xxnombrefuncionxx(); 


function Vengadores(nombreCompleto, clase, ciudad, trabajo, estudios, puntuacion) {
this.nombresCompleto = nombreCompleto;
this.clase = clase;
this.ciudad = ciudad;
this.trabajo = trabajo;
this.estudios = estudios;
this.puntuacion = puntuacion;
this.listaCosas = function (){
	console.log(this.nombresCompleto+this.clase+this.ciudad);
};
};


var tonyStark = new Vengadores("Tony Stark", "XX", "Barcelona", "Ingeniero", "UPC", 100);
console.log(tonyStark);
tonyStark.listaCosas();

...
...
...
//this.listProperties: function(){
//    console.log(this.name + ", " + this.class) 
//};
//}
//Spoiler! sweat_smile

//l) Ahora, crea una función que solo liste los nombres de los objetos instanciados
//console.log(someFunction) // Tony Stark, Hulk, Thor...

==> Para filtrar array con push, primero Crear array de elementos: https://youtu.be/EyG_2AdHlzY?t=3m54s
https://stackoverflow.com/questions/24353095/creating-a-array-of-objects-using-a-constructor
==> Usar high order function map, para crear nueva array: https://youtu.be/bCqtb-Z5YGQ?t=4m3s

DUDAS: pq? SI COLOCO //var vengadores = [];// arriba de todo, no me deja filtrar pero si agregar elemntos y si lo coloco dentro de la funcion si que me permite filtrar?????




function Vengador(nombreCompleto,ciudad){
	this.nombreCompleto = nombreCompleto;
	this.ciudad = ciudad;
};

let vengadores = [];

function agregarVengador (nombreCompleto,ciudad){
		vengadores.push(new Vengador(nombreCompleto,ciudad));
		/*printNames();*/
};


function printNames(){
		let nombreFiltrados = vengadores.map(function(x) {
		return x.nombreCompleto});
		console.log(nombreFiltrados.join(", "));
		
}

agregarVengador ("Tony","Torrevieja");
agregarVengador ("Manolo","NYC");
agregarVengador ("Paco","London");
agregarVengador ("Maria","Sevilla");
agregarVengador ("Ale","Granada");
agregarVengador ("Aurora","Madrid");


printNames();




//m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función para que solo liste los nombres de los 
//Avengers que sean de la misma ciudad y cuantos hay.
//console.log(myFunction) // Are 3 avengers living in NYC: Tony, Hulk, Hawkeye
//Hint: Intenta tener a todos los objetos dentro de una array, al tener todos los datos juntos, podrás filtrarlos y mostrarlos...
//Resources => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=control => https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach

==> como acceder al valor especifico("Access Array Data with Indexes"), de una prpoiedad especifica, en un array especifico de un objeto (ej: console.log(cars[0].make)): https://youtu.be/RxjQgIhEPWE?t=1m57s
==> filter  http://adripofjavascript.com/blog/drips/filtering-arrays-with-array-filter.html


function Vengador(nombreCompleto,ciudad,markAv,id){
	this.nombreCompleto = nombreCompleto;
	this.ciudad = ciudad;
	this.markAv = markAv;
	this.id = id;
};

let vengadores = [];

function agregarVengador (nombreCompleto,ciudad,markAv,id){
		vengadores.push(new Vengador(nombreCompleto,ciudad,markAv,id));
};

let ciudadesUnicas = [];

function listaciudades(){
		let arrayDeCiudades = vengadores.map(function(x) {
		return x.ciudad});
		let ciudadesUnicas =  arrayDeCiudades.filter(function (item,pos) {
			return arrayDeCiudades.indexOf(item) == pos;
		});
		/*console.log(ciudadesUnicas);*/
		
		for (var i = 0; i < ciudadesUnicas.length; i++) {
			let ciudadZero = vengadores.filter(function(el,ind,arr){
				return (el.ciudad === ciudadesUnicas[i]);
			}).map(function(el){
				return el.nombreCompleto;
			});
			console.log("Are " + ciudadZero.length + " avengers living in " + ciudadesUnicas[i] + " : " + ciudadZero.join(", "));
	};
		
};

agregarVengador ("Tony","Torrevieja",10,"X");
agregarVengador ("Manolo","Torrevieja",8,"Y");
agregarVengador ("Paco","London",7,"Z");
agregarVengador ("Poco","London",5,"X");
agregarVengador ("Poca","London",6,"Y");
agregarVengador ("Pau","Salou",10,"Z");	

listaciudades();


/*function pruebaFiltro () {
		let arrTorrevieja = vengadores.filter(function(el,ind,arr){
				return (el.ciudad[ind] === el.ciudad[!ind]);
			})
		console.log(arrTorrevieja);
}*/
/*
function pruebaFiltro () {
		let arrTorrevieja = vengadores.filter(function(el,ind,arr){
				return (el.ciudad === "Torrevieja");
			}).map(function(el){
				return el.nombreCompleto;
			});
		console.log(arrTorrevieja);
}
*/

/*function groupBy(Array, pro) {
  return Array.reduce(function (accumu, objeto) {
    var key = objeto[pro];
    if (!accumu[key]) {
      accumu[key] = [];
    }
    accumu[key].push(objeto);
    return accumu;
  }, {});
}

function agrupados(){
	let agrupa = groupBy (vengadores,"ciudad");
	console.log(agrupa);
}*/



/*pruebaFiltro ();*/


/*
console.log("Are "+3+" avengers living in "+ciudad+" : "+nombresspearadosporcomasconjoin(", "));
*/

//n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.
==> usar reduce para encontrar media
function Vengador(nombreCompleto,ciudad,markAv,id){
	this.nombreCompleto = nombreCompleto;
	this.ciudad = ciudad;
	this.markAv = markAv;
	this.id = id;
};

let vengadores = [];

function agregarVengador (nombreCompleto,ciudad,markAv,id){
		vengadores.push(new Vengador(nombreCompleto,ciudad,markAv,id));
};

let ciudadesUnicas = [];

function media(){
		let arrayDeMarkavs = vengadores.map(function(x) {
		return x.markAv});
		console.log(arrayDeMarkavs);
		let mediaMarkAvs = arrayDeMarkavs.reduce((total, markAvs) => total + markAvs) / arrayDeMarkavs.length;
		console.log(mediaMarkAvs.toFixed(3));
		
		
	};
		


agregarVengador ("Tony","Torrevieja",10,"X");
agregarVengador ("Manolo","Torrevieja",8,"Y");
agregarVengador ("Paco","London",7,"Z");
agregarVengador ("Poco","London",5,"X");
agregarVengador ("Poca","London",6,"Y");
agregarVengador ("Pau","Salou",10,"Z");	

media();


//ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id, por comodidad al aparejarlos), 
//es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.
//console.log(myFunction()) 
// HawkEye vs Tony => Tony is better! \n Thor vs Hulk => Hulk is better! \n Vision vs Captain America => Vision is better

function Vengador (nombre,ciudad,marca,id) {
	this.nombre = nombre;
	this.ciudad = ciudad;
	this.marca = marca;
	this.id = id;

};

let vengadores = [];

function constructorVengador (nombre,ciudad,marca,id){
	vengadores.push(new Vengador(nombre,ciudad,marca,id));
	
};

let uniqueIds = [];
let parejas = [];
let filters = {};
let winner = "";

function filterPorID (){
  let arrIds = vengadores.map(function (item){
 	return item.id});
 	let uniqueIds = arrIds.filter(function(item,pos){
 	return arrIds.indexOf(item) == pos;	
 	})  
 	console.log(uniqueIds); // ["X", "Y", "Z"]
 	
 	for (var i = 0; i < uniqueIds.length; i++) {
 		filters[i] = [];
 		for (var j = 0; j < vengadores.length; j++) {
 		if (vengadores[j].id === uniqueIds[i]) {
 			filters[i].push(vengadores[j])}
 		
 	}};
  	console.log(filters);
  	
  	//for (var i = 0; i < uniqueIds.length; i++) {  	
  	//	for (var j = 0; j < filters[i].length; j++){	
  	// if (filters[i][j].marca < filters[i][++j].marca){
  	//	winner = filters[i][j].nombre;}
  	//else {winner = filters[i][++j].nombre;} 
  	//console.log(filters[i][j].nombre + " VS " + "yo"/*filters[i][++j].nombre*/ + " => " + winner +" is better!" );
  	
  	for (var i = 0; i < uniqueIds.length; i++) {  	
  	    if (filters[i][0].marca > filters[i][1].marca){
  	    winner = filters[i][0].nombre;}
  	    else {winner = filters[i][1].nombre;} 
  	    console.log(filters[i][0].nombre + " VS " + filters[i][1].nombre + " => " + winner +" is better!" );


  	};
};


constructorVengador ("Tony","Torrevieja",10,"X");
constructorVengador ("Manolo","Torrevieja",8,"Y");
constructorVengador ("Paco","London",7,"Z");
constructorVengador ("Poco","London",5,"X");
constructorVengador ("Poca","London",6,"Y");
constructorVengador ("Pau","Salou",10,"Z");	

filterPorID ();





//ñ1) Intenta crear las parejas de forma aleatoria.

//Hint=> https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random

function Vengador (nombre,valor) {
	this.nombre = nombre;
	this.valor = valor;
	

};

let vengadores = [];

function nuevoVengador (nombre,valor){
	vengadores.push(new Vengador(nombre,valor));

};

nuevoVengador ("NombreA",10);
nuevoVengador ("NombreB",5);
nuevoVengador ("NombreC",6);
nuevoVengador ("NombreD",7);
nuevoVengador ("NombreE",8);

versusUno = "";
versusDos = "";

function numerosRandom(){
	versusUno = Math.round(Math.random() * (vengadores.length - 1) + 0);
	versusDos = Math.round(Math.random() * (vengadores.length - 1) + 0);
	console.log(versusUno + " " + vengadores[versusUno].valor);
	console.log(versusDos + " " + vengadores[versusDos].valor);
}

let battle = "";

function printBattle(){
	numerosRandom();
	if (vengadores[versusUno].valor > vengadores[versusDos].valor){
		battle = vengadores[versusUno].nombre + " VS " + vengadores[versusDos].nombre + " ==> " + vengadores[versusUno].nombre + " is better!";
	} else if (vengadores[versusUno].valor < vengadores[versusDos].valor){
		battle = vengadores[versusUno].nombre + " VS " + vengadores[versusDos].nombre + " ==> " + vengadores[versusDos].nombre + " is better!";
	}
	else {
		battle = vengadores[versusUno].nombre + " y "+ vengadores[versusDos].nombre +" Estan empatados";
	}
	

	console.log(battle);

}
printBattle();	





