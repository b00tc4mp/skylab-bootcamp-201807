//m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función
// para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.

//Creamos el array de objetos
var heroes = [{Name: "Tony Stark", SuperheroName: "Iron Man", City: "New York"},
			  {Name: "Steve Rogers", SuperheroName: "Captain America", City: "New York"},
			  {Name: "Bruce Wayne", SuperheroName: "Batman", City: "Gotham"},
			  {Name: "Selina Kyle", SuperheroName: "Catwoman", City: "Gotham"}];

	
	//Funcion para identificar los heroes de cada ciudad
	function findHeroes(array, cities){
		//Recorremos el array de objetos
		var sameCity = [];
		for (i in heroes){
			if(heroes[i].city==cities){
				sameCity.push(array[i].name);
			}
		}
		//Dependiendo la cantidad de heroes en el array, hablaremos en plurar o singular.
		if(sameCity.length == 0){
			console.log("Any heroe lives here");
		}else if(sameCity.length == 1){
			console.log("There is "+sameCity.length+" heroe living on "+cities+", he is: "+sameCity.join());
		}else if(sameCity.length >=2){
			console.log("There are "+sameCity.length+" heroes living on "+cities+", they are: "+sameCity.join());
		}		
	}

	FindHeroes(heroes, "Gotham");