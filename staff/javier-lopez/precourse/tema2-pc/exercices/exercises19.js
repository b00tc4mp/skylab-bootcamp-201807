//ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id,
// por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.

var heroes = [{id: 1, Name: "Tony Stark", SuperheroName: "Iron Man", City: "New York", markAv: 10},
			  {id: 2, Name: "Steve Rogers", SuperheroName: "Captain America", City: "New York", markAv: 15},
			  {id: 3, Name: "Bruce Wayne", SuperheroName: "Batman", City: "Gotham", markAv: 13},
			  {id: 4, Name: "Javier Lopez", SuperheroName: "All Might", City: "Terrassa", markAv: 14}];



//Funcion para ver quien tiene mas markAv
	function fight(array){
		for (var i = 0; i<array.length-1;i++){
			//Lucha
			var markAv1 = array[i].markAv;
			var markAv2 = array[i+1].markAv;
			if(markAv1>markAv2){
				console.log(array[i].Name+" vs "+array[i+1].Name+" => "+array[i].Name+" wins!");
			}else{
				console.log(array[i].Name+" vs "+array[i+1].Name+" => "+array[i+1].Name+" wins!");
			}
		}
	}

	fight(heroes);





	//Opcion 2
	var heroes = [{id: 1, Name: "Tony Stark", SuperheroName: "Iron Man", City: "New York", markAv: 10},
			  {id: 2, Name: "Steve Rogers", SuperheroName: "Captain America", City: "New York", markAv: 15},
			  {id: 3, Name: "Bruce Wayne", SuperheroName: "Batman", City: "Gotham", markAv: 13},
			  {id: 4, Name: "Javier Lopez", SuperheroName: "All Might", City: "Terrassa", markAv: 14}];



//Funcion para ver quien tiene mas markAv
	function fight(array){
		for (var i = 1; i<=array.length-1;i){
			
			var find = heroes.find(function(element) {
				if(element.id = i){
					if(array[i].markAv>array[i+1].markAv){
						console.log(array[i].Name+" vs "+array[i+1].Name+" => "+array[i].Name+" wins!");
					}else{
						console.log(array[i].Name+" vs "+array[i+1].Name+" => "+array[i+1].Name+" wins!");
					}
				}
	  			
				/*if(markAv1>markAv2){
					console.log(Array[i].Name+" vs "+Array[i+1].Name+" => "+Array[i].Name+" wins!");
				}else{
					console.log(Array[i].Name+" vs "+Array[i+1].Name+" => "+Array[i+1].Name+" wins!");
				}*/
			});
			i++;
			i++;

		}
	}

	fight(heroes);