//j) Crea otro objeto y imprime sus propiedades por pantalla.

var avenger = {
	Name: "Thor",
	Country: "Asgard",
	Age: 35
};


function ShowProperties(Object){
	for(var property in Object){
  		console.log(property);
	}
}

ShowProperties(avenger);