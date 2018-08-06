//b2) Puedes añadir además, la posición de cada resultado?

//Con array
function fibonacci(){
    var var1 = 0;
    var var2 = 1;
    var var3;
 
    //console.log(var1);
    //console.log(var2);
    var fiboArray=[var1,var2];
	    for(var i=3; i <= 10;i++){
	        var3 = var1 + var2;
	        var1 = var2;
	        var2 = var3;
	        fiboArray.push(var3);
	    }
	for(var i =0;i<fiboArray.length;i++){
		console.log(i+"º "+fiboArray[i]);
	}
	
}

fibonacci();