//## Final Challenges (JS)!
/*a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9, 
muestres por pantalla los numeros unidos por parejas (1-2, 2-3, 3-4...), además, 
cada elemento de la pareja deberá estar multiplicada por 2.*/
function showNums(){
    var nums = [1,2,3,4,5,6,7,8,9];
    for(var i = 0; i < nums.length-1; i++){
    	console.log(i+1 + "º pareja => " + nums[i]*2 + " - " + nums[i+1]*2);
    }
}
showNums();

//a1) La funcion debería aceptar la array a tratar como argumento.
function showNums(nums){
    for(var i = 0; i < nums.length-1; i++){
    	console.log(i+1 + "º pareja => " + nums[i]*2 + " - " + nums[i+1]*2);
    }
}
showNums([1,2,3,4,5,6,7,8,9]);

//a2) Pasa también el numero a multiplicar a la función como argumento
function showNums(nums,multBy){
    for(var i = 0; i < nums.length-1; i++){
    	console.log(i+1 + "º pareja => " + nums[i]*multBy + " - " + nums[i+1]*multBy);
    }
}
showNums([1,2,3,4,5,6,7,8,9],4);

//a3) La función debería ser capaz de recibir el numero de parejas que queremos devolver del total.
function showNums(nums,multBy,pairs){
	var count = 0;
    for(var i = 0; i < nums.length-1; i++){
    		if(count < pairs){
    			console.log(i+1 + "º pareja => " + nums[i]*multBy + " - " + nums[i+1]*multBy);
    			count++;
    		}
    	}
}
showNums([1,2,3,4,5,6,7,8,9],4,2);

//b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por pantalla la serie Fibonacci?
function fibonacci(){
	var a = 0, b = 1, c = 0;
    for(var i = 2; i <= 10; i++) {
        console.log(a);
        c = a + b;
        a = b;
        b = c;
    }
}
fibonacci();

//b2) Puedes añadir además, la posición de cada resultado?
function fibonacci(){
    var a = 0, b = 1, c = 0;
    var pos = 1;
    for(var i = 2; i <= 10; i++) {
        console.log(pos + "º Posición => " + a);
        c = a + b;
        a = b;
        b = c;
        pos++;
    }
}
fibonacci();

//b3) Ahora, inserta los resultados en una array y muestralos todos juntos de una manera amigable.
function fibonacci(){
	var a = 0, b = 1, c = 0;
	var pos = 1;
	var showFibo = [];
    for(var i = 2; i <= 10; i++) {
        showFibo.push(a);
        console.log(pos + "º Posición => " + showFibo[pos-1]);
        c = a + b;
        a = b;
        b = c;
        pos++;
    }
}
fibonacci();

/*b4) Ahora, el usuario debería ser capaz de especificar la posición de la serie hasta 
donde queremos llegar.*/
function fibonacci(num){
    num++;
	var a = 0, b = 1, c = 0;
	var pos = 1;
	var showFibo = [];
    for(var i = 2; i <= num; i++) {
        showFibo.push(a);
        console.log(pos + "º Posición => " + showFibo[pos-1]);
        c = a + b;
        a = b;
        b = c;
        pos++;
    }
}
var ans = prompt("¿En que posición quieres acabar la serie?");
fibonacci(ans);

//b5) Ahora, muestra los resultados en forma piramidal:
function fibonacci(){
    var max = 8;
    var min = 0;
    var a = 0, b = 1, c = 0;
    var array = [];
    for(var i = 2; i <= max; i++) {
            array.push(a);
            console.log(array.join(' '));
            c = a + b;
            a = b;
            b = c;
        }
    for(var i = 5; i >=min; i--){
        array.pop();
        console.log(array.join(' '));
    }
}
fibonacci();

/*c) Simple Scripting program. Crea un programa que transforme un número de 4 dígitos en otro 
diferente con las posiciones de los dígitos cambiadas, 
creando un nuevo código*/
function codeScript(code){
    var newArray = [];
    //Paso el codigo a string
    code = code.toString();

    //Lo inserto al array
    var newArray = code.split("");

    //Recojo el valor de la primera posicion
    var first = newArray[0];

    //Borro el primer elemento y agrego el borrado anteriormente
    newArray.splice(0,1);
    newArray.push(first);
    //console.log(newArray);

    //Lo convierto a string y luego buscando por internet quito las comas y lo paso a entero
    var codes = newArray.toString();
    var re = /,/g;
    var result = codes.replace(re,"");
    var codeNew = parseInt(result);

    return codeNew;
}
codeScript(3712);

/*c2) Ahora, el usuario debería poder introducir como parámetro dos códigos a la vez y 
devolver los dos códigos encriptados (Los dos códigos se deberían encriptar en la misma función)*/
function codeScript(codeA,codeB){
    var newArray = [];
    var newArray1 = [];

    codeA = codeA.toString();
    codeB = codeA.toString();

    var newArray = codeA.split("");
    var newArray2 = codeB.split("");

    var first = newArray[0];
    var first2 = newArray2[0];

    newArray.splice(0,1);
    newArray2.splice(0,1);

    newArray.push(first);
    newArray2.push(first);

    var codes = newArray.toString();
    var codes2 = newArray.toString();
    var re = /,/g;
    var result = codes.replace(re,"");
    var result2 = codes2.replace(re,"");
    var codeNew = parseInt(result);
    var codeNew2 = parseInt(result2);

    return codeNew;
    return codeNew2
}
var code1 = codeScript(3712);
var code2 = codeScript(3421);

console.log("El primer código encriptado es el => " + code1 + " ,y el segundo es el => " + code2);

/*c3) Ahora, vamos a añadir un nivel más de seguridad. Despues de cambiar la posición 
de los dígitos, multiplicaremos a cada miembro por un numero cuya multiplicación 
no sea superior a 10. (Si es superior a 10, conseguiremos una multiplicación de 
dos digitos y el código ya no sería de 4 valores)*/
function codeScript2(code){
    var newArray = [];
    code = code.toString();
    var newArray = code.split("");
    var first = newArray[0];
    newArray.splice(0,1);
    newArray.push(first);
    //console.log(newArray);
    var codes = newArray.toString();
    var re = /,/g;
    var result = codes.replace(re,"");
    var codeNew = parseInt(result);
    //Muestro el valor del número después de pasar por la función de intercambiar número
    //console.log(codeNew);
    var newCode = [];
    codeNew = codeNew.toString();
    var max = 0;
    for(var i = 0; i< codeNew.length; i++){
        if(max < codeNew[i]){
            max = codeNew[i];
        }
    }
    if(max > 4 ){
        for(var i = 0; i< codeNew.length;i++){
            newCode.push(codeNew[i]*1);
        }
    }else if(max == 4){
        for(var i = 0; i< codeNew.length;i++){
            newCode.push(codeNew[i]*2);
        }
    }else{
        for(var i = 0; i< codeNew.length;i++){
            newCode.push(codeNew[i]*3);
        }
    }
    var codes = newCode.toString();
    var re = /,/g;
    var result = codes.replace(re,"");
    var codeNew = parseInt(result);
	return codeNew;
}
codeScript2(7123);

/*c4) Ahora, implementa en otra funcion aparte el decrypter(), que recibirá como 
argumento un código encriptado (y correspondientemente multiplicado en el apartado c3) 
y nos devuelva el código desencriptado.*/
function decrypter(code){
    var second = codeScript2(code);
    code = code.toString();
    console.log("Código después de pasar por la segunda función " + second);
    var newCodes = [];
    second = second.toString();
    var max = 0 ;
    for(var i = 0; i<code.length;i++){
        if(max < code[i]){
            max = code[i]
        }
    }
    if(max > 4){
        for(var i = 0; i<second.length;i++){
            newCodes.push(second[i]/1)
        }
    }else if(max == 4){
        for(var i = 0; i<second.length;i++){
            newCodes.push(second[i]/2)
        }
    }else{
        for(var i = 0; i<second.length;i++){
            newCodes.push(second[i]/3)
        }
    }
    //console.log(newCodes);
    var first = newCodes[newCodes.length-1];	
	//console.log(first);
    newCodes.splice(newCodes.length-1,1);
    newCodes.unshift(first);
    var codes = newCodes.toString();
    var re = /,/g;
    var result = codes.replace(re,"");
    var codesNew = parseInt(result);
	return codesNew;
}
decrypter(3212);

/*c5) Añade las dos funciones a la misma función padre, 
de forma que encripte y desencripte a la vez cuando termine de ejecutarse.*/
function father(code){
    var resultNumber = decrypter(code);
    return resultNumber;
}
father(3241);

/*c6) El usuario podrá solo introducir letras, cada número del 0 al 9 corresponderá 
a varias letras. Podéis seguir este esquema.*/
function convertToCode(word){
	var dictionary = {
        0: ['A', 'K', 'T', 'F', 'O', 'Y'],
        1: ['B', 'L', 'U', 'G', 'P', 'Z'],
        2: ['C', 'M', 'V', 'H', 'Q', '.'],
        3: ['D', 'N', 'W', 'I', 'R', ','],
        4: ['E', 'Ñ', 'X', 'J', 'S', ' ']
	}
	var code = []
	for(var i = 0; i < word.length;i++){
        for(var key in dictionary){
            //dictionary[key]
			if(dictionary[key].indexOf(word[i]) !== -1){
				code.push(key)
			}
        }
    }
    return code.join('')
}
convertToCode("PEPA");

/*d) Crea un programa que use la encriptacion Romana, como es? 
Si tenemos la palabra SKYLAB, la palabra encriptada será SLKAYB*/
function encripSkylab(code){
    var code1 = [];
    var code2 = [];
    var newCode = [];
    for(var i = 0; i < code.length; i++){
        if(i < 3){
            code1.push(code[i]);
        }else{
            code2.push(code[i]);
        }
    }
    for(var i = 0; i < code1.length; i++){
        newCode.push(code1[i]);
        newCode.push(code2[i]);
    }
    return newCode.join("");
}
encripSkylab("SKYLAB");

//d2) Programa el desencriptador, pasa como parámetro SLKAYB y que devuelva SKYLAB.
var code = "SLKAYB"
function desencripterSkylab(code){
    var codeA = [];
    var codeB = [];
    var finalCode = [];
    for(var i = 0; i < code.length; i++){
        if(i % 2 == 0){
            codeA.push(code[i]);
        }else{
            codeB.push(code[i]);
        }
    }
    for(var i = 0; i < codeA.length; i++){
        finalCode.push(codeA[i]);
    }
    for(var i = 0; i < codeB.length; i++){
        finalCode.push(codeB[i]);
    }
    return finalCode.join("");
}
desencripterSkylab(code);

/*d3) Agrupa la función Encrypt y decrypt en una unica función, de forma que introduzcas 
como parámetro SKYLAB y devuelva SKYLAB (con todas las transformaciones internas hechas y mostrando, 
entre medias, la transformación)*/
function encryptanddecrypt(code){
    var code1 = [];
    var code2 = [];
    var newCode = [];
    var codeA = [];
    var codeB = [];
    var finalCode = [];

    for(var i = 0; i < code.length; i++){
        if(i < 3){
            code1.push(code[i]);
        }else{
            code2.push(code[i]);
        }
    }
    console.log("Código separado => " + code1 + " : " + code2);
    for(var i = 0; i < code1.length; i++){
        newCode.push(code1[i]);
        newCode.push(code2[i]);
    }
    console.log("Ecuador de la transformación => " + newCode.join(""));
    
    for(var i = 0; i < newCode.length; i++){
        if(i % 2 == 0){
            codeA.push(newCode[i]);
        }else{
            codeB.push(newCode[i]);
        }
    }
    console.log("Retornando al inicio => " + codeA + " : " + codeB);
    for(var i = 0; i < codeA.length; i++){
        finalCode.push(codeA[i]);
    }
    for(var i = 0; i < codeB.length; i++){
        finalCode.push(codeB[i]);
    }
    console.log("Tranformación final => " + finalCode.join(""));
}
encryptanddecrypt("SKYLAB");

/*d4) Lo tienes? Prueba ahora con SKYLABCODERS. Cambia la función para que pueda aceptar 
palabras más largas.*/
function encryptanddecrypt2(code){
    var code1 = [];
    var code2 = [];
    var newCode = [];
    var codeA = [];
    var codeB = [];
    var finalCode = [];
    for(var i = 0; i < code.length; i++){
        if(i < code.length/2){
            code1.push(code[i]);
        }else{
            code2.push(code[i]);
        }
    }
    console.log("Código separado => " + code1 + " : " + code2);
    for(var i = 0; i < code1.length; i++){
        newCode.push(code1[i]);
        newCode.push(code2[i]);
    }
    console.log("Ecuador de la transformación => " + newCode.join(""));
    
    for(var i = 0; i < newCode.length; i++){
        if(i % 2 == 0){
            codeA.push(newCode[i]);
        }else{
            codeB.push(newCode[i]);
        }
    }
    console.log("Retornando al inicio => " + codeA + " : " + codeB);
    for(var i = 0; i < codeA.length; i++){
        finalCode.push(codeA[i]);
    }
    for(var i = 0; i < codeB.length; i++){
        finalCode.push(codeB[i]);
    }
    console.log("Tranformación final => " + finalCode.join(""));
}
encryptanddecrypt2("SKYLABCODERS");

/*e) Crea un programa al que le introduces un número como parámetro del 0 al 100 y 
devuelve el número transformado a alfabeto normal, es decir:*/
var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

var code = 5;

function sayItWithWords(code){
    if(code <= 9){
        console.log(units[code]);
    }
    if(code > 9 && code <= 19){
        console.log(teens[code-10]);
    }
    if(code > 19){
        var newCode = code.toString();
        //console.log(newCode);
        var newArray = newCode.split("");
        //console.log(newArray);
        var result = tens[newArray[0]];
        result += "-" + units[newArray[1]];
        console.log(result);
    }
}
sayItWithWords(code);

/*e2) Ahora, el output debería ser capaz de, aparte de devolver el número traducido, 
devolver también los números por los que está formado:*/
var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

function sayItWithWords(code){
    if(code <= 9){
        console.log(units[code] + " , " + units[code] + " / "+ code);
    }
    if(code > 9 && code <= 19){var newCode = code.toString();
        var newArray = newCode.split("");
        var result = tens[newArray[0]];
        result += "-" + units[newArray[1]];
        var number = newArray[0];
        number = number * 10;
        console.log(teens[code-10] + " , " + teens[code-10] + " / "+ number + " + " +
        newArray[1]);
    }
    if(code > 19){
        var newCode = code.toString();
        //console.log(newCode);
        var newArray = newCode.split("");
        //console.log(newArray);
        var result = tens[newArray[0]];
        result += "-" + units[newArray[1]];
        var number = newArray[0];
        number = number * 10;
        console.log(result + " , " + tens[newArray[0]] + " + " + units[newArray[1]] + " / "  + number + 
        " + " + newArray[1]);
    }
}
sayItWithWords(5);

//e3) Cambia tu programa para que acepte cualquier número entre 0 y 1000.
var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var code = 12;

function sayItWithWords(code){
    if(code <= 9){
        console.log(units[code] + ", " + units[code] + " / "+ code);
    }
    else if(code > 9 && code <= 19){var newCode = code.toString();
        var newArray = newCode.split("");
        var result = tens[newArray[0]];
        var number = newArray[0];
        number = number * 10;
        console.log(teens[code-10] + ", " + teens[code-10] + " / "+ number + " + " +
        newArray[1]);
    }
    else if(code > 19 && code <= 99){
        var newCode = code.toString();
        //console.log(newCode);
        var newArray = newCode.split("");
        //console.log(newArray);
        var result = tens[newArray[0]];
        result += "-" + units[newArray[1]];
        var number = newArray[0];
        number *= 10;
        console.log(result + ", " + tens[newArray[0]] + " + " + units[newArray[1]] + " / "  + number + 
        " + " + newArray[1]);
    }
    else if(code > 109 && code <= 119){
        var newCode = code.toString();
        var newArray = newCode.split("");
        var result = units[newArray[0]];
        var number = newArray[0];
        number *= 100;
        var number2 = newArray[1];
        number2 *= 10;
        //console.log(result);
        result += " hundred " + teens[code-110];
        console.log(result + ", " + units[newArray[0]] + " " + " hundred " +
        " + " + teens[code-110] + " / " + number + 
        " + " + number2 + " + " + newArray[2]);
    }else{
        var newCode = code.toString();
        var newArray = newCode.split("");
        var result = units[newArray[0]];
        var number = newArray[0];
        number *= 100;
        var number2 = newArray[1];
        number2 *= 10;
        //console.log(result);
        result += " hundred " + teens[newArray[1]] + " " + units[newArray[2]];
        console.log(result + ", " + units[newArray[0]] + " " + " hundred " +
        " + " + tens[newArray[1]] + " + " + units[newArray[2]] + " / " + number + 
        " + " + number2 + " + " + newArray[2]);
    }
}
sayItWithWords(code);

//f) Recibiendo el siguiente texto por parámetro a tu función... :
function changeWord(code){
    var input = code;
    for(var i =0; i< input.length;i++){
        input=input.replace(",", "");
    }
    for(var i =0; i< input.length;i++){
        input=input.replace(".", ",");
    }
    var array = input.split(" ");
    for(var i =0; i< array.length;i++){
        /*input = input.replace("dolor", "potato");
        input = input.replace(/Lorem/g,"tomato");
        input = input.replace(/labor/g,"cucumber");
        input = input.replace(/consequatur/g,"garlic");
        input = input.replace(/ipsum/g,"onion")*/
        if("dolor" == array[i]){
            array[i]="potato";
        }
        if("Lorem" == array[i]){
            array[i]="tomato";
        }
        if("labor" == array[i]){
            array[i]="cucumber";
        }
        if("consequatur" == array[i]){
            array[i]="garlic";
        }
        if("ipsum" == array[i]){
            array[i]="onion";
        }
    }
    return array.join(" ");
}
changeWord("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.");

/*f1) Añade una funcionalidad que cuente cuantos cambios/coincidencias ha encontrado 
de cada palabra, y te los muestre de una forma amigable para el usuario*/
function countChanges(code){
    var countDolor = 0;
    var countLorem = 0;
    var countLabor = 0;
    var countConsequatur = 0;
    var countIpsum = 0;
    var totalCount = 0;
    var input = code;
    for(var i =0; i< input.length;i++){
        input=input.replace(",", "");
    }
    for(var i =0; i< input.length;i++){
        input=input.replace(".", ",");
    }
    var array = input.split(" ");
    for(var i =0; i< array.length;i++){
        if("dolor" == array[i]){
            array[i]="potato";
            countDolor++;
            totalCount++;
        }
        if("Lorem" == array[i]){
            array[i]="tomato";
            countLorem++;
            totalCount++;
        }
        if("labor" == array[i]){
            array[i]="cucumber";
            countLabor++;
            totalCount++;
        }
        if("consequatur" == array[i]){
            array[i]="garlic";
            countConsequatur++;
            totalCount++;
        }
        if("ipsum" == array[i]){
            array[i]="onion";
            countIpsum++;
            totalCount++;
        }
    }
    console.log("Del texto transformado => " + array.join(" "));
    console.log("Ha habido " + totalCount + " cambios totales, respecto al texto original");
    console.log("Coincidencias de la palabra 'dolor' => " + countDolor);
    console.log("Coincidencias de la palabra 'Lorem' => " + countLorem);
    console.log("Coincidencias de la palabra 'labor' => " + countLabor);
    console.log("Coincidencias de la palabra 'consequatur' => " + countConsequatur);
    console.log("Coincidencias de la palabra 'ipsum' => " + countIpsum);
}
countChanges("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.");
