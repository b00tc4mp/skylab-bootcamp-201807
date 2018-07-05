var numeros = [1,2,3,4,5];
for(var i = 0;i<numeros.length;i++){
	
	if(i===Math.floor(numeros.length/2)){
		console.log("We are in the middle of loop");
	}
	console.log(numeros[i]);
}