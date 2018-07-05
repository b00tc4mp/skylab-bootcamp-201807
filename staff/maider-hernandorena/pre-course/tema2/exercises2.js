//a) Escribe una función que liste los nombres de propiedad del objeto (Puedes usar el objeto creado más arriba)
var avenger = {name : "Tony", classRoom : "VII", id : 1}
function names(){
	return avenger.name + ", " + avenger.classRoom + ", " + avenger.id
}
console.log(names());

//b) Ahora, crea una función que liste solo los valores de las propiedades.
function listValueProperties(myKey) {
	for (prop in myKey) {
		console.log(myKey[prop]);
	}	
}
console.log(listValueProperties(avenger));

//c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.
avenger.classRoom = "XI"
console.log(listValueProperties(avenger));

//d) Ahora, elimina la propiedad ID y asegura los cambios.
delete avenger.id;
console.log(listValueProperties(avenger));

//e) Añade una nueva propiedad, por ejemplo city y dale un valor.
avenger.city = "Barcelona";
console.log(listValueProperties(avenger));

//e1) Asegura los cambios solo imprimiendo esa nueva propiedad.
console.log(listValueProperties(avenger.city));

//f) Lista el numero de propiedades que contiene el objeto.
function numKeys(myKey){
    var count = 0;
    for(var prop in myKey)
    {
        count++;
    }
    return count;
}
console.log(numKeys(avenger));

//g) Cambia la propiedad name por fullName.
avenger.fullName = avenger.name;

//g1) Asegura los cambios.
console.log(listValueProperties(avenger.fullName));


//h) Lista todas las propiedades del objeto a través de un console.log()
console.log("Hi there, I'm " + avenger.fullName + " the " + avenger.classRoom + " from " + avenger.city);

//h1) Añade más propiedades al objeto, como... markAverage, country, job, studies...
avenger.country = "Catalunya";
avenger.job = "Frontend Developer";
avenger.studies = "Designer";

//h2) Asegura los cambios volviendo a listar los valores del objeto
console.log (listValueProperties(avenger));

//i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros, creando una instancia del objeto con las propiedades de nuestro objeto creado. (Échale un ojo a la referencia de abajo.)
function Avenger(fullName, classRoom, city, country, job, studies) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.country = country;
    this.job= job;
    this.studies= studies;
}
var tonyStark = new Avenger("Tony Stark", "XI", "Barcelona", "Catalunya", "Frontend Developer", "Designer")
console.log(listValueProperties(tonyStark));

//j) Crea otro objeto y imprime sus propiedades por pantalla.
function otherAvenger(fullName, classRoom, city, country, job, studies) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.country = country;
    this.job= job;
    this.studies= studies;
}
var Maider = new otherAvenger("Maider", "A", "Besasain", "Euskadi", "Frontend", "Designer")
console.log(listValueProperties(Maider));

//k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia. . Example of property:
function thisListProperties(){
	return this.fullName + this.classRoom + this.city + this.country + this.job + this.studies
}
console.log(thisListProperties(Maider));

//l) Ahora, crea una función que solo liste los nombres de los objetos instanciados
function allListProperties(){
	return listValueProperties(avenger.fullName) + thisListProperties(this.fullName)
}
console.log(allListProperties());

//crear array. luego funcion con for each y que llame a la key

//m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.



//n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.



//ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id, por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.



//ñ1) Intenta crear las parejas de forma aleatoria.

