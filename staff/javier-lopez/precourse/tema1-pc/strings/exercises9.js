//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?


function myFirstLastNameLetters(name, lastname){
	var myName=name.charAt(0).toUpperCase();
	var myLastName=lastname.charAt(0).toUpperCase();
	var alltogether = myName+"."+myLastName;
	return alltogether;
}

console.log(myFirstLastNameLetters("Javier", "Lopez"));