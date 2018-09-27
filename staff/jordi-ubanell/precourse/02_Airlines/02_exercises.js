// a) Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto creado más arriba)

function nameList(st1, st2, n3){
			var data = {name:st1, class:st2, id:n3};
			var result = (Object.keys(data));
			console.log(result);
}

nameList("Tony","VII",1);

// Resultado ["name", "class", "id"]


// b) Ahora, crea una función que liste solo los valores de las propiedades.

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			console.log (data.name +  " "  + data.class + " " + data.id)	
}

propertyList("Tony","VII",1)

// Tony VII 1


// c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			console.log (data.name +  " "  + data.class + " " + data.id + " New class: " + data.class);	
}

propertyList("Tony","VII",1)

// Tony XI 1 New class: XI


// d) Ahora, elimina la propiedad ID y asegura los cambios.

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			delete data.id;
			console.log (data.name +  " "  + data.class + " ID don't exist!");	
}

propertyList("Tony","VII",1)

// Tony XI ID don't exist!


// e) Añade una nueva propiedad, por ejemplo city y dale un valor.

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			delete data.id;
			data.city = "Norway";
			console.log (data.name +  " "  + data.class + " " + data.city);	
}

propertyList("Tony","VII",1)

// Tony XI Norway


// e1) Asegura los cambios solo imprimiendo esa nueva propiedad.

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			delete data.id;
			data.city = "Barcelona";
			console.log (data.city);	
}

propertyList("Tony","VII",1)

// Barcelona


// f) Lista el numero de propiedades que contiene el objeto.

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			delete data.id;
			data.city = "Barcelona";
			var result = (Object.keys(data).length);
			console.log(result);
}

propertyList("Tony","VII",1)

// 3


// g) Cambia la propiedad name por fullName.

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			delete data.id;
			data.city = "Barcelona";
			data.fullName = data.name;
			delete data.name;
			console.log (data.fullName);	
}

propertyList("Tony","VII",1)

//Tony


// g1) Asegura los cambios.

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			delete data.id;
			data.city = "Barcelona";
			data.fullName = data.name;
			delete data.name;
			console.log (data.fullName);	
}

propertyList("Tony","VII",1)

// Tony


// h) Lista todas las propiedades del objeto a través de un console.log()

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			delete data.id;
			data.city = "Barcelona";
			data.fullName = data.name;
			delete data.name;
			console.log (data.fullName +" "+ data.class +" "+ data.city );	
}

propertyList("Tony","VII",1)

// Tony XI Barcelona


// h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			delete data.id;
			data.city = "Barcelona";
			data.fullName = data.name;
			delete data.name;
			data.markAverage = "10";
			data.country = "USA";
			data.job = "stadist";
			data.studies = "nudist";
			console.log (data);	
}

propertyList("Tony","VII",1)

// class: "XI", city: "Barcelona", fullName: "Tony", markAverage: "10", country: "USA",


// h2) Asegura los cambios volviendo a listar los valores del objeto

function propertyList(st1, st2, n3){
			data = {name:st1, class:st2, id:n3};
			data.class = "XI";
			delete data.id;
			data.city = "Barcelona";
			data.fullName = data.name;
			delete data.name;
			data.markAverage = "10";
			data.country = "USA";
			data.job = "stadist";
			data.studies = "nudist";
			console.log (data.fullName + " "+data.class +" "+ data.city +" "+ data.country +" "+ data.studies +" "+ data.markAverage);	
}

propertyList("Tony","VII",1)

// Tony XI Barcelona USA nudist 10


// i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros, creando una instancia del objeto con las propiedades de nuestro objeto creado. (Échale un ojo a la referencia de abajo.)

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
}
    var johnProfile = new avenger("John", "Peixets", "Barcelona", "Lampista de la pista", "MIT", "10");


console.log(johnProfile.fullName + " " + johnProfile.classRoom + " " + johnProfile.city + " " + johnProfile.studies + " " + johnProfile.job + " " + johnProfile.markAv);

// John Peixets Barcelona MIT Lampista de la pista 10


// j) Crea otro objeto y imprime sus propiedades por pantalla.

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
}
    var increibleHulk = new avenger("Hulk", "Nuvols", "Estokolmo", "Chemise tester", "Vasel", "8");


console.log(increibleHulk.fullName + " " + increibleHulk.classRoom + " " + increibleHulk.city + " " + increibleHulk.studies + " " + increibleHulk.job + " " + increibleHulk.markAv);

// Hulk Nuvols Estokolmo Vasel Chemise tester 8


// k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia. . Example of property:

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
	this.description = function(){
		console.log(this.fullName + ", " + this.classRoom + ", " + this.city + ", " + this.studies + ", " + this.markAv)
    }
}
    var increibleHulk = new avenger("Hulk", "Nuvols", "Estokolmo", "Chemise tester", "Vasel", "8");
	var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", "10");


	console.log(increibleHulk.description(), tonyStark.description());

// Hulk, Nuvols, Estokolmo, Vasel, 8
// Tony Stark, XI, NYC, MIT, 10


// l) Ahora, crea una función que solo liste los nombres de los objetos instanciados

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
	this.description = function(){
		console.log(this.fullName + ", " + this.classRoom + ", " + this.city + ", " + this.studies + ", " + this.markAv)
    }
}
    var increibleHulk = new avenger("Hulk", "Nuvols", "Estokolmo", "Chemise tester", "Vasel", "8");
	var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", "10");

	var arrayInstances = [increibleHulk, tonyStark];

	arrayInstances.forEach(function(obj){
		console.log(obj.fullName)		
	});

// Hulk   Tony Stark


// m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.

var objs = [{name:'pepe', city: 'BCN'},{name:'josefo', city: 'MDR'},{name:'antoninho', city: 'BCN'}]

var arrFiltered = objs.filter(function(obj){
	return obj.city === 'BCN'
})

console.log('los que viven en BCN son =>')
arrFiltered.forEach(function(obj){
	console.log(obj.name)
})

________________________________


function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
	this.description = function(){
		console.log(this.fullName + ", " + this.classRoom + ", " + this.city + ", " + this.studies + ", " + this.markAv)
    }
}
    var increibleHulk = new avenger("Hulk", "Nuvols", "Estokolmo", "Chemise tester", "Vasel", "8");
	var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", "10");
    var chroma = new avenger("Chroma", "Play", "NYC", "Expresionista", "Lugo", "7");
	var krunch = new avenger("Krunch", "Plus", "NYC", "Pajarero", "Brazil", "9");

	var arrayInstances = [increibleHulk, tonyStark, chroma, krunch];
	
    var arrFiltered = arrayInstances.filter(function(obj){
	return obj.city === 'NYC'
    })


	console.log('los que viven en NY son =>')
	arrFiltered.forEach(function(obj){
		console.log(obj.fullName)
	})

// Tony Stark  Chroma  Krunch


// n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.

function avenger(fullName, classRoom, city, job, studies, markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
    this.description = function() {
        console.log(this.fullName + ", " + this.classRoom + ", " + this.city + ", " + this.studies + ", " + this.markAv)
    }
}
var increibleHulk = new avenger("Hulk", "Nuvols", "Estokolmo", "Chemise tester", "Vasel", 8);
var tonyStark = new avenger("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
var chroma = new avenger("Chroma", "Play", "NYC", "Expresionista", "Lugo", 7);
var krunch = new avenger("Krunch", "Plus", "NYC", "Pajarero", "Brazil", 9);
var jordi = new avenger("Jordi", "Fork", "BCN", "Calibrator", "New Zeland", 10);

var arrayInstances = [increibleHulk, tonyStark, chroma, krunch, jordi];

sumMarkAv = function() {
    var total = 0;
    for (var i = 0; i < arrayInstances.length; i++) {
        total = total + arrayInstances[i].markAv;
    }

    var long = arrayInstances.length;
	return total/long
}

console.log("La media de MarkAv es: " + sumMarkAv());


// La media de MarkAv es: 8.8


// ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id, por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.


var avenger = [
	{id: 1, fullName: "Steve Rogers", avengerName: "Captain America", gender: "Male", city: "New York City", markAv: 10},
	{id: 2, fullName: "Tony Stark", avengerName: "IronMan", gender: "Male", city: "New York City", markAv: 15},
	{id: 3, fullName: "Thor Odinson", avengerName: "Thor", gender: "Male", city: "Los Angeles", markAv: 13},
	{id: 4, fullName: "Bruce Banner", avengerName: "Hulk", gender: "Male", city: "Maryland", markAv: 20},
	{id: 5, fullName: "Clint Barton", avengerName: "Hawkeye", gender: "Male", city: "Los Angeles", markAv: 8},
	{id: 6, fullName: "Natasha Romanoff", avengerName: "Black Widow", gender: "Female", city: "Paris", markAv: 14},
	{id: 7, fullName: "Nick Fury", avengerName: "Nick Fury", gender: "Female", city: "New York City", markAv: 5},
	{id: 8, fullName: "Jaume Serradell", avengerName: "Jaumeserr", gender: "Male", city: "Barcelona", markAv: 18}
];

function couples (myObject) {

	var arr = [];


	for (var i=0; i<avenger.length; i++){
   		arr.push([avenger[i], avenger[i+1]]);
		i++;
} 

//console.log(arr)

	for (var i=0; i<arr.length; i++){

		console.log(Math.max(arr[i][0].markAv, arr[i][1].markAv));

	if (arr[i][0].markAv < arr[i][1].markAv) {
		console.log(arr[i][0].fullName +" vs " + arr[i][1].fullName +  " => " + arr[i][1].fullName + " are better!");
}   else if (arr[i][0].markAv === arr[i][1].markAv) {
		console.log(arr[i][0].fullName + " vs " + arr[i][1].fullName + " => are equals.");
}   else { 
        console.log(arr[i][0].fullName + " vs " + arr[i][1].fullName + " => " + arr[i][1].fullName + " are better!");
}  
}
}


couples(avenger);


//ñ1) Intenta crear las parejas de forma aleatoria.

var avenger = [
	{id: 1, fullName: "Steve Rogers", avengerName: "Captain America", gender: "Male", city: "New York City", markAv: 10},
	{id: 2, fullName: "Tony Stark", avengerName: "IronMan", gender: "Male", city: "New York City", markAv: 15},
	{id: 3, fullName: "Thor Odinson", avengerName: "Thor", gender: "Male", city: "Los Angeles", markAv: 13},
	{id: 4, fullName: "Bruce Banner", avengerName: "Hulk", gender: "Male", city: "Maryland", markAv: 20},
	{id: 5, fullName: "Clint Barton", avengerName: "Hawkeye", gender: "Male", city: "Los Angeles", markAv: 8},
	{id: 6, fullName: "Natasha Romanoff", avengerName: "Black Widow", gender: "Female", city: "Paris", markAv: 14},
	{id: 7, fullName: "Nick Fury", avengerName: "Nick Fury", gender: "Female", city: "New York City", markAv: 5},
	{id: 8, fullName: "Jaume Serradell", avengerName: "Jaumeserr", gender: "Male", city: "Barcelona", markAv: 18}
]

var emptyArray = [];

function randomAvenger(myObject) {

	function shuffle(otherObject) {

		for (var i=0; i<otherObject.length; i++) {
			var randomAvenger = Math.floor(Math.random() * otherObject.length);
			var x = otherObject[i];
			otherObject[i] = otherObject[randomAvenger];
			otherObject[randomAvenger] = x;

			console.log(randomAvenger);
		}

		return otherObject;
	}

	var randomAvengerShuffle = shuffle(myObject);

	for (var i = 0; i < myObject.length-1; i=i+2) {
		emptyArray.push([myObject[i], myObject[i+1]]);
	}

	for (var i=0; i<emptyArray.length; i++) {
		if (emptyArray[i][0].markAv < emptyArray[i][1].markAv) {
			console.log(emptyArray[i][0].fullName + " vs " + emptyArray[i][1].fullName + " => " + emptyArray[i][1].fullName + " is better!");
		} else if (emptyArray[i][0].markAv === emptyArray[i][1].markAv) {
			console.log(emptyArray[i][0].fullName + " vs " + emptyArray[i][1].fullName + " => Are equals!");
		} else {
			console.log(emptyArray[i][0].fullName + " vs " + emptyArray[i][1].fullName + " => " + emptyArray[i][0].fullName + " is better!");
		}
	}

	console.log(emptyArray);
}

randomAvenger(avenger);

