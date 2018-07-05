var arr = [];
var num1 = 0;		
var num2 = 0;
		

function resetScreen(num) {
	num1 = num;
	num2 = num;
	arr = [];
	document.getElementById('numberCalc').innerHTML = num;
}

function raiz() {
	var arrNew = arr.join("");
	var calcRaiz = Math.sqrt(arrNew);
	document.getElementById('numberCalc').innerHTML = calcRaiz.toFixed(3);
}

function start() {
	document.getElementById('numberCalc').innerHTML = 0;
}

function printValue(num) {
	arr.push(num);
	document.getElementById('numberCalc').innerHTML = arr.join("");
}

function calculate() {
	var suma = arr.indexOf("+");
	var resta = arr.indexOf("-");
	var multiplicacion = arr.indexOf("x");
	var division = arr.indexOf("/");
	

	if (suma != -1) {
		var newArr = arr.join('');
		num1 = newArr.substr(0, newArr.indexOf('+'))||0
		num2 = newArr.substr(newArr.indexOf('+') + 1)||0
		var result = parseFloat(num1) + parseFloat(num2);
		document.getElementById('numberCalc').innerHTML = result;
	} else if (resta != -1) {
		var newArr = arr.join('');
		num1 = newArr.substr(0, newArr.indexOf('-'))||0
		num2 = newArr.substr(newArr.indexOf('-') + 1)||0
		var result = parseFloat(num1) - parseFloat(num2);
		document.getElementById('numberCalc').innerHTML = result;
	} else if (multiplicacion != -1) {
		var newArr = arr.join('');
		num1 = newArr.substr(0, newArr.indexOf('x'))||0
		num2 = newArr.substr(newArr.indexOf('x') + 1)||0
		var result = parseFloat(num1) * parseFloat(num2);
		document.getElementById('numberCalc').innerHTML = result;
	} else if (division != -1) {
		var newArr = arr.join('');
		num1 = newArr.substr(0, newArr.indexOf('/'))||0
		num2 = newArr.substr(newArr.indexOf('/') + 1)||0
		var result = parseFloat(num1) / parseFloat(num2);
		document.getElementById('numberCalc').innerHTML = result;
	}
}

	

