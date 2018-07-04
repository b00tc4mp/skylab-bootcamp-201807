f) Ahora, reformula la array, introduciendo tu nombre en primera posición, tu apellido en segunda, y además añade en otra posicion tu edad. Muestra por pantalla solo tu nombre y tu edad en un solo mensaje.



function MyNameAge(Name, LastName, age){

		var Details = [Name, LastName, age];
		console.log("My name is "+Details[0]+" and I'm "+age+" old.")

}

MyNameAge("Javier","Lopez","20");