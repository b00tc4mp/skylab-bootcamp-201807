//f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, y además añade en otra posicion tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.



function myNameAge(name, lastName, age){

		var details = [name, lastName, age];
		console.log("My name is "+details[0]+" and I'm "+age+" old.")

}

myNameAge("Javier","Lopez","20");