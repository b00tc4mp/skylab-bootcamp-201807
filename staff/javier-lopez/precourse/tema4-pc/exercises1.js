//a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9, muestres por pantalla 
//los numeros unidos por parejas (1-2, 2-3, 3-4...), además, cada elemento de la pareja deberá estar multiplicada por 2.

function doubleCouples(){
	var array = [1,2,3,4,5,6,7,8,9];
	console.log("Los numeros del array son los siguientes: "+array.toString());
	for(var i = 0;i<array.length;i++){
		var number1 = array[i]*2;
		var number2 = array[i+1]*2;
		if(isNaN(number2)!=true){
			console.log(i+1+"º pareja: "+number1+"-"+number2);
		}
		
	}
}
doubleCouples();