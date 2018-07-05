function calculadora (num1, num2) {

	
	//
	if ((typeof num1 === 'undefined') && (typeof num2 === 'undefined')) {
		console.log('At least you have to enter a number');
	} else if ((typeof num1 === 'string') || (typeof num2 === 'string')) {
		console.log('You can\'t write letters or simbols on this exercise');	
	} else if ((typeof num1 === 'number') && (typeof num2 === 'undefined')) {
		console.log('The square root of ' + num1 + ' is ' + Math.sqrt(num1).toFixed(3));	
	} else if ((parseInt(num1) === 0) && (parseInt(num2) === 0))  {
		console.log('Some parameters are NaN');
	} else if ((typeof num1 === 'number') && (typeof num2 === 'number')) {
		var results = [];

		//SUM
		function sum(num1, num2) {
			var resultSum = num1 + ' + ' + num2 + ' = ' + (num1+num2);
			console.log(resultSum);
			results.push(resultSum);
		}

		sum(num1, num2);

		//RES
		function res(num1, num2) {
			var resultRes = num1 + ' - ' + num2 + ' = ' + (num1-num2);
			console.log(resultRes);
			results.push(resultRes);
		}

		res(num1, num2);

		//MUL
		function mul(num1, num2) {
			var resultMul = num1 + ' x ' + num2 + ' = ' + (num1*num2);
			console.log(resultMul);
			results.push(resultMul);
		}

		mul(num1, num2);

		//DIV
		function div(num1, num2) {
			var resultDiv = num1 + ' / ' + num2 + ' = ' + (num1/num2).toFixed(3);
			console.log(resultDiv);
			results.push(resultDiv);
		}

		div(num1, num2);

		console.log('results = [' + results.join(', ') + ']');
	} else {
		console.log('I can\t do anything with those numbers');
	}
}

calculadora(2,4);
calculadora(2);
calculadora(2,'jaume');
calculadora();
calculadora(0,0);
calculadora('jaume');
