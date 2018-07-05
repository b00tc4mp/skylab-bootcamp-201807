//b5) Ahora, muestra los resultados en forma piramidal:

function fibo(number) {

	var arr = [0,1];
	var result =[];
	
	//Bucle para meter los numeros de fibonacci
	for (var i=0; i<number; i++) {
		arr.push(arr[i] + arr[i+1]);
	}

	//Bucle para mostrar los numeros que vamos añadiendo de fibonacci
	for(var x = 0;x<arr.length;x++){
		result.push(arr[x]);
		console.log(result.toString());
	}

	//Bucle para ir quitando los numeros del array
	for (var i=result.length; i>0; i--) {
		if(arr.length > 0){   
		arr.pop();
		console.log(arr.toString());
		}
	}
}

fibo(10);