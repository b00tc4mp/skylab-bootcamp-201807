//Calculator! ➗➕
//Haz una calculadora. Un único programa al que le pasarás dos parámetros y el usuario 
//odrá 
//visualizar por consola la suma, resta, multiplicación y división entre ambos números. 
//El resultado debería ser mostrado con 3 decimales como mucho (En caso de que hubieran). 
//El programa debe contemplar y actuar correctamente en el caso de que el usuario introduzca 
//cualquier cosa que no sean números.
//Si el usuario introduce un solo numero, deberá mostrar SOLO su raíz cuadrada, 
//si vuelve a introducir los dos, volverá a mostrar las 4 operaciones de siempre.
//Los resultados deberían almacenarse dentro de una array y mostrarlos de una forma amigable al usuario.
//Hint_ => results = [num1 + num2 = resultSum, num1-num2 = resultRest ....]


var arrayResults = []
function calculator(x,y){

	

	function sum(x,y){
		var resultSum = x+y

		var toString = resultSum.toString()

		var length = toString.substr(toString.indexOf('.')+1).length

		if( length < 3){
			
			arrayResults.push(x + " + " + y + " = " + resultSum)
		} else {
			arrayResults.push(x + " + " + y + " = " + resultSum.toFixed(3))

		}

		
	}
	sum(x,y)

	function rest(x,y){
		var resultRest = x-y

		var toString = resultRest.toString()

		var length = toString.substr(toString.indexOf('.')+1).length

		if( length < 3){
			arrayResults.push(x + " - " + y + " = " + resultRest)

		} else {
			arrayResults.push(x + " + " + y + " = " + resultRest.toFixed(3))
		}		
	}
	rest(x,y)


	function mult(x,y){
		var resultMult = x*y

		var toString = resultMult.toString()

		var length = toString.substr(toString.indexOf('.')+1).length

		if( length < 3){
			arrayResults.push(x + " * " + y + " = " + resultMult)

		} else {
			arrayResults.push(x + " * " + y + " = " + resultMult.toFixed(3))

		}	
	}
	mult(x,y)


	function div(x,y){
		var resultDiv = x/y

		var toString = resultDiv.toString()

		var length = toString.substr(toString.indexOf('.')+1).length

		if( length < 3){
			arrayResults.push(x + " / " + y + " = " + resultDiv)

		} else {
			arrayResults.push(x + " / " + y + " = " + resultDiv.toFixed(3))

		}	
	}
	div(x,y)
} 

calculator (2,5)
console.log(arrayResults)

//apuntessss
Math.sqrt(x) //para la raiz cuadrada


/////////////



 /// LA BUENA ES ESTA ////
var arrayResults = []
function calculator(x,y){

	if(typeof x == "number" && typeof y == "number") {

		function sum(x,y){
			var resultSum = x+y
			var toString = resultSum.toString()
			var length = toString.substr(toString.indexOf('.')+1).length

				if( length < 3){
					arrayResults.push(x + " + " + y + " = " + resultSum)
				} else {
				arrayResults.push(x + " + " + y + " = " + resultSum.toFixed(3))
				}
		}
		sum(x,y)


		function rest(x,y){
			var resultRest = x-y
			var toString = resultRest.toString()
			var length = toString.substr(toString.indexOf('.')+1).length

				if( length < 3){
				arrayResults.push(x + " - " + y + " = " + resultRest)
				} else {
				arrayResults.push(x + " + " + y + " = " + resultRest.toFixed(3))
				}		
		}
		rest(x,y)


		function mult(x,y){
			var resultMult = x*y
			var toString = resultMult.toString()
			var length = toString.substr(toString.indexOf('.')+1).length

			if( length < 3){
			arrayResults.push(x + " * " + y + " = " + resultMult)
			} else {
			arrayResults.push(x + " * " + y + " = " + resultMult.toFixed(3))
			}	
		}
		mult(x,y)


		function div(x,y){
			if(x == 0 && y == 0){
				arrayResults.push("No se puede partir nada entre nada")
			} else {

			var resultDiv = x/y
			var toString = resultDiv.toString()
			var length = toString.substr(toString.indexOf('.')+1).length
			
			if( length < 3){
			arrayResults.push(x + " / " + y + " = " + resultDiv)
			} else {
			arrayResults.push(x + " / " + y + " = " + resultDiv.toFixed(3))
			}	
			}
		}
		div(x,y)

	} else if (typeof x == "string" || typeof y == "string"){
		arrayResults.push("Solo numbers please, espavila")

	} else if (typeof x == "number" && typeof y == "undefined"){

			function raiz(x){
				var resultRaiz = Math.sqrt(x)
				var toString = resultRaiz.toString()
				var length = toString.substr(toString.indexOf('.')+1).length

				if( length < 3){
				arrayResults.push("La raiz cuadrada de " + x + " es " + resultRaiz)
				} else {
				arrayResults.push("La raiz cuadrada de " + x + " es " + resultRaiz.toFixed(3))
				}	
			}
			raiz(x)			
	} else {
		arrayResults.push("Type something")

	}
}

calculator (6 , 4)
calculator (6)
calculator ('pepe')
calculator ('jaja' , 'jeje')
calculator (0, 0)
calculator ()
console.log(arrayResults)


/////////////

var num = 1.2

if(num.toString().indexOf('.') !== -1){
	console.log('tiene decimales :)')
}else{
	console.log('no te :(')
}


console.log( x + " + " y + " = " + resultSum)
	if ( typeof x == "number" && typeof y == "number") {
		sum(x,y)
		subs(x,y)
		multi(x,y)
		divi(x,y)
	} else if {
		console.log("yep")	
	}
	console.log("You can't do it")



function sum(x , y){
	console.log ("El resultado de la suma es " + (x + y))
}
sum(x, y)


function subs(x, y){
	console.log  ("El resultado de la resta es " + (x - y))
}
subs(x, y)


function multi(x, y){
	console.log ("El resultado de la multiplicación es " +(x * y))
}
multi(x, y)


function divi(x, y){
	console.log ("El resultado de la division es " + (x / y))
}
divi(x,y)



}

 calculator (2, 4)
 calculator("kim", 2)
 calculator(2)
 calculator(0,0)




function calculator(x,y){

	if(typeof x == "number" && typeof y == "number") {
		console.log("dos numeros")

	} else if (typeof x == "string" || typeof y == "string"){
		console.log("hay uno q nos es numero")
	

	} else if (typeof x == "number" && typeof y == "undefined"){
		console.log("eso es")

			
	} 
}

calculator (6 , 4)


