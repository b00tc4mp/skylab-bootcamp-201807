function checkParams(value1,value2){
	if  (typeof value1 == "number" && typeof value2 == "number"){
		return true;
	}
	else if	(typeof value1 == "number" && value2 == undefined ){ 
		return false;
		}
	else {
		console.log ("La operación no es posible, porque uno o ambos de los argumentos no son números");
	}
	
}



function sum (value1,value2){
	let valuesuma=value1+value2;
	return valuesuma;
}

function subs (value1,value2){
	let valuesubs=value1-value2;
	return valuesubs;
}

function mult (value1,value2){
	let valuemult=value1*value2;
	return valuemult;
}

function divi (value1,value2){
	let valuedivi=value1/value2;
	return valuedivi;
}

function calculator(value1,value2){
let check=checkParams(value1,value2)
	if(check == true){
		let valuesum=sum(value1,value2)
		let resultSum = value1 +" + "+ value2 + " = " + valuesum.toFixed(3);
		
		let valuesubs=subs(value1,value2)
		let resultSubs = value1 +" - "+ value2 + " = " + valuesubs.toFixed(3);
		
		let valuemult=mult(value1,value2)
		let resultMult = value1 +" * "+ value2 + " = " + valuemult.toFixed(3);
		
		let valuedivi=divi(value1,value2)
		let resultDiv = value1 +" / "+ value2 + " = " + valuedivi.toFixed(3);
		

		let results = [resultSum, resultSubs, resultMult, resultDiv];
		
		console.log(results);
		
	}
	else if (check == false){
		let sqrt=Math.sqrt(value1)
		console.log(sqrt);
		}
	
};


calculator(2,4);
calculator(2);
calculator(2,'pepe');
calculator();
calculator(0,0);
calculator('pepe');