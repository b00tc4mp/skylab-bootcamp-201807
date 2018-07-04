//d)Como en el ejercicio anterior, pero seleccionando tu apellido.

function separationLetters(name, lastName){
	var elements = [name, lastName];
	var valores= elements.join(' ');
	var surname= valores.substr(valores.indexOf(" ")+1,valores.length);
	var array = surname.split("");
	for(var i =0; i<array.length;i++){
		console.log(i+1+"º "+array[i]);
	}
	
}

console.log(separationLetters("Javier","Lopez"));