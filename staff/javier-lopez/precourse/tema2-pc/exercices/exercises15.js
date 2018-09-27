//k) Crea una propiedad del objeto que liste automáticamente los valores de la instancia.

function anotherAvenger(name, superheroName, age, city){
	this.name = name;
	this.superhero = superheroName;
	this.age = age;
	this.city = city;
	this.listProperties = function(){
    console.log(this.name + ", " + this.superhero)
};
}

var groot = new anotherAvenger("I'm Groot", "I'm Groot", 16, "I'm Groot");
groot.listProperties();

//Ejemplo Alejandro
function avenger(fullName, classRoom, city, job, studies,markAv) {
        this.fullName = fullName;
        this.classRoom = classRoom;
        this.city = city;
        this.job = job;
        this.studies = studies;
        this.markAv = markAv;
        this.description = function(){
        console.log(this.fullName + ", " + this.city + "...");/*Aquí puedes añadir todas las propiedades que quieras mostrar*/
        }
    }
    var tonyStark = new avenger ("Tony Stark", "XI", "NYC", "Ingeneer", "MIT", 10);
    tonyStark.description()