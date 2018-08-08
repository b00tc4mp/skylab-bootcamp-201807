	var numberToCalculate = [];

	var arrayFirstNumbers = [];
	var arraySecondNumbers = [];
	var arrayOperation = [];

function pushOperation(y){
	arrayOperation.push(y);
	if (arrayOperation.length > 1){
		document.getElementById("calc").innerHTML = ":(";
		document.getElementById("temp").innerHTML = "Solo una operación please!";
	}
}

	
function pushResult(){
	var firstN = parseFloat(arrayFirstNumbers.join("")).toFixed(3);
	var secondN = parseFloat(arraySecondNumbers.join("")).toFixed(3);
	var preResult = "";
	
	if (arrayOperation[0] === "+"){
		preResult = firstN + secondN;
	} else if (arrayOperation[0] === "-"){
		preResult = firstN - secondN;
	} else if (arrayOperation[0] === "/"){
		preResult = firstN / secondN;
	} else if (arrayOperation[0] === "*"){
		preResult = firstN * secondN;
	};

	console.log("consolelogfirstN: "+ firstN);
	console.log("consolelogsecondN: "+ secondN);
	console.log("consolelogpreResult: "+ preResult);

	document.getElementById("calc").innerHTML = preResult;
	document.getElementById("temp").innerHTML = " ";

	numberToCalculate = [];
	arrayFirstNumbers = [];
	arraySecondNumbers = [];
	arrayOperation = [];



}



function pushitem(x){
	
	numberToCalculate.push(x)
	var numbersDisplay = numberToCalculate.join("");
	document.getElementById("calc").innerHTML = numbersDisplay;
	
	console.log(arrayFirstNumbers);
	console.log(arraySecondNumbers);
	console.log(arrayOperation);
};



function pushNumber(z){
	if (arrayOperation.length === 0){
		arrayFirstNumbers.push(z)
	}
	else if (arrayOperation.length === 1){
		arraySecondNumbers.push(z)
	};

	if (arraySecondNumbers.length > 0){
		temporaryResult();
	}
}



function reset(){
	var numbersDisplay = "0";
	numberToCalculate = [];
	arrayFirstNumbers = [];
	arraySecondNumbers = [];
	arrayOperation = [];
	document.getElementById("calc").innerHTML = numbersDisplay;
	document.getElementById("temp").innerHTML = "";
}


function temporaryResult(){
	var firstN = parseFloat(arrayFirstNumbers.join("")).toFixed(3);
	var secondN = parseFloat(arraySecondNumbers.join("")).toFixed(3);
	var preResult = "";
	
	if (arrayOperation[0] === "+"){
		preResult = firstN + secondN;
	} else if (arrayOperation[0] === "-"){
		preResult = firstN - secondN;
	} else if (arrayOperation[0] === "/"){
		preResult = firstN / secondN;
	} else if (arrayOperation[0] === "*"){
		preResult = firstN * secondN;
	};

	console.log("consolelogfirstN: "+ firstN);
	console.log("consolelogsecondN: "+ secondN);
	console.log("consolelogpreResult: "+ preResult);

	document.getElementById("temp").innerHTML = preResult;
}
