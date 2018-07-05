//l) Modifica la primera función y la función padre para, si el parámetro introducido no es tu nombre, 
//no siga con la segunda llamada

//Father function with his child function
function fatherfunction(){
	function MyName(Name){
		if(Name!="Javier"){
			return null;
		}else{
			return Name+" eres un avenger?";
		}
		
	}

	function MyAge(Age){
		return Age;
	}

	function MyRandomAge(){
		return Math.floor(Math.random() * 50);
	}

	//We put each child function in one variable.
	var RandomAge = MyRandomAge();
	var Name = MyName("Javier");
	var Age = MyAge(RandomAge);

	if(Name!= null){
		if(Age<20){
			return "Primera funcion: Hola! "+Name+", Segunda funcion: tu edad es "+Age;
		}
		if(Age>21){
			return "Primera funcion: Hola! "+Name+", Segunda funcion: eres muy mayor, tu edad es "+Age;
		}
	}else{
		return "You are not Javier";
	}

}

console.log(fatherfunction());