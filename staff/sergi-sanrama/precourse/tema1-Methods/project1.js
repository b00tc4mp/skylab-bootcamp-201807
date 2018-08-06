//Calculadora consola

function sum (num1,num2){
	var suma = (num1+num2);
	if(num1 === 0 && num2 === 0){
		console.log('¿De verdad me necesitas para sumar 0 + 0?')
	}else{
	console.log('	La suma de ' + num1 + ' y ' + num2 + ' es ' + suma)
	}
};
function rest (num1,num2){
	var resta = (num1-num2);
	if(num1 === 0 && num2 === 0){
		console.log('¿De verdad me necesitas para restar 0 - 0?')
	}else{
	console.log('La resta de ' + num1 + ' y ' + num2 + ' es ' + resta)
	}
};
function mult (num1, num2){
	var multiplicacion = (num1*num2);
	if(num1 === 0 && num2 === 0){
		console.log('¿De verdad me necesitas para multiplicar 0 x 0?')
	}else{
	console.log('La multiplicacion de ' + num1 + ' y ' + num2 + ' es ' + multiplicacion)
	}
};
function div (num1, num2){
	if(num1 === 0 && num2 === 0){
		console.log('Si me haces dividir 0 / 0 debo decirte que... ¡el resultado es indefinido!')
	}else{
	var division = (num1/num2);
	console.log('La division de ' + num1 + ' y ' + num2 + ' es ' + division)
	}
};

function calculadora(num1,num2){
	if(num1 === undefined && num2 === undefined){
		console.log('Porfavor introduce dos numeros')
	}else if (num2 === undefined) {
		console.log('La raiz cuadrada de ' + num1 + ' es ' + Math.sqrt(num1))
	}else if(isNaN(num1) || isNaN(num2)){
		console.log('¿Quieres operar con letras? ¡No doy para tanto! ¡Por favor introduce numeros!')
	}else{
		sum(num1,num2);
		rest(num1,num2);
		mult(num1,num2);
		div(num1,num2);
	}
};

calculadora(9,'skylab');
calculadora(9,2);
calculadora(9);
calculadora(0,0);

