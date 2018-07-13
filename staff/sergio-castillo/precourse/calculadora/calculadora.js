/* Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar por consola la suma, 
resta, multiplicación y división entre ambos números. El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran). 
El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca cualquier cosa que no sean números.
Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.
Hint_ => results = [num1 + num2 = resultSum, num1-num2 = resultRest ....]*/

// Función para pedir los valores al usuario y guardarlos en una variable global
function valors(){
var count = prompt ("¿Cuantos valores quieres operar? (Indica un valor entre 0 y 10)");
return count
}
var numFactors=valors ();
if (isNaN(numFactors)===true){
	console.log("Ha indicado un valor erroneo");
}else if (numFactors.length===0||numFactors==='0'){
	console.log ("No ha indicado ningún valor");
}else if (numFactors>10){
	console.log ("Ha superado el límite de factores a introducir");
}else{
	var numbers = [];
	function saveNumbers(){
		var count=1;
		for (var i=1; i<=numFactors;i++){
			do{
					numbers[i-1] = prompt ("Introduce el valor numérico "+i+"º para operar");
			}while (isNaN(numbers[i-1])===true||numbers[i-1].length===0||numbers[i-1]==="undefined");
		}  
	}
	saveNumbers();

	var results=[];
	if (numbers.length===1){
		console.log ("El resultado de la raiz cuadrada es: "+Math.sqrt(numbers[0]));
	}else if (numbers.length>1){
		for(var a=0;a<numbers.length;a++){
			if (a===0){
				var resultSum=numbers[a];
				var resultRest=numbers[a];
				var resultMult=numbers[a];
				var resultDiv=numbers[a];
			}else{
			var resultSum = parseInt(resultSum) + parseInt(numbers[a]);
			var resultRest = resultRest - numbers[a];
			var resultMult = resultMult * numbers[a];
			var resultDiv = resultDiv / numbers[a];
			}
		}
		results.push (resultSum);
		results.push (resultRest);
		results.push (resultMult);
		results.push (resultDiv);
		console.log("El resultado de la suma total de todos los factores es: "+results[0]);
		console.log("El resultado de la resta total de todos los factores es: "+results[1]);
		console.log("El resultado de la multiplicación total de todos los factores es: "+results[2]);
	if(results[3].toString().indexOf(".")===-1){
		console.log("El resultado de la división total de todos los factores es: "+results[3]);
	}else{
		console.log("El resultado de la división total de todos los factores es: "+results[3].toFixed(3));
	}
	}
	
}

