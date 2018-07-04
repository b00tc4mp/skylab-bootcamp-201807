//ñ1) Intenta crear las parejas de forma aleatoria. (Por acabar)



var Heroes = [{id: 1, Name: "Tony Stark", SuperheroName: "Iron Man", City: "New York", markAv: 10},
			  {id: 2, Name: "Steve Rogers", SuperheroName: "Captain America", City: "New York", markAv: 15},
			  {id: 3, Name: "Bruce Wayne", SuperheroName: "Batman", City: "Gotham", markAv: 13},
			  //{id: 4, Name: "Selina Kyle", SuperheroName: "Catwoman", City: "Gotham", markAv: 10},
			  {id: 5, Name: "Javier Lopez", SuperheroName: "All Might", City: "Terrassa", markAv: 14}];



//Funcion para ver quien tiene mas markAv
	function RandomFight(Array){

			var aleatorio = Math.round(Math.random()*4);
			//Lucha
			var markAv1 = Array[aleatorio].markAv;
			var markAv2 = Array[aleatorio].markAv;
			if(markAv1>markAv2){
				console.log(Array[aleatorio].Name+" vs "+Array[aleatorio].Name+" => "+Array[aleatorio].Name+" wins!");
			}else{
				console.log(Array[aleatorio].Name+" vs "+Array[aleatorio].Name+" => "+Array[i+1].Name+" wins!");
			}
		}
	}

	RandomFight(Heroes);
