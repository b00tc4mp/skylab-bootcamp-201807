//ñ) Ahora, crea una funcion que recoja los avengers en parejas (será necesario que tengan un id,
// por comodidad al aparejarlos), es decir, de dos en dos, compare sus markAv y que muestre el mayor de ambos.

var Heroes = [{id: 1, Name: "Tony Stark", SuperheroName: "Iron Man", City: "New York", markAv: 10},
			  {id: 2, Name: "Steve Rogers", SuperheroName: "Captain America", City: "New York", markAv: 15},
			  {id: 3, Name: "Bruce Wayne", SuperheroName: "Batman", City: "Gotham", markAv: 13},
			  {id: 4, Name: "Javier Lopez", SuperheroName: "All Might", City: "Terrassa", markAv: 14}];



//Funcion para ver quien tiene mas markAv
	function Fight(Array){
		for (var i = 0; i<Array.length-1;i++){
			//Lucha
			var markAv1 = Array[i].markAv;
			var markAv2 = Array[i+1].markAv;
			if(markAv1>markAv2){
				console.log(Array[i].Name+" vs "+Array[i+1].Name+" => "+Array[i].Name+" wins!");
			}else{
				console.log(Array[i].Name+" vs "+Array[i+1].Name+" => "+Array[i+1].Name+" wins!");
			}
		}
	}

	Fight(Heroes);





	//Opcion 2
	var Heroes = [{id: 1, Name: "Tony Stark", SuperheroName: "Iron Man", City: "New York", markAv: 10},
			  {id: 2, Name: "Steve Rogers", SuperheroName: "Captain America", City: "New York", markAv: 15},
			  {id: 3, Name: "Bruce Wayne", SuperheroName: "Batman", City: "Gotham", markAv: 13},
			  {id: 4, Name: "Javier Lopez", SuperheroName: "All Might", City: "Terrassa", markAv: 14}];



//Funcion para ver quien tiene mas markAv
	function Fight(Array){
		for (var i = 1; i<=Array.length-1;i){
			
			var find = Heroes.find(function(element) {
				if(element.id = i){
					if(Array[i].markAv>Array[i+1].markAv){
						console.log(Array[i].Name+" vs "+Array[i+1].Name+" => "+Array[i].Name+" wins!");
					}else{
						console.log(Array[i].Name+" vs "+Array[i+1].Name+" => "+Array[i+1].Name+" wins!");
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

	Fight(Heroes);