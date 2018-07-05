//a) Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto creado más arriba)
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

var newArr = [];

function listObj(obj) {
	for (var key in obj) {
		newArr.push(key);
	}
}
listObj(avenger);

console.log(newArr.join(', '));

//b) Ahora, crea una función que liste solo los valores de las propiedades.
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

var newArr = [];

function listObj(obj) {
	for(var key in obj) {
		newArr.push(obj[key]);
	}
}
listObj(avenger);

console.log(newArr.join(', '));

//c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj) {
	obj.class = 'XI';
	console.log('new ' + Object.keys(obj)[1] + ' = ' + obj.class);
}
listObj(avenger);

//d) Ahora, elimina la propiedad ID y asegura los cambios.
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj) {
	delete obj.class;
	console.log(obj);
}
listObj(avenger);

//e) Añade una nueva propiedad, por ejemplo city y dale un valor.
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj) {
	delete obj.class;
	obj.city = 'New York City';
	console.log(obj);
}
listObj(avenger);

//e1) Asegura los cambios solo imprimiendo esa nueva propiedad.
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj) {
	obj.city = 'New York City';
	console.log('City => ' + obj.city);
}
listObj(avenger);

//f) Lista el numero de propiedades que contiene el objeto.
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj) {
	obj.city = 'New York City';
	console.log('City => ' + obj.city);
	console.log('There are ' + Object.keys(obj).length + ' info fields');
}
listObj(avenger);

//g) Cambia la propiedad name por fullName.
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj) {
	obj.city = 'New York City';
	console.log('City => ' + obj.city);
	console.log('There are ' + Object.keys(obj).length + ' info fields');
	obj.fullname = obj.name;
	obj.fullname = 'Tony Stark';
	delete obj.name;
	console.log(obj);
}
listObj(avenger);

//g) Cambia la propiedad name por fullName.
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj) {
	obj.city = 'New York City';
	console.log('City => ' + obj.city);
	console.log('There are ' + Object.keys(obj).length + ' info fields');
	obj.fullname = 'Tony Stark';
	delete obj.name;
	console.log(obj.fullname);
}
listObj(avenger);

//h) Lista todas las propiedades del objeto a través de un console.log()
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj) {
	obj.city = 'New York City';
	console.log('City => ' + obj.city);
	console.log('There are ' + Object.keys(obj).length + ' info fields');
	obj.fullname = 'Tony Stark';
	delete obj.name;
	console.log('Hi there, I\'m ' + obj.fullname + '. I live in ' + obj.city + '. My class is ' + obj.class + '.');
}
listObj(avenger);

//h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj, city, fullname, markAv, country, job, studies) {
	obj.city = city
	console.log('City => ' + obj.city);
	console.log('There are ' + Object.keys(obj).length + ' info fields');
	obj.fullname = fullname;
	delete obj.name;
	obj.markAverage = markAv;
	obj.country = country;
	obj.job = job;
	obj.studies = studies;

	console.log(obj);
}
listObj(avenger, 'New York City', 'Tony Stark', 20, 'USA', 'Scientist', 'MIT');

//h2) Asegura los cambios volviendo a listar los valores del objeto
var avenger = { 
    name : "Tony", 
    class : "VII", 
    id : 1 
};

function listObj(obj) {
	obj.city = 'New York City';
	console.log('City => ' + obj.city);
	console.log('There are ' + Object.keys(obj).length + ' info fields');
	obj.fullname = 'Tony Stark';
	delete obj.name;
	obj.markAverage = 20;
	obj.country = 'USA';
	obj.job = 'Scientist';
	obj.studies = 'MIT';

	for(var key in obj) {
		console.log(key + ' : ' + obj[key])
	}
}
listObj(avenger);

/*
i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás
ciertos parametros, creando una instancia del objeto con las propiedades
de nuestro objeto creado. (Échale un ojo a la referencia de abajo.)
*/

function avenger(fullName, classRoom, city, job, studies, markAv) {
	this.fullName = fullName;
	this.classRoom = classRoom;
	this.city = city;
	this.job = job;
	this.studies = studies;
	this.markAv = markAv;
}

var tonyStark = new avenger('Tony Stark', 'XI', 'NYC', 'Ingeneer', 'MIT', 10);
console.log(tonyStark);

//j) Crea otro objeto y imprime sus propiedades por pantalla.
function avenger(fullName, classRoom, city, job, studies, markAv) {
	this.fullName = fullName;
	this.classRoom = classRoom;
	this.city = city;
	this.job = job;
	this.studies = studies;
	this.markAv = markAv;
}

var hulk = new avenger('Hulkito', 'X', 'Brazil', 'Scientist', 'MIR', 20);
console.log(hulk);

/*
k) Crea una propiedad del objeto que liste automáticamente los valores
de la instancia.
*/
function avenger(fullName, classRoom, city, job, studies, markAv) {
	this.fullName = fullName;
	this.classRoom = classRoom;
	this.city = city;
	this.job = job;
	this.studies = studies;
	this.markAv = markAv;
	this.listProperties = function(){
		console.log(this.fullName + ', ' + this.classRoom + ', ' + this.city + ', ' + this.job + ', ' + this.studies + ', ' + this.markAv)
	}
}
var hulk = new avenger('Hulkito', 'X', 'Brazil', 'Scientist', 'MIR', 20);
hulk.listProperties();

/*
l) Ahora, crea una función que solo liste los nombres de los objetos
instanciados
*/
function avenger(fullName, classRoom, city, job, studies, markAv) {
	this.fullName = fullName;
	this.classRoom = classRoom;
	this.city = city;
	this.job = job;
	this.studies = studies;
	this.markAv = markAv;
	this.listProperties = function(){
		console.log(this.fullName + ', ' + this.classRoom + ', ' + this.city + ', ' + this.job + ', ' + this.studies + ', ' + this.markAv)
	}
}

var hulk = new avenger('Hulkito', 'X', 'Brazil', 'Scientist', 'MIR', 20);
var tonyStark = new avenger('Tony Stark', 'XI', 'NYC', 'Ingeneer', 'MIT', 10);
var gerard = new avenger('Bastel', 'I', 'Polinyà', 'Catalunya', 'Nada', 'Nada', 2);

function listAvengers() {

	var arrAvengers = [hulk, tonyStark, gerard];
	var emptyArr = [];

	arrAvengers.forEach(function(obj){
		emptyArr.push(obj.fullName);
	});

	console.log(emptyArr.join(', '));
}
listAvengers();

/*
m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad,
crea una función para que solo liste los nombres de los Avengers que sean de la
misma ciudad y cuantos hay.
*/

//Are 3 avengers living in NYC: Tony, Hulk, Hawkeye


function avenger(fullName, classRoom, city, job, studies, markAv) {
	this.fullName = fullName;
	this.classRoom = classRoom;
	this.city = city;
	this.job = job;
	this.studies = studies;
	this.markAv = markAv;
	this.listProperties = function(){
		console.log(this.fullName + ', ' + this.classRoom + ', ' + this.city + ', ' + this.job + ', ' + this.studies + ', ' + this.markAv)
	}
}

var hulk = new avenger('Hulkito', 'X', 'Brazil', 'Scientist', 'MIR', 20);
var tonyStark = new avenger('Tony Stark', 'XI', 'NYC', 'Ingeneer', 'MIT', 10);
var gerard = new avenger('Bastel', 'I', 'Polinyà', 'Catalunya', 'Nada', 'Nada', 2);
var jaume = new avenger('James', 'V', 'Polinyà', 'Catalunya', 'Todo', 'Todo', 30);
var alex = new avenger('Alnandro', 'VII', 'Barcelona', 'Catalunya', 'Algo de código', 'No se', 4);

var avengersObj = [hulk, tonyStark, gerard, jaume, alex];
var newArr = [];
var newCity = [];


//// MANERA 1 CON FUNCION DECLARADA
function findEqualCity(obj) {
	console.log(obj);
	return obj.city === 'Polinyà';
}

var filtered = avengersObj.filter(findEqualCity);


//// MANERA 2 CON FUNCION ANONIMA
var filtered = avengersObj.filter(function(obj) {
	console.log(obj);
	return obj.city === 'Polinyà';
});

for(var key in filtered) {
	newArr.push(filtered[key].fullName);
}

console.log('Are ' + filtered.length + ' living in ' + filtered[key].city + ': ' + newArr.join(', '));

/*
n) Para acabar, créate a ti mismo y crea una función que recoja
todas las markAv y muestre la media.
*/
var acc = 0;

function avenger(fullName, classRoom, city, job, studies, markAv) {
	this.fullName = fullName;
	this.classRoom = classRoom;
	this.city = city;
	this.job = job;
	this.studies = studies;
	this.markAv = markAv;
	this.listProperties = function(){
		console.log(this.fullName + ', ' + this.classRoom + ', ' + this.city + ', ' + this.job + ', ' + this.studies + ', ' + this.markAv)
	}
}

var hulk = new avenger('Hulkito', 'X', 'Brazil', 'Scientist', 'MIR', 20);
var tonyStark = new avenger('Tony Stark', 'XI', 'NYC', 'Ingeneer', 'MIT', 10);
var gerard = new avenger('Bastel', 'I', 'Polinyà', 'Catalunya', 'Nada', 2);
var jaume = new avenger('James', 'V', 'Polinyà', 'Catalunya', 'Todo', 30);
var alex = new avenger('Alnandro', 'VII', 'Barcelona', 'Algo de código', 'No se', 4);

var avengersObj = [hulk, tonyStark, gerard, jaume, alex];

function avengerAverage() {
	avengersObj.forEach(function(x){
		acc += x.markAv;
		
	})
	var average = Math.floor(acc / avengersObj.length);
	console.log(average);
}
avengerAverage();

/*
ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id,
por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.
*/

var emptyArr = [];

function avenger(fullName, classRoom, city, job, studies, markAv) {
	this.fullName = fullName;
	this.classRoom = classRoom;
	this.city = city;
	this.job = job;
	this.studies = studies;
	this.markAv = markAv;
	this.listProperties = function(){
		console.log(this.fullName + ', ' + this.classRoom + ', ' + this.city + ', ' + this.job + ', ' + this.studies + ', ' + this.markAv)
	}
}

var hulk = new avenger('Hulkito', 'X', 'Brazil', 'Scientist', 'MIR', 20);
var tonyStark = new avenger('Tony Stark', 'XI', 'NYC', 'Ingeneer', 'MIT', 10);
var gerard = new avenger('Bastel', 'I', 'Polinyà', 'Catalunya', 'Nada', 2);
var jaume = new avenger('James', 'V', 'Polinyà', 'Catalunya', 'Todo', 30);
var alex = new avenger('Alnandro', 'VII', 'Barcelona', 'Algo de código', 'No se', 4);
var julapeno = new avenger('Julapeño', 'II', 'Hawai', 'Caca', 'Soldado', 12);

var avengersObj = [hulk, tonyStark, gerard, jaume, alex, julapeno];

function pairsAvengers() {

	for(var i=0; i<avengersObj.length; i++) {
		emptyArr.push([avengersObj[i], avengersObj[i+1]]);
		i++;
	}
	console.log(emptyArr);

	for(var j=0; j<emptyArr.length; j++) {
		
		console.log(Math.max(emptyArr[j][0].markAv, emptyArr[j][1].markAv))
		if(emptyArr[j][0].markAv < emptyArr[j][1].markAv) {
			console.log(emptyArr[j][0].fullName + ' vs ' + emptyArr[j][1].fullName + ' => ' + emptyArr[j][1].fullName + ' is better')
		} else {
			console.log(emptyArr[j][0].fullName + ' vs ' + emptyArr[j][1].fullName + ' => ' + emptyArr[j][0].fullName + ' is better')
		}
	}
}

pairsAvengers();

//ñ1) Intenta crear las parejas de forma aleatoria.ç
//var emptyArr = [];

function avenger(fullName, classRoom, city, job, studies, markAv) {
	this.fullName = fullName;
	this.classRoom = classRoom;
	this.city = city;
	this.job = job;
	this.studies = studies;
	this.markAv = markAv;
	this.listProperties = function(){
		console.log(this.fullName + ', ' + this.classRoom + ', ' + this.city + ', ' + this.job + ', ' + this.studies + ', ' + this.markAv)
	}
}

var hulk = new avenger('Hulkito', 'X', 'Brazil', 'Scientist', 'MIR', 20);
var tonyStark = new avenger('Tony Stark', 'XI', 'NYC', 'Ingeneer', 'MIT', 10);
var gerard = new avenger('Bastel', 'I', 'Polinyà', 'Catalunya', 'Nada', 2);
var jaume = new avenger('James', 'V', 'Polinyà', 'Catalunya', 'Todo', 30);
var alex = new avenger('Alnandro', 'VII', 'Barcelona', 'Algo de código', 'No se', 4);
var julapeno = new avenger('Julapeño', 'II', 'Hawai', 'Caca', 'Soldado', 12);

var avengersObj = [hulk, tonyStark, gerard, jaume, alex, julapeno];

function randomAvengers() {

	function generateRandomNumber() {
		return Math.floor((Math.random()*6);
	}

	function generateRandomAvengers() {
		
		var emptyArr = [];

		for (var i=0; i<avengersObj.length; i++) {
			var random = generateRandomNumber();
			var genRandom = emptyArr.indexOf(random);
			
			if (genRandom === -1) {
				emptyArr.push(random);
			} else {
				return generateRandomAvengers();
			}	
		}
		return emptyArr;
	}

	var results = generateRandomAvengers();
	console.log(results);

	function pairsAvengers() {
		for(var i=0; i<avengersObj.length; i++) {
			emptyArr.push([avengersObj[i], avengersObj[i+1]]);
			i++;
		}
		console.log(emptyArr);

		for(var j=0; j<emptyArr.length; j++) {
			
			console.log(Math.max(emptyArr[j][0].markAv, emptyArr[j][1].markAv))
			if(emptyArr[j][0].markAv < emptyArr[j][1].markAv) {
				console.log(emptyArr[j][0].fullName + ' vs ' + emptyArr[j][1].fullName + ' => ' + emptyArr[j][1].fullName + ' is better')
			} else {
				console.log(emptyArr[j][0].fullName + ' vs ' + emptyArr[j][1].fullName + ' => ' + emptyArr[j][0].fullName + ' is better')
			}
		}
	}
	pairsAvengers();

}
randomAvengers();











