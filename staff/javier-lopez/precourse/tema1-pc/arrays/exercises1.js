a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"
function SeparationLetters(Name, LastName){
	var elements = [Name, LastName];
	var Valores= elements.join('');
	var Array= Valores.split("");
	console.log(Array.join("/"));
}

console.log(SeparationLetters("Javier","Lopez"));
