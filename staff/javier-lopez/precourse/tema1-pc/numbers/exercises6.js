//d2) Y la multiplicación

function Calculator(Number1, Number2){
	//Operations
	var TotalSum = Number1 + Number2;
	var TotalRest = Number1 - Number2;
	var TotalMult = Number1 * Number2;

	//Show the result
	console.log("The sum of "+Number1+" and "+Number2+" = "+TotalSum+
		", the rest of is = "+TotalRest+", and the multiplication is = "+TotalMult);
}

Calculator(2,3);