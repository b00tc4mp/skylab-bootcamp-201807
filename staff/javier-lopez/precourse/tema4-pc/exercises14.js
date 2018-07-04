//c5) Añade las dos funciones a la misma función padre, de forma que encripte y desencripte a la vez cuando termine 
//de ejecutarse.

function program(code1,code2){

	//Cambiar el orden de los numeros
    function changePositions(codeToChange){
    	//Separamos los numeros en un array
        codeToChange = codeToChange.toString().split('');

        //Cogemos todos los numeros del array menos el primero numero
        var newCode = codeToChange.slice(1,codeToChange.length);

        //Le pusheamos el primer numero al array que tiene todos los numeros menos el primero, así queda al final
        newCode.push(codeToChange[0]);

        //Volvemos a convertir los numeros en un string
        var stringAgain = newCode.join("");

        //Los devolvemos como int ya que llegaron con int y no como string
        var finalChangePositionCode = parseInt(stringAgain);
        
        return finalChangePositionCode;
    }

    //Metemos el resultado de la funcion en una variable para cada code
    var theResultOf1 = changePositions(code1);
    var theResultOf2 = changePositions(code2);

    //Mostramos los resultados
    console.log('Changing the order of the first number => ' + theResultOf1);
    console.log('Changing the order of the second number => ' + theResultOf2);

    //Multiplicar los valores por un numero
    function multiplication(codeToMultipli){
    	//Separo los numeros
    	var separationNumber = codeToMultipli.toString().split("");

    	//Creo un array en el que meto los numeros multiplicados
		var doubles = separationNumber.map(function(x) {
    	return x * 2;
		});

		//Convierto el array en un string
		var multiString = doubles.join("");

		//Lo convierto el int para tenerlo en el mismo tipo de dato que con el que llegaron.
		var finalCode = parseInt(multiString);

		return finalCode;
    }
    
    //Metemos el resultado de la funcion multiplication en una variable para cada code
    var theMultiplicationResult1 = multiplication(theResultOf1);
    var theMultiplicationResult2 = multiplication(theResultOf2);

    //Mostramos
    console.log("Result of the change order and the multiplication of the first number => "+theMultiplicationResult1);
    console.log("Result of the change order and the multiplication of the second number => "+theMultiplicationResult2);


    //Desencriptamos el codigo
    function decrypter(codeToDecrypt){
    	//Separamos los numeros en un array
        codeToChange = codeToDecrypt.toString().split('');

    	//Dividimos el codigo que le hemos pasado por el mismo numero con el que lo hemos multiplicado
    	var doubles = codeToChange.map(function(x) {
    	return x / 2;
		});

		//Metemos el ultimo numero del array en una variable nueva, eliminandolo del array anterior (Ya que era el primer numero antes de encriptarlo);
        var recoverCode = doubles.pop();

        //Le pusheamos los otros numeros al array que tiene el ultimo numero del codigo encriptado.
        for (var i = 0; i < doubles.length; i++) {
        	recoverCode = recoverCode+""+doubles[i];
        }

        //Lo convierto el int para tenerlo en el mismo tipo de dato que con el que llegaron.
		var finalRecoverCode = parseInt(recoverCode);
		return finalRecoverCode
    }

    //Metemos el resultado de la funcion desecriptar en una variable para cada code
    var theDescypher1 = decrypter(theMultiplicationResult1);
    var theDescypher2 = decrypter(theMultiplicationResult2);

    //Mostramos
    console.log("First number was => "+theDescypher1);
    console.log("Decond number was => "+theDescypher2);

}

program(2412, 1213);