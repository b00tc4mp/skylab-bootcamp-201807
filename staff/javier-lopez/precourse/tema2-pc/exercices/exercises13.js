//i) Crea un constructor de objetos llamado "Avenger", al cual le pasarás ciertos parametros,
// creando una instancia del objeto con las propiedades de nuestro objeto creado.

function avenger(name, superheroName, city, job, partner,age) {
    this.name = name;
    this.superheroName = superheroName;
    this.city = city;
    this.job= job;
    this.partner= partner;
    this.age = age;
}
var captain = new avenger ("Steve Rogers", "Captain America", "New York", "Hero", "Hawkeye", 500);
console.log(captain);