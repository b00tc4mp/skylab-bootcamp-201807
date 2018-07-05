//h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.

var details = ["Javier","Lopez","20"];
function mycityAdd(city){

		details.push(city);
		
		console.log("City added to array! "+details)

}

mycityAdd("Terrassa");

function mycityDelete(){

		details.pop();
		
		console.log("City deleted of array! "+details)

}

mycityDelete();