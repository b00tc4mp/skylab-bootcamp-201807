//b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|".

function separationLetters(name, lastName){
	var elements = [name, lastName];
	var value = elements.join(' ');
	var surname = value.substr( value.indexOf(" ")+1, value.length);
	var array = surname.split("");
	console.log(array.join("|"));
}

console.log(separationLetters("Javier","Lopez"));