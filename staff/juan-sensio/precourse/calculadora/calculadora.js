function calculator() {
	
	// main loop
	var results = []
	var nums = arguments;
	while(true) {
		clear();
		calc(nums, results);
		logResults(results);
		// new calculation ?
		nums = [];
		var next = prompt("New numbers? y/n");
		if(next != "y")
			break;
	}
	console.log("Bye!");

	// auxiliar functions
	function calc(args, results) {
		// if no arguments, ask for them
		if(args.length == 0) {
			var numbers = prompt("Introduce numbers")
			args = numbers.split(" ").map(Number);
		}
		// chech all args are numbers
		var allNumbers = true;
		for (var i = 0; i < args.length; i++) {
			if (isNaN(args[i])) {
				console.log("Some argument(s) are not numbers");
				return;
			}
		}
		// calculator
		var result = {args: [], result: []};
		result.args = args;
		if(args.length == 1) {
			result.result = [Math.sqrt(args[0]).toFixed(3)];
		} else if (args.length > 1) {
			result.result = [sum(args), rest(args), mult(args), div(args)];
		} else {
			console.log("Not enough args")
		}
		// save results
		results.push(result);
	}

	function logResults(results) {
		for (var i = 0; i < results.length; i++) {
			var args = results[i].args;
			var result = results[i].result;
			
			if(args.length == 1) {
				console.log("The square root of "+args[0]+" is "+ result);
			} else {
				var text = "Results for [" + args[0];
				for(var j = 1; j < args.length; j++)
					text += ", " + args[j];
				text += "]";
				console.log(text);
				console.log("sum  = ", result[0]);
				console.log("rest = ", result[1]);
				console.log("mult = ", result[2]);
				console.log("div  = ", result[3]);
			}
			
		}
	}

	function sum(args) {
		var res = args[0]
		for (var i = 1; i < args.length; i++) {
			res += args[i];
		}
		return res.toFixed(3);
	}

	function rest(args) {
		var res = args[0]
		for (var i = 1; i < args.length; i++) {
			res -= args[i];
		}
		return res.toFixed(3);
	}

	function mult(args) {
		var res = args[0]
		for (var i = 1; i < args.length; i++) {
			res *= args[i];
		}
		return res.toFixed(3);
	}

	function div(args) {
		var res = args[0]
		for (var i = 1; i < args.length; i++) {
			res /= args[i];
		}
		return res.toFixed(3);
	}
}

