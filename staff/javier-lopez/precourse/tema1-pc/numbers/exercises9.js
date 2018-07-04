//e) Podemos controlar este error con un condicional if? Todavia por acabar


function Calculator(Number1, Number2){
	//Operations
	var TotalSum = Number1 + Number2;
	var TotalRest = Number1 - Number2;
	var TotalMult = Number1 * Number2;
	var TotalDiv = Number1/Number2;

	//Detect if it's a number
	if(isNaN(Number1)==true || isNaN(Number2)==true){
		console.log("You can't do this operation!");
	}

	//Show the result if they are numbers
		if(isNaN(Number1)==false && isNaN(Number2)==false){
			console.log("The sum of "+Number1+" and "+Number2+" = "+TotalSum+
		", the rest of is = "+TotalRest+", the multiplication is = "+TotalMult+
		", and the division is = "+TotalDiv);
	}
}

Calculator(1,2);