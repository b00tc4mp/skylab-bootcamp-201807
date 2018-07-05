//a2) Pasa también el numero a multiplicar a la función como argumento

//funcion con map
function doubleCouples(array,multiplication){
	console.log("Los numeros del array son los siguientes: "+array.toString());
	
	//Creo un array en el que meto los numeros dobles 
	var doubles = array.map(function(x) {
    	return x * multiplication;
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
doubleCouples(array,12);