//ñ) Intenta hacer push de todos los resultados de las funciones a una array declarada en el padre, 
//muestra los resultados de esta array como siempre.

function FatherFunction(){
	var Array = [];

	var Names = Name("Javier");

	if(Names!=null){
		var Ages =RandomAge(Names);
	}

	Array.push(Names, Ages);
	return Array;	
}

function Name(Name){
	if(Name = "Javier"){
		return Name;
	}else{
		return null;
	}
	
}

function RandomAge(Name){
		var Age = Math.floor(Math.random() * 50);
		if(Age<20){
			return "Primera funcion: Hola! "+Name+", Segunda funcion: tu edad es "+Age;
		}
		if(Age>21){
			return "Primera funcion: Hola! "+Name+", Segunda funcion: eres muy mayor, tu edad es "+Age;
		}

}

//Showing the result
console.log(FatherFunction());