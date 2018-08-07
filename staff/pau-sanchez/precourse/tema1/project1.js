Mini-Proyecto del tema 1
Calculator! heavy_division_signheavy_plus_sign
Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario podrá visualizar por consola la suma, resta, multiplicación y división entre ambos números. 
El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran). El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca cualquier cosa que no sean números.

Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.
Hint_ => results = [num1 + num2 = resultSum, num1-num2 = resultRest ....]


//=>Un único programa al que le pasarás dos parámetros
//=>el usuario podrá visualizar por consola la suma, resta, multiplicación y división entre ambos números.
//=>El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran).
//=>El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca cualquier cosa que no sean números.
//=>Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada,
//=>si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
//=>los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario. results = [num1 + num2 = resultSum, num1-num2 = resultRest ....]

//=>Un único programa al que le pasarás dos parámetros
function calculadora(value1,value2){

	var valor1 = value1;
	var valor2 = value2;

	var sum = value1+value2;
	var subs = value1-value2;
	var mult = value1*value2;
	var div = value1/value2;

	//=>El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran).
	var resultSum = valor1 +" + "+ valor2 + " = " + sum.toFixed(3);
	var resultSubs = valor1 +" - "+ valor2 + " = " + subs.toFixed(3);
	var resultMult = valor1 +" * "+ valor2 + " = " + mult.toFixed(3);
	var resultDiv = valor1 +" / "+ valor2 + " = " + div.toFixed(3);

	//=>los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario. results = [num1 + num2 = resultSum, num1-num2 = resultRest ....]
	var results = [resultSum, resultSubs, resultMult, resultDiv];

	//=>Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada,
	if (valor2 == undefined){ 
		console.log(Math.sqrt(value1));
		}
	//=>El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca cualquier cosa que no sean números.
	else if (typeof valor1 != "number" || typeof valor2 != "number"){
		console.log ("La operación no es posible");
		}
	else { console.log(results);
	}; 
};
//calculadora(25,36);
//=>si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.


/*function calculator(n1,n2){
 function checkParams(){}
 function sum(){}
 function subs(){}
 function mult(){}
 function div(){}
 function sqrt(){}*/


calculadora(2,4); 
calculadora(2); 
calculadora(2,'pepe');
calculadora();
calculadora(0,0);
calculadora('pepe');










//=>el usuario podrá visualizar por consola la suma, resta, multiplicación y división entre ambos números.
console.log(results);

};

miniProyecto1(1,2);