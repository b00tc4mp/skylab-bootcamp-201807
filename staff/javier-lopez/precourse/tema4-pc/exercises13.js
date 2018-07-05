//c4) Ahora, implementa en otra funcion aparte el decrypter(), que recibirá como argumento un código encriptado
// (y correspondientemente multiplicado en el apartado c3) y nos devuelva el código desencriptado.

//ENCRIPTANDO
//(VER EJERCICIO 12)

//DESENCRIPTANDO

	//Descifrar
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

decrypter(4682);