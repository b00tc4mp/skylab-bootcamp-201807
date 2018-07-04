k) Quiero volver a introducir mi nombre pero si lo introduzco utilizando push() estará en la última posición, como podria hacer para introducirlo en la primera posición?

var Details = ["Lopez","20"];

function AddName(Name){
	Details.splice(0,0, Name);
	console.log(Details);
}

AddName("Javier");