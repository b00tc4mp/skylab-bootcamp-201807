//b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por pantalla la serie Fibonacci?

//Sin array
function fibonacci(numero){
	//Declaro los dos primeros numeros
    var var1 = 0;
    var var2 = 1;
    var var3;

 	//Muestro los dos primeros numeros
    console.log(var1);
    console.log(var2);

    //Muestro los numeros generados con el bucle.
    for(var i=3; i <= numero;i++){
                var3 = var1 + var2;
                var1 = var2;
                var2 = var3;
                console.log(var3);
            }
        }
fibonacci(5);

//Con array
function fibonacci(numero){
    var var1 = 0;
    var var2 = 1;
    var var3;
 
    console.log(var1);
    console.log(var2);
    var fiboArray=[var1,var2];
	    for(var i=3; i <= numero;i++){
	        var3 = var1 + var2;
	        var1 = var2;
	        var2 = var3;
	        fiboArray.push(var3);
	    }
	console.log(fiboArray)
}

fibonacci(10);

//Forma mas simple
function fibo(number) {

	var arr = [0,1];
	
	for (var i=0; i<number; i++) {
		arr.push(arr[i] + arr[i+1]);
	}

	console.log(arr);
}

fibo(10);