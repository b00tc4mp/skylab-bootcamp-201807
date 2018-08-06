//k) Ahora, modifica el return de la función padre para que devuelva sus datos en un mensaje amigable;

function fatherfunction(){
	function MyName(Name){
		return Name+" eres un avenger?";
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
		return "Primera funcion: Hola! "+Name+", Segunda funcion: tu edad es "+Age;
	}
	if(Age>21){
		return "Primera funcion: Hola! "+Name+", Segunda funcion: eres muy mayor, tu edad es "+Age;
	}
}

console.log(fatherfunction());