b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|".

function SeparationLetters(Name, LastName){
	var elements = [Name, LastName];
	var Valores= elements.join(' ');
	var Surname= Valores.substr(Valores.indexOf(" ")+1,Valores.length);
	var Array = Surname.split("");
	console.log(Array.join("|"));
}

console.log(SeparationLetters("Javier","Lopez"));