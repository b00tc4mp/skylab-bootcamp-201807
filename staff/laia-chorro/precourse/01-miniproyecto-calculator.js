/****************************Calculator!*********************************/

/**INSTRUCTIONS: To initiate the calculator the user must inject the code below into the console.
Then set the numbers that wish to calculate as parameters of calculator.calculate() function like this:
	calculator.calculate(2, 3, 4);
**/

var calculator = {
	results: [],

	add: function() {
		var acc = 0;
	    for (num in arguments){
		    acc += arguments[num];
	    }
	    return Math.round(acc * 1000) / 1000;
	},

	subtraction: function() {
		// First number of the arguments minus the other numbers (from the second to the last).
		var acc = arguments[0];
		for (var i=1; i<arguments.length; i++) {
			acc -= arguments[i];
		}
	    return Math.round(acc * 1000) / 1000;
	},

	division: function() {
	    var acc = arguments[0];
		for (var i=1; i<arguments.length; i++) {
			acc /= arguments[i];
		}
	    return Math.round(acc * 1000) / 1000;
	},

	multiplication: function() {
		var acc = 1;
	    for (num in arguments){
		    acc *= arguments[num];
	    }
	    return Math.round(acc * 1000) / 1000;
	},

	squareRoot: function(singleNum) {
		var sqrt = Math.sqrt(singleNum);
	    return Math.round(sqrt * 1000) / 1000;
	},

	concatNumbersBySymbol: function(separator) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  // Join all the elements of the array using the operator symbol as the separator
	  // The separator comes as first item of the array, and from the second element we have the numbers
	  return args.join(separator);
	},

	pushAllOperationsResult: function() {
		// When more than one number is passed to the calculator we will print the result of all four operations.
		// We will add the operator symbol of each equation as first element of the args array. 
		var args = Array.prototype.slice.call(arguments, 0);

		// Set the separator for the sum operation, is a plus symbol: "+"
		args.unshift(' + ');
		// Add all numbers and print the results
		calculator.results.push(' ' + calculator.concatNumbersBySymbol.apply(null, args) + ' = ' + 
			calculator.add.apply(null, arguments));

		// Print the subtract of the numbers and set the separator as a minus symbol: "-"
		args[0] = ' - ';
		calculator.results.push(' ' + calculator.concatNumbersBySymbol.apply(null, args) + ' = ' + 
			calculator.subtraction.apply(null, arguments));

		// Print the multiplication of the numbers and set the separator as: "*"
		args[0] = ' * ';
		calculator.results.push(' ' + calculator.concatNumbersBySymbol.apply(null, args) + ' = ' + 
			calculator.multiplication.apply(null, arguments));

		// Print the division of the numbers and set the separator as: "/"
		args[0] = ' / ';
		calculator.results.push(' ' + calculator.concatNumbersBySymbol.apply(null, args) + ' = ' + 
			calculator.division.apply(null, arguments));
	},

	askToContinueCalculating: function() {
		var newNumbers = prompt("Would you like to calculate more numbers?" +
			" Please introduce all numbers separated by commas. Thank you!");
		if (newNumbers) {
			var strNewNumbersArray = newNumbers.split(','),
				newNumbersArray = strNewNumbersArray.map(Number);
			calculator.calculate.apply(null, newNumbersArray);
		} else {
			console.log('Bye bye!!');
		}
	},

	calculate: function() {
		var args = Array.prototype.slice.call(arguments, 0);

		if (args.some(function(num) { return isNaN(num); })) {
			console.log('In order to use the calculator all the arguments must be numbers');
			return;
		}

		if (args.length === 0) {
			console.log('At least one number must be set in the calculator');
			return;
		}

		if (args.length === 1) {
			calculator.results.push(' Square root of ' + args[0] + ' = ' + calculator.squareRoot(args[0]));
		} else {
			calculator.pushAllOperationsResult.apply(null, arguments);
		}

		console.log('results = ' + calculator.results); // Print results array

		calculator.askToContinueCalculating();
	}

};

calculator.calculate(2, 3, 4);