function calculator(num1,num2){
var resultArray = [];
if (num1 === undefined && num2 === undefined){
  console.log('No has introducido ningun parametro');
}else if(isNaN(num1) && num2 === undefined){
  console.log('El dato introducido no es un numero');
}else if(num2 === undefined){
  var raizCuadrada = [];
  raizCuadrada.push((Math.sqrt(num1)));
  console.log(raizCuadrada[0].toFixed(3));
}else if(isNaN(num1) || isNaN(num2)){
  console.log ("Porfavor, introduce 2 numeros");
}else if (num1 === 0 && num2 === 0){
	console.log('El resultado es indeterminado');
}else{
	resultArray.push((num1 + num2));
	resultArray.push((num1 - num2));
	resultArray.push((num1 * num2));
	resultArray.push((num1 / num2));

	console.log('La suma de ' + num1 + ' mas ' + num2 + ' es igual ' + resultArray[0]);
	console.log('La resta de ' + num1 + ' menos ' + num2 + ' es igual ' + resultArray[1]);
	console.log('La multiplicación de ' + num1 + ' por ' + num2 + ' es igual ' + resultArray[2]);
	console.log('La division de ' + num1 + ' entre ' + num2 + ' es igual a ' + resultArray[3]);
}
}
calculator(0,0);