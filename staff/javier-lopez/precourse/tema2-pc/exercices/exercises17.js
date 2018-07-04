//m) Crea varios objetos con las mismas propiedades, como por ejemplo la ciudad, crea una función
// para que solo liste los nombres de los Avengers que sean de la misma ciudad y cuantos hay.

//Creamos el array de objetos
var Heroes = [{Name: "Tony Stark", SuperheroName: "Iron Man", City: "New York"},
			  {Name: "Steve Rogers", SuperheroName: "Captain America", City: "New York"},
			  {Name: "Bruce Wayne", SuperheroName: "Batman", City: "Gotham"},
			  {Name: "Selina Kyle", SuperheroName: "Catwoman", City: "Gotham"}];

	
	//Funcion para identificar los heroes de cada ciudad
	function FindHeroes(Array, Cities){
		//Recorremos el array de objetos
		var SameCity = [];
		for (i in Heroes){
			if(Heroes[i].City==Cities){
				SameCity.push(Array[i].Name);
			}
		}
		//Dependiendo la cantidad de heroes en el array, hablaremos en plurar o singular.
		if(SameCity.length == 0){
			console.log("Any heroe lives here");
		}else if(SameCity.length == 1){
			console.log("There is "+SameCity.length+" heroe living on "+Cities+", he is: "+SameCity.join());
		}else if(SameCity.length >=2){
			console.log("There are "+SameCity.length+" heroes living on "+Cities+", they are: "+SameCity.join());
		}		
	}

	FindHeroes(Heroes, "Gotham");