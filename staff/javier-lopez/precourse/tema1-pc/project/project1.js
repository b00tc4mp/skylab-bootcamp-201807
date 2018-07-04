//Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario
// podrá visualizar por consola la suma, resta, multiplicación y división entre ambos números.
// El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran).
// El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca
// cualquier cosa que no sean números.


function calculator(number1, number2){
	//We declarate the array
	var results =[];

	if(isNaN(number2)==false && isNaN(number1)==false){

		//Rest
		var totalRest = number1-number2;

		//Detecting if it has decimals
		results.push("The result of the Rest of "+number1+" and "+number2+" is equal to "+Math.round(totalRest * 1000) / 1000);
			

		//Sum
		var totalSum = number1+number2;

		//Detecting if it has decimals
		results.push("The result of the Sum of "+number1+" and "+number2+" is equal to "+Math.round(totalSum * 1000) / 1000);

		//Multiplication
		var totalMulti = number1*number2;

		//Detecting if it has decimals
		results.push("The result of the Multiplication of "+number1+" and "+number2+" is equal to "+Math.round(totalMulti * 1000) / 1000);

		//Division
		var totalDivi = number1/number2;
		
		//Detecting if it has decimals
		results.push("The result of the Division of "+number1+" and "+number2+" is equal to "+Math.round(totalDivi * 1000) / 1000);
	}
	
	//Verification of the numers
	if(isNaN(number2)==true){

		if(isNaN(number1)==false){

			var squareRoot = Math.sqrt(number1);
			Results.push("The result of the Square Root of "+number1+" is equal to "+Math.round(squareRoot * 1000) / 1000);
		}else{
			console.log("You didn't write any number");
		}
	}



	//Showing the results
	for(var i=0;i<results.length;i++){
		console.log(results[i]);
	}
	
	results = [];
}

calculator(2.5,2);


//Otra manera de limitar los decimales
function decimsControl(num){
            if(num % 1 != 0){

                return num = num.toFixed(3);
            }else{

                return num;
            }
}