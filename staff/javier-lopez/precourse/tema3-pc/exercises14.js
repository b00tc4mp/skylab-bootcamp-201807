//m) Vamos a complicarlo un poco... El número random debería generarse en otra función separada del padre. 
//Retorna a la funcion padre y concaténalo en el return padre.




//Random number Function
function MyRandomAge(){
		return Math.floor(Math.random() * 50);
	}

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


	//We put each child function in one variable.
	var RandomAge = MyRandomAge();
	var Name = MyName("Javier");
	var Age = MyRandomAge();

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