//a) Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto creado más arriba)
var avenger ={
	name : "Tony",
	class : "VII",
	id: 1
};

function listKeys(object){
	//console.log(Object.keys(object));
	for(prop in object){
		console.log(prop);
	};
}
listKeys(avenger);

//b) Ahora, crea una función que liste solo los valores de las propiedades.
function props(object){
	for(prop in object){
		console.log(object[prop]);
	}
}
props(avenger);

//c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.
function changeClass(string){
	avenger.class = string; 
	console.log(avenger.class);
	console.log(avenger);
}
changeClass("XI");

//d) Ahora, elimina la propiedad ID y asegura los cambios.
function deleteId(){
	delete avenger.id;
	console.log(avenger);
}
deleteId();

//e) Añade una nueva propiedad, por ejemplo city y dale un valor.
function addCity(string){	
	avenger.city = string;
}
addCity("New Yor City");

//e1) Asegura los cambios solo imprimiendo esa nueva propiedad.
function showCity(){
	console.log("City => " + avenger.city);
}
showCity();

//f) Lista el numero de propiedades que contiene el objeto.
function listprop(){
	var count = 0;
	//console.log("There are " + Object.keys(avenger).length + "info fields");
	for(prop in avenger){
		count++;
	}
	console.log("There are " + count + " info fields");
}
listprop();

//g) Cambia la propiedad name por fullName.
function changeFullname(){
	avenger.fullName = avenger.name;
	delete avenger.name;
}
changeFullname();

//g1) Asegura los cambios.
console.log(avenger.fullName);

//h) Lista todas las propiedades del objeto a través de un console.log()
function listKeys(object){
	//console.log(Object.keys(object));
	for(prop in object){
		console.log("Hi there, I'm " + avenger.fullName + " with id: " + avenger.id + " and class " + avenger.class);
	};
}
listKeys(avenger);

//h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...
avenger.markAverage = 10;
avenger.country = "EEUU";
avenger.job = "Ingeneer";
avenger.studies = "MIT";

//h2) Asegura los cambios volviendo a listar los valores del objeto
function listObject(){
	for( prop in avenger){
		console.log(prop + " => " + avenger[prop]);
	}
}
listObject();

/*i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros, 
creando una instancia del objeto con las propiedades de nuestro objeto creado.*/
function avenger(fullName, classRoom, city, job, studies,markAv) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job= job;
    this.studies= studies;
    this.markAv = markAv;
}

var tonyStark = new avenger("Tony Stark", "XI", "NY", "Ingeneer", "MIT", 10);
console.log(tonyStark);

//j) Crea otro objeto y imprime sus propiedades por pantalla.
var hulk = new avenger("Hulk" , "XX" , "NY", "Ingeneer", "MIT", 15);

function showHulk(){
	for(prop in hulk){
		console.log(prop + " => " + hulk[prop]);
	}
}
showHulk();

/*k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia.
Example of property:*/
function avenger(fullName, classRoom, city, job, studies,markAv) {
        this.fullName = fullName;
        this.classRoom = classRoom;
        this.city = city;
        this.job = job;
        this.studies = studies;
        this.markAv = markAv;
        this.description = function(){
            console.log(this.fullName + ", " + this.city + 
            	" , " + this.job + " , " + this.studies + " , " + this.markAv);
        }
    }
var hulk = new avenger("Hulk" , "XX" , "Boston", "Ingeneer", "MIT", 15);
var tonyStark = new avenger("Tony Stark", "XI", "NY", "Ingeneer", "MIT", 10);
var hawkeye = new avenger("Hawkeye","XX","NY","Soldier","Shield",9);
var captainAmerica = new avenger("Captain America","XIX","Washington","Soldier","Shield",11);
var spiderman = new avenger("Spiderman","XXI","NY","photographer","Shield",7);

hulk.description();
tonyStark.description();

//l) Ahora, crea una función que solo liste los nombres de los objetos instanciados
//Primero creo un array e inserto las instancias para poder trabajar con ellos
var avengers = new Array();
avengers.push(hulk);
avengers.push(tonyStark);
avengers.push(hawkeye);
avengers.push(captainAmerica);
avengers.push(spiderman);

function onlyName(){
	avengers.forEach(function(obj){
		console.log(obj.fullName);
	});
}
onlyName();

//m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, 
//crea una función para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.
function sameCity(){
	var max = 0;
	var count = 0;
	var element = new Array();
     
	for(var i = 0; i<avengers.length;i++){
		var count = 0;
		for(var k = 0; k<avengers.length;k++){
			if(avengers[i].city === avengers[k].city){
				count++;
			}
			if(count > max){
				rep = avengers[k].city;
				max = count;
			}
	}
	}
	avengers.forEach(function(obj){
		if(obj.city === rep){
			element.push(obj.fullName)
		}
	})
	console.log("Are " + max + " avengers living in " + rep + " : "  + element);
}
sameCity();

//n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.
var edu = new avenger("Edu","XX" , "Barcelona", "Developer", "Skylab", 20);
avengers.push(edu);

function average(){
var acc = 0;
var count = 0;
	avengers.forEach(function(obj){
		acc += obj.markAv;
		count++;
	});
	console.log("The average is: " + acc/count);
}
average();

/*ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id, 
por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.*/

hulk.id = 0;
tonyStark.id = 1;
hawkeye.id = 2;
edu.id = 3;

function match(){
	var count = 1;
	for(var i =0; i< avengers.length;i+=2){
		console.log(avengers[i].fullName + " => " + avengers[count].fullName);
		if(avengers[i].markAv > avengers[count].markAv){
			console.log("El más fuerte de los dos es: " + avengers[i].fullName);
		}else{
			console.log("El más fuerte de los dos es: " + avengers[count].fullName);
		}
		count+=2;
	}	
}
match();

//ñ1) Intenta crear las parejas de forma aleatoria.
function matchRandom(){
	var size = avengers.length;
	var newArray = new Array();
	var count = 1;

	//Creo un nuevo array de forma aleatorio para poderlo recorrer 
	for(var i =0; i<size;i++){
		var range = avengers.length;
		var random = Math.floor(Math.random() * (range));

		newArray.push(avengers[random]);
		avengers.splice(random,1);
	}

	for(var i =0; i< newArray.length;i+=2){
		console.log(newArray[i].fullName + " => " + newArray[count].fullName);
		if(newArray[i].markAv > newArray[count].markAv){
			console.log("El más fuerte de los dos es: " + newArray[count].fullName);
		}else{
			console.log("El más fuerte de los dos es: " + newArray[count].fullName);
		}
		count+=2;
	}	
}
matchRandom();







































