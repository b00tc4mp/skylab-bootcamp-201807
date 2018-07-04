//d4) Ahora, intenta multiplicar un número por una string, que devuelve?


function Calculator(Number1, Number2){
	//Operations
	var TotalSum = Number1 + Number2;
	var TotalRest = Number1 - Number2;
	var TotalMult = Number1 * Number2;
	var TotalDiv = Number1/Number2;

	//Show the result
	console.log("The sum of "+Number1+" and "+Number2+" = "+TotalSum+
		", the rest of is = "+TotalRest+", the multiplication is = "+TotalMult+
		", and the division is = "+TotalDiv);
}

Calculator("hola",3);