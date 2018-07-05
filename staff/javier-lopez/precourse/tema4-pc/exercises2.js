//a1) La funcion debería aceptar la array a tratar como argumento.


//funcion sin map
function doubleCouples(array){
	console.log("Los numeros del array son los siguientes: "+array.toString());
	
	for(var i = 0;i<array.length;i++){
		var number1 = array[i]*2;
		var number2 = array[i+1]*2;
		if(isNaN(number2)!=true){
			console.log(i+1+"º pareja: "+number1+"-"+number2);
		}
		
	}
}

var array = [1,2,3,4,5,6,7,8,9];
doubleCouples(array);


//funcion con map
function doubleCouples(array){
	console.log("Los numeros del array son los siguientes: "+array.toString());
	
	//Creo un array en el que meto los numeros dobles 
	var doubles = array.map(function(x) {
    	return x * 2;
	});
	
		for(var i = 0;i<doubles.length;i++){
			var number1 = doubles[i];
			var number2 = doubles[i+1];

			if(isNaN(number2)!=true){
				console.log(i+1+"º pareja: "+number1+"-"+number2);
			}
		
		}
}


var array = [1,2,3,4,5,6,7,8,9];
doubleCouples(array);