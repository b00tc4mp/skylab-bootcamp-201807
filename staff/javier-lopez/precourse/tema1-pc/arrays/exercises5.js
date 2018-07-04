e) Puedes indicarme las iniciales de tu nombre y apellido? Como en el ejercicio h de la sección de strings

function MyFirstLastNameLetters(Name, Lastname){
	var Nombres = [Name, Lastname];
	var MyName=Nombres[0].charAt(0).toUpperCase();
	var MyLastName=Nombres[1].charAt(0).toUpperCase();
	var Alltogether = MyName+"."+MyLastName;
	return Alltogether;
}

console.log(MyFirstLastNameLetters("Javier", "Lopez"));