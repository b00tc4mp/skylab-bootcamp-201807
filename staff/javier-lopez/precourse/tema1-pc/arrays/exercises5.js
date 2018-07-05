//e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings

function myFirstLastNameLetters(name, lastname){
	var names = [name, lastname];
	var myName = names[0].charAt(0).toUpperCase();
	var myLastName = names[1].charAt(0).toUpperCase();
	var alltogether = myName+"."+myLastName;
	return alltogether;
}

console.log(MyFirstLastNameLetters("Javier", "Lopez"));