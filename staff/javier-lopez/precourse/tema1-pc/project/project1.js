//Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario
// podrá visualizar por consola la suma, resta, multiplicación y división entre ambos números.
// El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran).
// El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca
// cualquier cosa que no sean números.


function Calculator(Number1, Number2){
	//We declarate the array
	var Results =[];

	if(isNaN(Number2)==false && isNaN(Number1)==false){

		//Rest
		var TotalRest = Number1-Number2;

		//Detecting if it has decimals
		Results.push("The result of the Rest of "+Number1+" and "+Number2+" is equal to "+Math.round(TotalRest * 1000) / 1000);
			

		//Sum
		var TotalSum = Number1+Number2;

		//Detecting if it has decimals
		Results.push("The result of the Sum of "+Number1+" and "+Number2+" is equal to "+Math.round(TotalSum * 1000) / 1000);

		//Multiplication
		var TotalMulti = Number1*Number2;

		//Detecting if it has decimals
		Results.push("The result of the Multiplication of "+Number1+" and "+Number2+" is equal to "+Math.round(TotalMulti * 1000) / 1000);

		//Division
		var TotalDivi = Number1/Number2;
		
		//Detecting if it has decimals
		Results.push("The result of the Division of "+Number1+" and "+Number2+" is equal to "+Math.round(TotalDivi * 1000) / 1000);
	}
	
	//Verification of the numers
	if(isNaN(Number2)==true){

		if(isNaN(Number1)==false){

			var SquareRoot = Math.sqrt(Number1);
			Results.push("The result of the Square Root of "+Number1+" is equal to "+Math.round(SquareRoot * 1000) / 1000);
		}else{
			console.log("You didn't write any number");
		}
	}



	//Showing the results
	for(var i=0;i<Results.length;i++){
		console.log(Results[i]);
	}
	
	Results = [];
}

Calculator(2.5,2);


//Otra manera de limitar los decimales
function decimsControl(num){
            if(num % 1 != 0){

                return num = num.toFixed(3);
            }else{

                return num;
            }
}