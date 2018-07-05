//b4) Ahora, el usuario debería ser capaz de especificar la posición de la serie hasta donde queremos llegar.

function fibonacci(numero){
    var var1 = 0;
    var var2 = 1;
    var var3;
 
    var fiboArray=[var1,var2];
	    for(var i=2; i <= numero;i++){
	        var3 = var1 + var2;
	        var1 = var2;
	        var2 = var3;
	        fiboArray.push(var3);
	    }
	console.log("El numero: "+fiboArray[numero]+" está en la posición "+numero);
}

fibonacci(10);