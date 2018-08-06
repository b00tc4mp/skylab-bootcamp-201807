//g) Prepara una función para añadir tu City a la array, muestra un mensaje mostrando el contenido de toda la array, así aseguraremos los cambios.

function mycity(name, lastName, age, city){

		var details = [name, lastName, age];
		details.push(city);
		
		console.log("City added to array! "+details)

}

mycity("Javier","Lopez","20","Terrassa");