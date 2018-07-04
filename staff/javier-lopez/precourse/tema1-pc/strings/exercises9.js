//h) Ahora, puedes seleccionar la inicial de tu nombre y apellido y mostrarlas por pantalla?


function MyFirstLastNameLetters(Name, Lastname){
	var MyName=Name.charAt(0).toUpperCase();
	var MyLastName=Lastname.charAt(0).toUpperCase();
	var Alltogether = MyName+"."+MyLastName;
	return Alltogether;
}

console.log(MyFirstLastNameLetters("Javier", "Lopez"));