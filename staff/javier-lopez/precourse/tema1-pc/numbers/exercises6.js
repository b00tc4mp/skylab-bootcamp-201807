//d2) Y la multiplicación

function calculator(number1, number2){
	//Operations
	var totalSum = number1 + number2;
	var totalRest = number1 - number2;
	var totalMult = number1 * number2;

	//Show the result
	console.log("The sum of "+number1+" and "+number2+" = "+totalSum+
		", the rest of is = "+totalRest+", and the multiplication is = "+totalMult);
}

calculator(2,3);