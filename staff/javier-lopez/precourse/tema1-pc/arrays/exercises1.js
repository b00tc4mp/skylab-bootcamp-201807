//a) Declara tu nombre completo en una array y muéstralo por pantalla separando cada letra por "/"
function separationLetters(name, lastName){
	var elements = [name, lastName];
	var values = elements.join('');
	var array = values.split("");
	console.log(array.join("/"));
}

console.log(separationLetters("Javier","Lopez"));
