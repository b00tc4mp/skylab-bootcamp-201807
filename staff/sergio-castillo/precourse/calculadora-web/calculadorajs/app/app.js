
var onOff="off";
var number="";
var numbers=[];
var operations="";
var result=0;

function start(){
	if (onOff==="off"){
		onOff="on";
		reset();
	}else if (onOff="on"){
		onOff="off";
		reset();
	}
}
function reset(){
	result=0;
	operations="";
	number="";
	for (var i=0; i<numbers.length;i++){
		numbers.pop();
	}
	if (onOff==="on"){
		document.getElementById('screen').innerHTML="0";
	}else{
		document.getElementById('screen').innerHTML="";
	}
}
function saveNumber(num){
	if (onOff==="on"){
		if (number.length<10){
			number = number + (num);
		document.getElementById('screen').innerHTML=number;
		}
	}
}
function eliminateNumber(){
	if (onOff==="on"){
		if (number.length>0){
		number=number.substr(0,number.length-1);
		document.getElementById('screen').innerHTML=number;	
		}
	}
}
function operation(op){
	if (onOff==="on"){
		if (numbers.length===0){
			document.getElementById('screen').innerHTML=op;
			numbers.push(number);
			number="";
			operations=op;
		}else if (numbers.length===1){
			if (operations===""){
				document.getElementById('screen').innerHTML=op;
				operations=op;
			}else{
				numbers.push(number);
				number="";
				calculate();
				if(op==="="){
					operations="";
					numbers.pop();
					numbers[0]=result;
				}else if(op!=="="){
					operations=op;
					numbers.pop();
					numbers[0]=result;
				}
			}
		}
	}	
}

function calculate(){
		if(operations==='+'){
			result=parseFloat(numbers[0])+parseFloat(numbers[1]);
		}
		if(operations==='-'){
			result=parseFloat(numbers[0])-parseFloat(numbers[1]);
		}
		if(operations==='x'){
			result=parseFloat(numbers[0])*parseFloat(numbers[1]);
		}
		if(operations==='/'){
			if(numbers[1]==="0"){
				result=0;
			}else{
				result=parseFloat(numbers[0])/parseFloat(numbers[1]);	
			}	
		}

	if (result.toString().length<=10){
		document.getElementById('screen').innerHTML=result;
	}else{
		var numberCut= result.toString().substr(0,9);
		document.getElementById('screen').innerHTML=numberCut+"###";
	}

	/* document.getElementById('screen').innerHTML=result;*/
}
