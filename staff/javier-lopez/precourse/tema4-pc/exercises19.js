//e) Crea un programa al que le introduces un número como parámetro del 0 al 100 y devuelve el número transformado a 
//alfabeto normal.


//Declaramos los arrays con las diferentes palabras.
var units = ['','one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function sayItWithWords(number){
	//Mostrar numeros del 1 al 9
	if(number<10 & number>0){
		console.log(units[number]);
	}else if(number>9 & number<20){
	//Mostrar numeros del 10 al 19
		var gettingNumbers = number.toString().split("");
		console.log(teens[gettingNumbers[1]]);
	}else if(number>19 & number<100){
		//Mostrar numeros del 20 al 99
		var gettingNumbers = number.toString().split("");

		//Recorremos el array de tens para coger la palabra correspondiente al primer numero que le hemos pasado
		var firstNumber = tens[gettingNumbers[0]];

		//Recorremos el array para coger la palabra correspondiente al segundo numero.
		var secondNumber = units[gettingNumbers[1]];
		console.log(firstNumber+" "+secondNumber);
		
	}
}

sayItWithWords(5);