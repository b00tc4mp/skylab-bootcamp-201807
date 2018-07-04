//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for).

function separationLetters(name, lastName){
	var elements = [name, lastName];
	var valores= elements.join(' ');
	var surname= valores.substr(0, valores.indexOf(" "));
	var array = surname.split("");
	for(var i =0; i<array.length;i++){
		console.log(i+1+"º "+array[i]);
	}
	
}

console.log(separationLetters("Javier","Lopez"));


//Todo en la misma linea
function separationLetters(name, lastName){
	var elements = [name, lastName];
	var valores= elements.join(' ');
	var surname= valores.substr(0, valores.indexOf(" "));
	var array = surname.split("");

	var positions = []
	for(var i =0; i<array.length;i++){
		positions.push(i+1+"º "+array[i]);
	}
	return positions.join(' / ')
}