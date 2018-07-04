//a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"
function separationLetters(name, lastName){
	var elements = [name, lastName];
	var valores= elements.join('');
	var array= valores.split("");
	console.log(array.join("/"));
}

console.log(SeparationLetters("Javier","Lopez"));
