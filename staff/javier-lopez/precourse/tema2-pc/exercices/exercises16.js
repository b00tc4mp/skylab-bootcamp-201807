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

function ShowingNames(Object, Object2){
	//Declaramos el array
	var Arrays = [];

	//Metemos los objetos en un array
	Arrays.push(avenger);
	Arrays.push(avenger1);

	//Hacemos un array de los nombres
	var NameArray = [];

	for(const value of Arrays){
		NameArray.push(value.Name);
		//console.log(value.Name);
	}
	console.log(NameArray.join(', '));
}

ShowingNames(avenger, avenger1);