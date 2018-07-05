//h) Haz otra función hija que solo devuelva un número random, ese número random será el argumento que se
// pasará como parámetro a la función age()

function fatherfunction(){
	function MyName(Name){
		return Name;
	}

	function MyAge(Age){
		return Age;
	}

	function MyRandomAge(){
		return Math.floor(Math.random() * 10)+1;
	}

	var RandomAge = MyRandomAge();
	var Name = MyName("Javier");
	var Age = MyAge(RandomAge);

	return Name+Age;
}

console.log(fatherfunction());