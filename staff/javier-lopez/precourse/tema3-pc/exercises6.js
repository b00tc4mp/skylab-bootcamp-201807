//e1) Intenta sumarle al resultado de tu segunda funcion, un numero random del 0-10 y conviertelo todo a un solo string.


function MyName(Name){
	return Name;
}

function MyAge(Age){
	return Age;
}
var MyNam=MyName("Javier")
var MyAges=MyAge(20)+Math.floor(Math.random() * 10);

console.log(MyNam+" "+MyAges);