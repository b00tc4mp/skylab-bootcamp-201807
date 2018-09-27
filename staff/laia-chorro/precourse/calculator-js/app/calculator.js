
var isResult = false;

function calculate() {
	var parsedScreenVal = getValueFromScreen().replace('÷', '/').replace('×', '*'),
		result = '';

	try {
		result = eval(parsedScreenVal);
		result = Math.round(result * 1000) / 1000; // Round to 3 decimals max
	} catch(e) {
        console.log('Illegal math operation in eval function, can not calculate');
    }

	return result;
}

function showValInScreen(value) {
	document.getElementById("screen-input").value = value;
}

function showResultInScreen() {
	var result = calculate();

	isResult = true;
	showValInScreen(result);
}

function getValueFromScreen() {
	return document.getElementById("screen-input").value;
}

function concatNumInScreen(value) {
	var previousScreenVal,
  		newScreenVal;

	if (isResult) {
		previousScreenVal = '';
		isResult = false;
	} else {
		previousScreenVal = getValueFromScreen();
	}

	newScreenVal = previousScreenVal + value;

  showValInScreen(newScreenVal);
}
