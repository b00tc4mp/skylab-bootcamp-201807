//d) Ahora, solo tu apellido.


function showLastName(lastName){
	
	//Forma no automatica
	console.log("My lastname is "+lastName.substr(7,5));

	//Forma automatica (No estoy del todo seguro)
	console.log("My lastname is "+lastName.substr(LastName.indexOf(" ")+1,lastName.length));
}

showLastName("Javier Lopez Blasco");
