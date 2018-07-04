//j) Crea otro objeto y imprime sus propiedades por pantalla.

var avenger = {
	name: "Thor",
	country: "Asgard",
	age: 35
};


function showProperties(object){
	for(var property in object){
  		console.log(property);
	}
}

showProperties(avenger);