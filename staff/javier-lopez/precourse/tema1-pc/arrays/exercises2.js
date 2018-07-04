//b) Ahora solo selecciona tu apellido y muestra cada letra separada por "|".

function separationLetters(name, lastName){
	var elements = [name, lastName];
	var valores= elements.join(' ');
	var surname= valores.substr(valores.indexOf(" ")+1,valores.length);
	var array = surname.split("");
	console.log(array.join("|"));
}

console.log(separationLetters("Javier","Lopez"));