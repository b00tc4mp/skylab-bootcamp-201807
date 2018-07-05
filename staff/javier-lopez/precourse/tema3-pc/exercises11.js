//j) Al return de la función name(), concaténale otro mensaje

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
		return "Hola! "+Name+" tu edad es "+Age;
	}
	if(Age>21){
		return "Hola! "+Name+" eres muy mayor, tu edad es "+Age;
	}
}

console.log(fatherfunction());