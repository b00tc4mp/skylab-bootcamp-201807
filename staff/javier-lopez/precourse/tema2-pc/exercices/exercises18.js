//n) Para acabar, créate a ti mismo y crea una función que recoja todas las markAv y muestre la media.

var Heroes = [{Name: "Tony Stark", SuperheroName: "Iron Man", City: "New York", markAv: 10},
			  {Name: "Steve Rogers", SuperheroName: "Captain America", City: "New York", markAv: 15},
			  {Name: "Bruce Wayne", SuperheroName: "Batman", City: "Gotham", markAv: 13},
			  {Name: "Selina Kyle", SuperheroName: "Catwoman", City: "Gotham", markAv: 10},
			  {Name: "Javier Lopez", SuperheroName: "All Might", City: "Terrassa", markAv: 14}];


//Funcion para identificar los heroes de cada ciudad
	function markAverage(Array){
		//Declaramos la suma de las markAv
		var Sum = 0;
		//Recorremos el array de objetos y vamos sumando las markAv
		for (i in Heroes){
			Sum = Sum + Heroes[i].markAv;			
		}
		//Hacemos la media
		var Average = Sum / Heroes.length;
		console.log(Average);
	}

	markAverage(Heroes);