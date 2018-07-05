var current = '';
var MAX_LENGTH = 7;
var decimal = false;

function appendNum(buttonId) {
	if (current.length < MAX_LENGTH) {
		var newNum = document.getElementById(buttonId).innerText;
		if(newNum == ".") {
			if(decimal)
				newNum = '';
			else
				decimal = true;
		}			
		if(newNum=='0' && current.length == 0)
			current = ''
		else
			current += newNum;
		display(current);	
	}
}

function display(num) {
	if(current.length == 0)
		num = 0;
	num = num.toString();
	if(num.length > MAX_LENGTH)
		num = num.substring(0,MAX_LENGTH);
	document.getElementById('displayedNum').innerText = num;
}


var args = [];
var ops = [];

function appendOp(opId) {
	var displayedNum = parseFloat(document.getElementById('displayedNum').innerText);
	args.push(displayedNum);
	ops.push(opId);	
	decimal = false;
	console.log(args, ops);
	if(args.length > 1) {
		compute();
	} else {
		current = '';
	}

}

function compute() {
	var result = 0;
	var op = ops[0];

	if(op == "suma") {
		result = args[0] + args[1];
	} else if (op == "resta") {
		result = args[0] - args[1];
	} else if(op == "mult") {
		result = args[0] * args[1];
	} else if (op == "divide") {
		result = args[0] / args[1];
	} else {

	}

	var next = ops[ops.length-1];
	if(next == "igual") {
		ops = [];
		args = [];
	} else {
		ops = [next];
		args = [result];
	}

	display(result);
	current = '';
	decimal = false;
	console.log(args, ops);

}