//b3) Ahora, inserta los resultados en una array y muestralos todos juntos de una manera amigable.
function fibonacci(){
    var var1 = 0;
    var var2 = 1;
    var var3;
 
    var fiboArray=[var1,var2];
	    for(var i=3; i <= 10;i++){
	        var3 = var1 + var2;
	        var1 = var2;
	        var2 = var3;
	        fiboArray.push(var3);
	    }
	console.log("Los numeros de fibonacci son: "+fiboArray);
}

fibonacci();