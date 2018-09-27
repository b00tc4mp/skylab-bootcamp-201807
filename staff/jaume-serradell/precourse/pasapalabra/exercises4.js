/*
a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9,
muestres por pantalla los numeros unidos por parejas (1-2, 2-3, 3-4...), además, cada
elemento de la pareja deberá estar multiplicada por 2.
*/

function showNums() {

	var nums = [1,2,3,4,5,6,7,8,9]

	for (var i=0; i<nums.length-1; i++) {
		console.log(i+1 + "ª pareja => " + nums[i]*2 + " - " + nums[i+1]*2);
	}
}

showNums();


/*
a1) La funcion debería aceptar la array a tratar como argumento.
*/

function showNums(nums) {

	var nums = arguments[0];

	var multBy = nums.map(function(x) {
		return x * 2;
	})

	for (var i=0; i<nums.length-1; i++) {
		console.log(i+1 + "ª pareja => " + multBy[i] + " - " + multBy[i+1]);
	}
}

showNums([1,2,3,4,5,6,7,8,9]);

/*
a2) Pasa también el numero a multiplicar a la función como argumento
*/

function showNums(nums, numMult) {

	var nums = arguments[0];

	console.log("El numero escogido es: " + numMult);

	var multBy = nums.map(function(x) {
		return x * numMult;
	})

	for (var i=0; i<nums.length-1; i++) {
		console.log(i+1 + "ª pareja => " + multBy[i] + " - " + multBy[i+1]);
	}
}

showNums([1,2,3,4,5,6,7,8,9], 12);


/*
a3) La función debería ser capaz de recibir el numero de parejas que
queremos devolver del total.
*/

function showNums(nums, numMult, pairs) {

	var nums = arguments[0];

	console.log("El numero escogido es: " + numMult);
	console.log("Se quieren mostrar las " + pairs + " primeras parejas");
	
	var multBy = nums.map(function(x) {
		return x * numMult;
	})

	for (var i=0; i<pairs; i++) {
		console.log(i+1 + "ª pareja => " + multBy[i] + " - " + multBy[i+1]);
	}
}

showNums([1,2,3,4,5,6,7,8,9], 12, 3);


/*
b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por
pantalla la serie Fibonacci?
*/

function fibo(number) {

	var arr = [0,1];
	
	for (var i=0; i<number; i++) {
		arr.push(arr[i] + arr[i+1]);
	}

	console.log(arr);
}

fibo(10);

/*
b2) Puedes añadir además, la posición de cada resultado?
*/

function fibo(number) {

	var arr = [0,1];
	
	for (var i=0; i<number; i++) {
		arr.push(arr[i] + arr[i+1]);
	}

	for (var i=0; i<arr.length; i++) {
		console.log((i+1) + "ª " + arr[i]);
	}
}

fibo(10);

/*
b3) Ahora, inserta los resultados en una array y muestralos
todos juntos de una manera amigable.
*/

function fibo(number) {

	var arr = [0,1];
	
	for (var i=0; i<number; i++) {
		arr.push(arr[i] + arr[i+1]);
	}

	for (var i=0; i<arr.length; i++) {
		console.log((i+1) + "ª " + arr[i]);
	}
}

fibo(10);

/*
b4) Ahora, el usuario debería ser capaz de especificar la
posición de la serie hasta donde queremos llegar.
*/

function fibo(number) {

	var arr = [0,1];
	
	for (var i=0; i<number; i++) {
		arr.push(arr[i] + arr[i+1]);
	}

	console.log(arr);
}

fibo(10);


/*
b5) Ahora, muestra los resultados en forma piramidal:
*/

function fiboPyramid(number) {

	var arr = [0];

	for (var i=0; i<number; i++) {
		if (i === 0) {
			console.log(arr.join(" "))
			arr.push(i+1)
			console.log(arr.join(" "))
		}

		arr.push(arr[i] + arr[i+1]);
		console.log(arr.join(" "));
	}

	for (var i=arr.length; i>0; i--) {
		arr.pop();
		console.log(arr.join(" "));
	}
}

fiboPyramid(6);

/*
c) Simple Scripting program. Crea un programa que transforme un
número de 4 dígitos en otro diferente con las posiciones de los dígitos
cambiadas, creandio un nuevo código
*/

var code = 3712;

function codeScript(code) {

	function encrypted(code) {

		code = code.toString().split("");
		var newCode = code.shift(code[0]);
		code.push(newCode);
		var finalCode = code.join("");

		return finalCode;
		
	}

	var encryptedNum = encrypted(code);
	console.log("El resultado encriptado del número " + code + " es: " + encryptedNum);

} 

codeScript(code);


/*
c2) Ahora, el usuario debería poder introducir como parámetro dos códigos a la vez y devolver
los dos códigos encriptados (Los dos códigos se deberían encriptar en la misma función)
*/

function codeScript(code1, code2) {

	function encrypted(code) {

		code = code.toString().split("");
		var newCode = code.shift(code[0]);
		code.push(newCode);
		var finalCode = code.join("");

		return finalCode;
		
	}

	var encryptedNum = encrypted(code1);
	console.log("El resultado encriptado del número " + code1 + " es: " + encryptedNum);
	var encryptedNum2 = encrypted(code2);
	console.log("El resultado encriptado del número " + code2 + " es: " + encryptedNum2);

} 

codeScript(2313, 1234);


/*
c3) Ahora, vamos a añadir un nivel más de seguridad. Despues de cambiar la
posición de los dígitos, multiplicaremos a cada miembro por un numero cuya
multiplicación no sea superior a 10. (Si es superior a 10, conseguiremos una
multplicación de dos digitos y el código ya no sería de 4 valores)
*/

function codeScript(code1, code2) {

	function encrypted(code) {

		code = code.toString().split("");
		var newCode = code.shift(code[0]);
		code.push(newCode);
		var finalCode = code.join("");
		var finalCodeOnArr= finalCode.split(" ");
		
		var multBy = finalCodeOnArr.map(function(x){
			return x * 2
		})

		return multBy;
	}
	
	var encryptedNum = encrypted(code1);
	console.log("El resultado encriptado del número " + code1 + " es: " + encryptedNum);
	var encryptedNum2 = encrypted(code2);
	console.log("El resultado encriptado del número " + code2 + " es: " + encryptedNum2);

} 

codeScript(3142, 2134);



/*
c4) Ahora, implementa en otra funcion aparte el decrypter(), que recibirá como
argumento un código encriptado (y correspondientemente multiplicado en el
apartado c3) y nos devuelva el código desencriptado.
*/


function codeScript(code1, code2) {

	function encrypted(code) {

		code = code.toString().split("");
		var newCode = code.shift(code[0]);
		code.push(newCode);
		var finalCode = code.join("");
		var finalCodeOnArr= finalCode.split(" ");
		
		var multBy = finalCodeOnArr.map(function(x){
			return x * 2
		})

		return multBy;
	}
	
	var encryptedNum = encrypted(code1);
	console.log("El resultado encriptado del número " + code1 + " es: " + encryptedNum);
	var encryptedNum2 = encrypted(code2);
	console.log("El resultado encriptado del número " + code2 + " es: " + encryptedNum2);


	function decrypted(code) {

		code = code.toString().split("");
		var newCode = code.pop(code[3]);
		code.unshift(newCode);
		var finalCode = code.join("");
		var finalCodeOnArr = finalCode.split(" ");

		var multBy = finalCodeOnArr.map(function(x){
			return x / 2
		})

		return multBy;

	}

	var decryptedNum = decrypted(encryptedNum);
	console.log("El resultado desencriptado del número " + encryptedNum + " es: " + decryptedNum);
	var decryptedNum2 = decrypted(encryptedNum2);
	console.log("El resultado desencriptado del número " + encryptedNum2 + " es: " + decryptedNum2);
} 

codeScript(3142, 2134);


/*
c6) El usuario podrá solo introducir letras, cada número del 0 al 9 corresponderá
a varias letras. Podéis seguir este esquema.
*/

var dictionary = {
    0: ['A', 'K', 'T', 'F', 'O', 'Y'],
    1: ['B', 'L', 'U', 'G', 'P', 'Z'],
    2: ['C', 'M', 'V', 'H', 'Q', '.'],
    3: ['D', 'N', 'W', 'I', 'R', ','],
    4: ['E', 'Ñ', 'X', 'J', 'S', ' ']
}

function script(word) {

	var result = [];

	for (var i=0; i<word.length; i++) {
		for (var key in dictionary) {
			var inArray = dictionary[key].indexOf(word[i])

			if (inArray != -1) {
				result.push(key)
			}
		}
	}

	console.log(result.join(""));
}

script('JAUME');



/*
d) Crea un programa que use la encriptacion Romana, como es? Si tenemos la palabra SKYLAB,
la palabra encriptada será SLKAYB. Si divides la palabra original en 2 grupos obtienes:
*/

function encrypted(word) {

	var part1 = [];
	var part2 = [];
	var resultPart = [];
	
	for (var i=0; i<word.length; i++) {
		if(i < 3) {
			part1.push(word[i]);
		} else {
			part2.push(word[i]);
		}
	}

	for (var i=0; i<part1.length; i++) {
		resultPart.push(part1[i])
		resultPart.push(part2[i])
	}

	console.log(resultPart.join(""));
}

encrypted("SKYLAB");


/*
d2) Programa el desencriptador, pasa como parámetro SLKAYB y que devuelva SKYLAB.
*/

function desencrypted(word) {

	var part1 = [];
	var part2 = [];
	var part3 = [];
	var resultPart = [];

	for (var i=0; i<word.length; i++) {
		if(i <= 1) {
			part1.push(word[i]);
		} else if (i > 1 && i <=3){
			part2.push(word[i]);
		} else {
			part3.push(word[i]);

        }
	}

	console.log("push 1: " + part1)
	console.log("push 2: " + part2)
	console.log("push 3: " + part3)
	
	for (var i=0; i<part1.length; i++) {
		resultPart.push(part1[i])
		resultPart.push(part2[i])
		resultPart.push(part3[i])
	}

	console.log(resultPart.join(""));
	

}

desencrypted("SLKAYB");


/*
d3) Agrupa la función Encrypt y decrypt en una unica función, de forma que
introduzcas como parámetro SKYLAB y devuelva SKYLAB (con todas las transformaciones
internas hechas y mostrando, entre medias, la transformación)
*/

function codeScript(word) {

	function encrypted(word) {

		var part1 = [];
		var part2 = [];
		var resultPart = [];
		
		for (var i=0; i<word.length; i++) {
			if(i < 3) {
				part1.push(word[i]);
			} else {
				part2.push(word[i]);
			}
		}

		for (var i=0; i<part1.length; i++) {
			resultPart.push(part1[i])
			resultPart.push(part2[i])
		}

		return resultPart.join("");

	}

	var encrypt = encrypted(word);
	console.log("El resultado encriptado de " + word + " es => " + encrypt);

	
	function desencrypted(word) {

		var part1 = [];
		var part2 = [];
		var part3 = [];
		var resultPart = [];

		for (var i=0; i<word.length; i++) {
			if(i <= 1) {
				part1.push(word[i]);
			} else if (i > 1 && i <=3){
				part2.push(word[i]);
			} else {
				part3.push(word[i]);

	        }
		}
		
		for (var i=0; i<part1.length; i++) {
			resultPart.push(part1[i])
			resultPart.push(part2[i])
			resultPart.push(part3[i])
		}

		return resultPart.join("");
	}

	var desencrypt = desencrypted(encrypt);
	console.log("El resultado desencriptado de " + encrypt + " es => " + desencrypt);
}

codeScript("SKYLAB")



/*
d4) Lo tienes? Prueba ahora con SKYLABCODERS. Cambia la función para que
pueda aceptar palabras más largas.
*/


//// ARREGLAR

function codeScript(word) {

	function encrypted(word) {

		var part1 = [];
		var part2 = [];
		var resultPart = [];
		
		for (var i=0; i<word.length; i++) {
			if(i < word.length/2) {
				part1.push(word[i]);
			} else {
				part2.push(word[i]);
			}
		}

		for (var i=0; i<part1.length; i++) {
			resultPart.push(part1[i])
			resultPart.push(part2[i])
		}

		return resultPart.join("");

	}

	var encrypt = encrypted(word);
	console.log("El resultado encriptado de " + word + " es => " + encrypt);

	
	function desencrypted(word) {

		var part1 = [];
		var part2 = [];
		var part3 = [];
		var resultPart = [];

		for (var i=0; i<word.length; i++) {
			if(i <= 1) {
				part1.push(word[i]);
			} else if (i > 1 && i <=3){
				part2.push(word[i]);
			} else {
				part3.push(word[i]);

	        }
		}
		
		for (var i=0; i<part1.length; i++) {
			resultPart.push(part1[i])
			resultPart.push(part2[i])
			resultPart.push(part3[i])
		}

		return resultPart.join("");
	}

	var desencrypt = desencrypted(encrypt);
	console.log("El resultado desencriptado de " + encrypt + " es => " + desencrypt);
}

codeScript("SKYLABCODERS")


/*
e) Crea un programa al que le introduces un número como parámetro del 0 al 100
y devuelve el número transformado a alfabeto normal, es decir:
*/

var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];


function sayItWithWords(num) {

	if (num >= 1 && num <= 9) {
		console.log("Number " + num + " is => " + units[num]);
	} else if (num >= 10 && num <= 19) {
		console.log("Number " + num + " is => " + teens[num-10]);
	} else if (num >= 20 && num <= 99){
		var arr = num.toString().split("");
		if (arr[1] === "0") {
			console.log("Number " + num + " is => " + tens[arr[0]]);	
		} else {
			console.log("Number " + num + " is => " + tens[arr[0]] + "-" + units[arr[1]]);	
		}
	} else if (num === 100) {
		console.log("Number " + num + " is => one hundred");
	} else {
		console.log("Number " + num + " is => zero");
	}

}

sayItWithWords(5)
sayItWithWords(23)
sayItWithWords(71)
sayItWithWords(99)
sayItWithWords(100)
sayItWithWords(0)
sayItWithWords(50)


/*
e2) Ahora, el output debería ser capaz de, aparte de devolver el número traducido,
devolver también los números por los que está formado:
*/

var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];


function sayItWithWords(num) {

	if (num >= 1 && num <= 9) {
		console.log(units[num] + " / " + num);
	} else if (num >= 10 && num <= 19) {
		var arr = num.toString().split("");
		console.log(teens[num-10] + ", " + teens[arr[0]-1] + " + " + units[arr[1]] + " / " + (arr[0] + 0) + " + " + arr[1]);
	} else if (num >= 20 && num <= 99){
		var arr = num.toString().split("");
		if (arr[1] === "0") {
			console.log(tens[arr[0]] + " / " + num);	
		} else {
			console.log(tens[arr[0]] + "-" + units[arr[1]] + ", " + tens[arr[0]] + " + " + units[arr[1]] + " / " + (arr[0] + 0) + " + " + arr[1]);	
		}
	} else if (num === 100) {
		console.log("one hundred / " + num);
	} else {
		console.log("zero / " + num);
	}

}

sayItWithWords(5) 
sayItWithWords(19) 
sayItWithWords(23) 
sayItWithWords(71)
sayItWithWords(99)
sayItWithWords(100)
sayItWithWords(0)
sayItWithWords(50)


/*
e3) Cambia tu programa para que acepte cualquier número entre 0 y 1000.
*/

var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var hundreds = ['hundred']
var thousands = ['thousand']


function sayItWithWords(num) {

	var arr = num.toString().split("");

	if (num >= 1 && num <= 9) {
		console.log(units[arr[0]] + " / " + num);
	} else if (num >= 10 && num <= 19) {
		console.log(teens[num-10] + ", " + teens[arr[0]-1] + " + " + units[arr[1]] + " / " + (arr[0] + 0) + " + " + arr[1]);
	} else if (num >= 20 && num <= 99){
		if (arr[1] === "0") {
			console.log(tens[arr[0]] + " / " + num);	
		} else {
			console.log(tens[arr[0]] + "-" + units[arr[1]] + ", " + tens[arr[0]] + " + " + units[arr[1]] + " / " + (arr[0] + 0) + " + " + arr[1]);	
		}
	} else if (num >= 100 && num <= 999 ) {
		if (arr[1] === "0" && arr[2] === "0") {
			console.log(units[arr[0]] + " " + hundreds[0] + " / " + arr[0] + arr[1] + arr[2]);
		} else if (arr[1] === "0") {
			console.log(units[arr[0]] + " " + hundreds[0] + " " + units[arr[2]] + ", " + units[arr[0]] + " " + hundreds[0] + " + " + units[arr[2]] + " / " + arr[0].concat(arr[1], 0) + " + " + arr[2])
		} else if (arr[2] === "0") {
			console.log(units[arr[0]] + " " + hundreds[0] + " " + tens[arr[1]] + ", " + units[arr[0]] + " " + hundreds[0] + " + " + tens[arr[1]] + " / " + arr[0].concat(0, 0) + " + " + arr[1].concat(0))
		} else {
			console.log(units[arr[0]] + " " + hundreds[0] + " " + tens[arr[1]] + " " + units[arr[2]] + ", " + units[arr[0]] + " " + hundreds[0] + " + " + tens[arr[1]] + " + " + units[arr[2]] + " / " + arr[0].concat(0,0) + " + " + arr[1].concat(0) + " + " + arr[2])
		}
	} else {
		console.log("zero / " + num);
	}

}

sayItWithWords(530)
sayItWithWords(531)
sayItWithWords(505)
sayItWithWords(500) //output five hundred , five hundred  / 500
sayItWithWords(233) //output two hundred thirty three, two hundred + thirty + three/ 200 + 30 + 3
sayItWithWords(498) //output four hundred ninety eight, four hundred + ninety + eight/ 400 + 90 + 8



/*
f) Recibiendo el siguiente texto por parámetro a tu función... :
Prepara dicha función para que modifique y devuelva el texto bajo estas reglas:
Signos de puntuación: -	"." => "," - "," => ""
Palabras: - "dolor" => "potato" - "lorem" => "tomato" - "labor" => "cucumber" - "consequatur" => "garlic" - "ipsum" => "onion"
*/


function changeStr(str) {
	
		var str01 = str.split(".").join(",");
		var str02 = str01.split(",").join("");
		var str03 = str02.split("dolor").join("potato")
		var str04 = str03.split("lorem").join("tomato")
		var str05 = str04.split("labor").join("cucumber")
		var str06 = str05.split("consequatur").join("garlic")
		var str07 = str06.split("ipsum").join("onion")

		console.log(str07);

}

changeStr("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.");


/*
f1) Añade una funcionalidad que cuente cuantos cambios/coincidencias ha encontrado de cada palabra,
y te los muestre de una forma amigable para el usuario
*/

//ARREGLAR

function changeStr(str) {
	
		
		function numberChange(change1, change2) {

			var counter = 0;

			for (var i=0; i<str.length; i++) {

				var match = str.indexOf(change1)

				if (match > -1) {
					console.log("hola");
					counter++;
				}

			}

			console.log("El contador va por " + counter);

		}

		numberChange(".", ",")

}

changeStr("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.");








