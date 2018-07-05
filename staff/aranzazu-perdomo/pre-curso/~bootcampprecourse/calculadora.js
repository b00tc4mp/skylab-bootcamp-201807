function calculadora(num1,num2){
   var resultados=[];
  
        if(num2 === undefined){
	
		if(isNaN(num1)){
			return console.log("Error: dato no valido!");
		}

		
		resultados.push(Math.sqrt(num1));
		if(!Number.isInteger(resultados[0])){
			
			resultados[0] = resultados[0].toFixed(3);
		}
		return "La raíz cuadrada es: " + resultados[0];
	}

	
	if( isNaN(num1) || isNaN(num2) ){
		return console.log("Error: dato no valido!");
}
  
  
  
  resultados.push(num1+num2);
  resultados.push(num1-num2);
  resultados.push(num1*num2);
  resultados.push(num1/num2);
  
   for(var i = 0; i <= resultados.length -1; i++){
	   	if(!Number.isInteger(resultados[i])){
			
			resultados[i] = resultados[i].toFixed(3);
	     	}
    }
  
  console.log("La suma de "+num1+" y "+num2+" = "+resultados[0]);
  console.log("La resta de "+num1+" y "+num2+" = "+resultados[1]);
  console.log("La multiplicación de "+num1+" y "+num2+" = "+resultados[2]);
  console.log("La división de "+num1+" y "+num2+" = "+resultados[3]);
  
  
  
  
}

calculadora(25,21);
calculadora(3);
calculadora(15,8);
calculadora("Aranzazu");
calculadora("Aranzazu",4);
