//l) Ahora, crea una función que solo liste los nombres de los objetos instanciados
//Hacer un array de objetos y for in
var avenger = {
	Name: "Thor",
	Country: "Asgard",
	Age: 35
};

var avenger1 = {
	Name: "Dr. Strange",
	Country: "New York",
	Age: 50
};

function showingNames(Object, Object2){
	//Declaramos el array
	var arrays = [];

	//Metemos los objetos en un array
	arrays.push(avenger);
	arrays.push(avenger1);

	//Hacemos un array de los nombres
	var nameArray = [];

	for(const value of arrays){
		nameArray.push(value.Name);
		//console.log(value.Name);
	}
	console.log(nameArray.join(', '));
}

showingNames(avenger, avenger1);