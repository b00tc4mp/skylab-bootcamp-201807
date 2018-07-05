//d3) Por ultimo, la división


function calculator(number1, number2){
	//Operations
	var totalSum = number1 + number2;
	var totalRest = number1 - number2;
	var totalMult = number1 * number2;
	var totalDiv = number1/number2;

	//Show the result
	console.log("The sum of "+number1+" and "+number2+" = "+totalSum+
		", the rest of is = "+totalRest+", the multiplication is = "+totalMult+
		", and the division is = "+totalDiv);
}

calculator(2,3);