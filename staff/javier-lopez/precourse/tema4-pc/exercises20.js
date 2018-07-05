//e2) Ahora, el output debería ser capaz de, aparte de devolver el número traducido, devolver también los números por 
//los que está formado:

//Declaramos los arrays con las diferentes palabras.
var units = ['','one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function sayItWithWords(number){
	//Mostrar numeros del 1 al 9
	if(number<10 & number>0){
		console.log(units[number]+", "+units[number]+" / "+number);
	}else if(number>9 & number<20){
	//Mostrar numeros del 10 al 19
		var gettingNumbers = number.toString().split("");
		if(gettingNumbers[1]!=0){
			console.log(teens[gettingNumbers[1]]+", "+teens[gettingNumbers[1]]+" / "+gettingNumbers[0]+"0 + "+gettingNumbers[1]);
		} else{
			console.log(teens[gettingNumbers[1]]+", "+teens[gettingNumbers[1]]+" / "+number);
		}
		
	}else if(number>19 & number<100){
		//Mostrar numeros del 20 al 99
		var gettingNumbers = number.toString().split("");
		if(units[gettingNumbers[1]]!=0){
			console.log(tens[gettingNumbers[0]]+"-"+units[gettingNumbers[1]]+", "+tens[gettingNumbers[0]]+"+"+units[gettingNumbers[1]]+" / "+gettingNumbers[0]+"0+"+gettingNumbers[1]);			
		} else{
			console.log(tens[gettingNumbers[0]]+", "+tens[gettingNumbers[0]]+" / "+gettingNumbers[0]+"0");
		}
				
	}
}

sayItWithWords(5);