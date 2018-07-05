//i) Ahora, limita el random de 0 a 50, Muestra un mensaje si el output age es < 20 y otro si es de 21 - 50


function fatherfunction(){
	function MyName(Name){
		return Name;
	}

	function MyAge(Age){
		return Age;
	}

	function MyRandomAge(){
		return Math.floor(Math.random() * 50);
	}

	var RandomAge = MyRandomAge();
	var Name = MyName("Javier");
	var Age = MyAge(RandomAge);
	if(Age<20){
		return "Hola! "+Name+" tu edad es "+Age;
	}
	if(Age>21){
		return "Hola! "+Name+" eres muy mayor, tu edad es "+Age;
	}
}

console.log(fatherfunction());