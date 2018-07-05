//f) Ahora, todas las variables deberían ser pasadas como parámetro a las funciones.

function MyName(Name){
	return Name;
}

function MyAge(Age){
	return Age;
}
var MyNam="Javier"
var MyAges=20+Math.floor(Math.random() * 10);

console.log(MyName(MyNam)+" "+MyAge(MyAges));