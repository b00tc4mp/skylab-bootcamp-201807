//d) Ahora, solo tu apellido.


function ShowLastName(LastName){
	
	//Forma no automatica
	console.log("My lastname is "+LastName.substr(7,5));

	//Forma automatica (No estoy del todo seguro)
	console.log("My lastname is "+LastName.substr(LastName.indexOf(" ")+1,LastName.length));
}

ShowLastName("Javier Lopez Blasco");
