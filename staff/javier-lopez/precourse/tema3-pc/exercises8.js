//g) Intenta englobar todas las funciones en una sola funcion padre, el return de dicha función padre deberá ser la llamada a las funciones hijas

function fatherfunction(){
	function MyName(Name){
		return Name;
	}

	function MyAge(Age){
		return Age;
	}
	var Name = MyName("Javier");
	var Age = MyAge(20);

	return Name+Age;
}

console.log(fatherfunction());