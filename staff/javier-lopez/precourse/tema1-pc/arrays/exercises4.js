d)Como en el ejercicio anterior, pero seleccionando tu apellido.

function SeparationLetters(Name, LastName){
	var elements = [Name, LastName];
	var Valores= elements.join(' ');
	var Surname= Valores.substr(Valores.indexOf(" ")+1,Valores.length);
	var Array = Surname.split("");
	for(var i =0; i<Array.length;i++){
		console.log(i+1+"º "+Array[i]);
	}
	
}

console.log(SeparationLetters("Javier","Lopez"));