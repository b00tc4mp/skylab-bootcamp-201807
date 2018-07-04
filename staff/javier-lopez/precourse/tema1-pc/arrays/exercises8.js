h) Crea ahora, una funcion para eliminar la variable City y asegura los cambios.

var Details = ["Javier","Lopez","20"];
function MycityAdd(city){

		Details.push(city);
		
		console.log("City added to array! "+Details)

}

MycityAdd("Terrassa");

function MycityDelete(){

		Details.pop();
		
		console.log("City deleted of array! "+Details)

}

MycityDelete();