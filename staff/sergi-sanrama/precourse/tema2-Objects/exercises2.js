//a) Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto creado más arriba)
var alumno = {name:'sergi', class:'newbie', id:1};
function showProperties (object){
	console.log(Object.keys(object));
}
showProperties(almuno);

//b) Ahora, crea una función que liste solo los valores de las propiedades.
var alumno = {name:'sergi', class:'newbie', id:1};

function showValues (object){
	console.log(Object.values(object));
}
showValues(alumno);

//c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.

var alumno = {name:'sergi', class:'newbie', id:1};

function changeValue (object){
	alumno.class="XI";
	console.log(object);
}
changeValue(alumno);

//d) Ahora, elimina la propiedad ID y asegura los cambios.
var alumno = {name:'sergi', class:'newbie', id:1};

function deleteProp (object){
	delete alumno.id;
	console.log(alumno);
}
deleteProp(alumno);

//e) Añade una nueva propiedad, por ejemplo city y dale un valor.

var alumno = {name:'sergi', class:'newbie', id:1};

function addProp (object){
	Object.defineProperty(alumno, "city", {
    value: 'Barcelona',
	});
	console.log(alumno);
}
addProp(alumno);

http://www.w3schools.com/js/js_properties.asp

//e1) Asegura los cambios solo imprimiendo esa nueva propiedad.

var alumno = {name:'sergi', class:'newbie', id:1};

function addProp (object){
	Object.defineProperty(alumno, "city", {
    value: 'Barcelona',
	});
	console.log(alumno.city);
}
addProp(alumno);

//f) Lista el numero de propiedades que contiene el objeto.

var alumno = {name:'sergi', class:'newbie', id:1};

function listProp(object){
	for (var propiedad in alumno){
		console.log(propiedad);
	}
}
listProp(alumno);

//g) Cambia la propiedad name por fullName. //g1) Asegura los cambios.
var alumno = {name:'sergi', class:'newbie', id:1};

function changeProp (object){
	delete alumno.name;
	Object.defineProperty(alumno, "fullName", {
    value: 'Tony Stark',
	});
	console.log(alumno.fullName);
}
changeProp(alumno);

//h) Lista todas las propiedades del objeto a través de un console.log()

var alumno = {name:'sergi', class:'newbie', id:1};

function blablaObject (object){
	console.log("Hi there, I'm " + alumno.name + " ,i'm a " + alumno.class + " and my id is: " + alumno.id)
}
blablaObject(alumno);

//h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...//h2) Asegura los cambios volviendo a listar los valores del objeto
var alumno = {name:'sergi', class:'newbie', id:1};

function addProps(object){
	alumno.markAverage= 10;
	alumno.county="spain";
	alumno.job="student";
	alumno.studies="skylaber";
	console.log(alumno);
}
addProps(alumno);


//i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros, creando una instancia del objeto con las propiedades de nuestro objeto creado. (Échale un ojo a la referencia de abajo.)

//http://www.w3schools.com/js/js_object_definition.asp

//Example:

function avenger(fullName, classRoom, city, job, studies,markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job= job;
    this.studies= studies;
    this.markAv = markAv;
}
var tonyStark = new avenger ("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10)
console.log(tonyStark)

//j) Crea otro objeto y imprime sus propiedades por pantalla.

var condor = new avenger ("Kevin Mitnick", "XX", "NYC", "DarkIngeneer", "MIT", 11)
console.log(condor);

//k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia. . Example of property:

function avenger(fullName, classRoom, city, job, studies,markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job= job;
    this.studies= studies;
    this.markAv = markAv;
	this.listProperties: function(tonyStark){
	    console.log(this.fullName + ", " + this.classRoom + ", " + this.city + ", " + this.job  + ", " + this.studies + ", " + this.markAv) 
	};
}

var tonyStark = new avenger ("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10)
console.log(tonyStark)


//Spoiler! 😅

//l) Ahora, crea una función que solo liste los nombres de los objetos instanciados

console.log(someFunction) // Tony Stark, Hulk, Thor...

//m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.

console.log(myFunction) // Are 3 avengers living in NYC: Tony, Hulk, Hawkeye

//Hint: Intenta tener a todos los objetos dentro de una array, al tener todos los datos juntos, podrás filtrarlos y mostrarlos...

//Resources => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=control => https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach

//n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.

//ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id, por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.

console.log(myFunction()) 
// HawkEye vs Tony => Tony is better! \n Thor vs Hulk => Hulk is better! \n Vision vs Captain America => Vision is better

//ñ1) Intenta crear las parejas de forma aleatoria.

//Hint=> https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random