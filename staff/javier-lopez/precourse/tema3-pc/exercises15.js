//n) Refactorizemos nuestro código dejando todas las funciones separadas del padre,
// éste último se encargará de llamarlas todas y mostrar sus resultados.

//Function Name
function MyName(Name){
		return Name;
	}


//Random number Function
function MyRandomAge(){
		return Math.floor(Math.random() * 50);
}


//Father function
function fatherfunction(){
	
	//We put each function in one variable.
	var Age = MyRandomAge();
	var Name = MyName("Javier");

	if(Name== "Javier"){
		if(Age<20){
			return "Primera funcion: Hola! "+Name+", Segunda funcion: tu edad es "+Age;
		}
		if(Age>21){
			return "Primera funcion: Hola! "+Name+", Segunda funcion: eres muy mayor, tu edad es "+Age;
		}
	}else{
		return null;
	}

}

console.log(fatherfunction());