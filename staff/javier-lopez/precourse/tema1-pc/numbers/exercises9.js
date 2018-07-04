//e) Podemos controlar este error con un condicional if? Todavia por acabar


function calculator(number1, number2){
	//Operations
	var totalSum = number1 + number2;
	var totalRest = number1 - number2;
	var totalMult = number1 * number2;
	var totalDiv = number1/number2;

	//Detect if it's a number
	if(isNaN(number1)==true || isNaN(number2)==true){
		console.log("You can't do this operation!");
	}

	//Show the result if they are numbers
		if(isNaN(number1)==false && isNaN(number2)==false){
			console.log("The sum of "+number1+" and "+number2+" = "+totalSum+
		", the rest of is = "+totalRest+", the multiplication is = "+totalMult+
		", and the division is = "+totalDiv);
	}
}

calculator(1,2);