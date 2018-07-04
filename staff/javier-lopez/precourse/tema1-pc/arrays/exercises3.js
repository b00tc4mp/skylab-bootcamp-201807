//c) Ahora muestra cada letra de tu nombre con su posición (necesitarás un bucle for).

function SeparationLetters(Name, LastName){
	var elements = [Name, LastName];
	var Valores= elements.join(' ');
	var Surname= Valores.substr(0, Valores.indexOf(" "));
	var Array = Surname.split("");
	for(var i =0; i<Array.length;i++){
		console.log(i+1+"º "+Array[i]);
	}
	
}

console.log(SeparationLetters("Javier","Lopez"));


//Todo en la misma linea
function SeparationLetters(Name, LastName){
	var elements = [Name, LastName];
	var Valores= elements.join(' ');
	var Surname= Valores.substr(0, Valores.indexOf(" "));
	var Array = Surname.split("");

	var positions = []
	for(var i =0; i<Array.length;i++){
		positions.push(i+1+"º "+Array[i]);
	}
	return positions.join(' / ')
}