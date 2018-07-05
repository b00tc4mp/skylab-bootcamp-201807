//k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, como podria hacer para introducirlo en la primera posición?

var details = ["Lopez","20"];

function addName(name){
	details.splice(0,0, name);
	console.log(details);
}

addName("Javier");