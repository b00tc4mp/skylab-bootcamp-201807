## Final Challenges (JS)!
a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9, 
muestres por pantalla los numeros unidos por parejas (1-2, 2-3, 3-4...), 
además, cada elemento de la pareja deberá estar multiplicada por 2.

function showNums(){
    var nums = [1,2,3,4,5,6,7,8,9]
    for(var i = 0; i < nums.length-1; i++){
        var pairs = []
        ...
    }
}
// output =>
//1ª pareja 2 - 4
//2ª pareja 4 - 6
//3ª pareja 6 - 8
//4ª pareja 8 - 10
//5ª pareja 10 - 12
//6ª pareja 12 - 14
//7ª pareja 14 - 16
//8ª pareja 16 - 18
Hint: Métodos útiles => push() - join() - map()


var nums = [1,2,3,4,5,6,7,8,9];
counter = 0;
var pair = [];

function showNums(){
    for (var i = 0; i < nums.length - 1; i++){
        counter++;
        pair.push((nums[i]*2),((nums[i]+1)*2));

        console.log(counter+"ª pareja "+pair.join(' - '));
        pair = [];
        }
    };

showNums();

a1) La funcion debería aceptar la array a tratar como argumento.

function showNums(1,2,3,4,5){
    var nums = arguments...
    nums.map(...)
}
// output =>
// 1ª pareja 2 - 4
// 2ª pareja 4 - 6
// 3ª pareja 6 - 8
//...

counter = 0;
var pair = [];

function showNums(){
    var nums = arguments;
    
    for (var i = 0; i < nums.length - 1; i++){
        counter++;
        pair.push((nums[i])*2,((nums[i]+1)*2));
        
        console.log(counter+"ª pareja "+pair.join(' - '));
        pair = [];
        }
    
    };

showNums(1,2,3,4,5,6,7,8,9);


a2) Pasa también el numero a multiplicar a la función como argumento

function showNums(1,2,3,4,5,...,12){ //<= el último número de arguments lo podemos tratar como el numero multiplicador...
}
// output =>
// El numero escogido es: 12
// 1ª pareja 12 - 24
// 2ª pareja 24 - 36
// 3ª pareja 36 - 48
// 4ª pareja 48 - 60
// 5ª pareja 60 - 72
// ...

counter = 0;
var pair = [];

function showNums(){
    var nums = arguments;
    
    for (var i = 0; i < nums.length - 1; i++){
        counter++;
        pair.push((nums[i])*(nums[nums.length - 1]),((nums[i]+1)*(nums[nums.length - 1])));
        
        console.log(counter+"ª pareja "+pair.join(' - '));
        pair = [];
        }
    
    };

showNums(1,2,3,4,5,6,7,8,9,10,11,12);


a3) La función debería ser capaz de recibir el numero de parejas que queremos devolver del total.

function showNums(1,2,3,4,5,...,12, 3){ // <= ahora, el último numero lo podriamos tomar como el delimitador
}
// output =>
// El numero escogido es: 12
// Se quieren mostrar las 3 primeras parejas
// 1ª pareja 12 - 24
// 2ª pareja 24 - 36
// 3ª pareja 36 - 48

counter = 0;
var pair = [];

function showNums(){
    var nums = arguments;
        console.log("El numero escogido es: " + nums[nums.length - 2])
        console.log("Se quieren mostrar las " + nums[nums.length - 1] + " parejas")
    for (var i = 0; i < nums[nums.length - 1]; i++){
        counter++;
        pair.push((nums[i])*(nums[nums.length - 2]),((nums[i]+1)*(nums[nums.length - 2])));
        
        console.log(counter+"ª pareja "+pair.join(' - '));
        pair = [];
        }
    
    };

showNums(1,2,3,4,5,6,7,8,9,10,11,2,5);


b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por pantalla la serie Fibonacci? https://www.mathsisfun.com/numbers/fibonacci-sequence.html
// output: 0 1 1 2 3 5 8...
function fibo(numbers){
    arrFibo = [0,1];
    positionLast = arrFibo.length - 1
    for (var i = 0; i < numbers; i++){
        arrFibo.push((arrFibo[positionLast])+(arrFibo[positionLast - 1]));
        positionLast++;
    }
    return arrFibo;

}

function order(numbers){
    arrayWithoutOrder = fibo(numbers);
    for (var i = 0; i < arrayWithoutOrder.length; i++){
     arrayWithoutOrder.map(function(x) {x + 
    }
   return x * 2;
});
    console.log(arrayOrder);
}

order(20);

b2) Puedes añadir además, la posición de cada resultado?

function fibo(numbers){
    arrFibo = [0,1];
    positionLast = arrFibo.length - 1
    for (var i = 0; i < numbers; i++){
        arrFibo.push((arrFibo[positionLast])+(arrFibo[positionLast - 1]));
        positionLast++;
    }
    return arrFibo;

}

function order(numbers){
    
    arrayWithoutOrder = fibo(numbers);
    console.log(arrayWithoutOrder);
    for (var i = 0; i < arrayWithoutOrder.length; i++){
    console.log("Numero " + (i) + "º de Fibonacci es el " + arrayWithoutOrder[i]); 
    };
    
}

order(20);


b3) Ahora, inserta los resultados en una array y muestralos todos juntos de una manera amigable.

function fibo(numbers){
    arrFibo = [0,1];
    positionLast = arrFibo.length - 1
    for (var i = 0; i < numbers; i++){
        arrFibo.push((arrFibo[positionLast])+(arrFibo[positionLast - 1]));
        positionLast++;
    }
    return arrFibo;

}

function order(numbers){
    arrOrdenTotal = [];
    arrayWithoutOrder = fibo(numbers);
    console.log(arrayWithoutOrder);
    for (var i = 0; i < (arrayWithoutOrder.length - 1); i++){
    arrOrdenTotal.push("Numero " + (i) + "º de Fibonacci es el " + arrayWithoutOrder[i]); 
    
    };
    console.log(arrOrdenTotal);
}

order(10);

b4) Ahora, el usuario debería ser capaz de especificar la posición de la serie hasta donde queremos llegar.

function fibo(10){}
//... 55 - pos 10º

function fibo(numbers){
    arrFibo = [0,1];
    positionLast = arrFibo.length - 1
    for (var i = 0; i < numbers; i++){
        arrFibo.push((arrFibo[positionLast])+(arrFibo[positionLast - 1]));
        positionLast++;
    }
    return arrFibo;

}

function order(numbers){
    arrOrdenTotal = [];
    arrayWithoutOrder = fibo(numbers);
    
    for (var i = 0; i < (arrayWithoutOrder.length - 1); i++){
    arrOrdenTotal.push("Numero " + (i) + "º de Fibonacci es el " + arrayWithoutOrder[i]); 
    
    };
    console.log(arrOrdenTotal);
}

order(10);

b5) Ahora, muestra los resultados en forma piramidal:

function fiboPymamid(num){}
0
0 1
0 1 1
0 1 1 2
0 1 1 2 3
0 1 1 2 3 5
0 1 1 2 3 5 8 //To position. num
0 1 1 2 3 5
0 1 1 2 3
0 1 1 2
0 1 1
0 1
0


function fibo(numbers){
    arrFibo = [0,1];
    positionLast = arrFibo.length - 1
    for (var i = 0; i < numbers; i++){
        arrFibo.push((arrFibo[positionLast])+(arrFibo[positionLast - 1]));
        positionLast++;
        
    }
    return arrFibo

}



function fiboPir(numbers){
    nopirArr = fibo(numbers)
    arrUp = [];
    for (var i = 0; i < numbers; i++){
        arrUp.push(nopirArr[i]);
        console.log(arrUp);
    }
    for (var i = 0; i < numbers - 1; i++){
        arrUp.pop();
        console.log(arrUp)
    }
}


fiboPir(7);







c) Simple Scripting program. Crea un programa que transforme un número de 4 dígitos en otro diferente con las posiciones de los dígitos cambiadas, 
creandio un nuevo código

var code = 3712;
function codeScript(code){}
//output:
 ⬇︎//First call to codeScript()
- 7123
 ⬇︎//Second call to codeScript()
- 1237
 ⬇︎//Third call to codeScript()
- 2371
// At Four call, should return the original value
El primer numero se traslada a la última posicion. El segundo, el tercero y el cuarto suben una posición.

var code = 3712;
var codigo = code.toString();
var arrCode = codigo.split("");
console.log("ORIGINAL CODE: "+arrCode);
function codeScript(){
    
    arrCode.push(arrCode.shift());
    console.log(arrCode);

};

codeScript();
codeScript();
codeScript();
codeScript();







c2) Ahora, el usuario debería poder introducir como parámetro dos códigos a la vez 
y devolver los dos códigos encriptados (Los dos códigos se deberían encriptar en la misma función)

function codeScript(code1, code2){

var loopsencrypt = 1;

var codeOne = code1;
var codeTwo = code2;
var encryptedOne = [];
var encryptedTwo = [];

var codigoOne = codeOne.toString();
var arrCodeOne = codigoOne.split("");
console.log("ORIGINAL CODE ONE: "+arrCodeOne.join(""));

for (var i = 0; i < loopsencrypt; i++){
    arrCodeOne.push(arrCodeOne.shift());
    encryptedOne.push(arrCodeOne);
    }
console.log("ENCRYPTED CODE ONE: "+encryptedOne.toString());

var codigoTwo = codeTwo.toString();
var arrCodeTwo = codigoTwo.split("");
console.log("ORIGINAL CODE TWO: "+arrCodeTwo.join(""));

for (var i = 0; i < loopsencrypt; i++){
    arrCodeTwo.push(arrCodeTwo.shift());
    encryptedTwo.push(arrCodeTwo);
    }
console.log("ENCRYPTED CODE TWO: "+encryptedTwo.toString());

};



codeScript(3712, 5645);









c3) Ahora, vamos a añadir un nivel más de seguridad. Despues de cambiar la posición de los dígitos, 
multiplicaremos a cada miembro por un numero cuya multiplicación no sea superior a 10. 
(Si es superior a 10, conseguiremos una multplicación de dos digitos y el código ya no sería de 4 valores)

function codeScript(code1){



var loopsencrypt = 2;

var arrCodeOne = (""+code1).split("");

console.log("ORIGINAL CODE: "+code1); //3712

var arro = arrCodeOne;



for (var i = 0; i < loopsencrypt; i++){
    var encryptedOne = [];
    arro.push(arro.shift());
    }
var encryptedLevelOne = Number(arro.join(""))
console.log("ENCRYPTATION LEVEL ONE: "+ encryptedLevelOne); //1237

function multiply(el,ind,arr){
    if (el < 5){arr[ind] = el * 2}
};

arro.forEach(multiply);

var encryptedFinalNumber=Number(arro.join(""))

console.log("ENCRYPTATION LEVEL TWO (FINAL CODE): "+ encryptedFinalNumber); //2467

};




codeScript(3712);



c4) Ahora, implementa en otra funcion aparte el decrypter(), 
que recibirá como argumento un código encriptado (y correspondientemente multiplicado en el apartado c3)
 y nos devuelva el código desencriptado.

function decrypter(value1){
    
arroDecrypt = (""+value1).split("");

function divide(el,ind,arr){
    if (arr[ind] % 2 == 0){arr[ind] = el / 2}
};

arroDecrypt.forEach(divide);

var decryptLevelOne = Number(arroDecrypt.join(""))

console.log("DECRYPTATION LEVEL ONE: "+decryptLevelOne);

var loopsencrypt = 2;

for (var i = 0; i < loopsencrypt; i++){
    arroDecrypt.push(arroDecrypt.shift());
    }
var decryptedLevelOne = Number(arroDecrypt.join(""))
console.log("DECRYPTATION LEVEL TWO (ORIGINAL CODE): "+ decryptedLevelOne); //1237

}

decrypter(2467)


c5) Añade las dos funciones a la misma función padre, de forma que encripte y desencripte a la vez cuando termine de ejecutarse.

function codeScript(code1, code2){... codeDecrypt(code1Encrypt,code2Encrypt)}

var encryptedFinalNumber = "";

function codeScript(code1){

    var loopsencrypt = 2;

    var arrCodeOne = (""+code1).split("");

    console.log("ORIGINAL CODE: "+code1); //3712

    var arro = arrCodeOne;

    for (var i = 0; i < loopsencrypt; i++){
        var encryptedOne = [];
        arro.push(arro.shift());
        }
    var encryptedLevelOne = Number(arro.join(""))
    console.log("ENCRYPTATION LEVEL ONE: "+ encryptedLevelOne); //1237

    function multiply(el,ind,arr){
        if (el < 5){arr[ind] = el * 2}
    };

    arro.forEach(multiply);

    encryptedFinalNumber=Number(arro.join(""))

    console.log("ENCRYPTATION LEVEL TWO (FINAL CODE): "+ encryptedFinalNumber); //2467

};




function decrypter(encryptedFinalNumber){
    
    arroDecrypt = (""+encryptedFinalNumber).split("");

    function divide(el,ind,arr){
        if (arr[ind] % 2 == 0){arr[ind] = el / 2}
    };

    arroDecrypt.forEach(divide);

    var decryptLevelOne = Number(arroDecrypt.join(""))

    console.log("DECRYPTATION LEVEL ONE: "+decryptLevelOne);

    var loopsencrypt = 2;

    for (var i = 0; i < loopsencrypt; i++){
        arroDecrypt.push(arroDecrypt.shift());
        }
    var decryptedLevelOne = Number(arroDecrypt.join(""))
    console.log("DECRYPTATION LEVEL TWO (ORIGINAL CODE): "+ decryptedLevelOne); //1237

    };



function encryptDencrypt(code1){
    codeScript(code1);
    decrypter(encryptedFinalNumber);
};

encryptDencrypt(3712);






c6) El usuario podrá solo introducir letras, cada número del 0 al 9 corresponderá a varias letras. Podéis seguir este esquema.

//var dictionary = {
//    0: ['A'(dictionary[0][0]), 'K'(dictionary[0][1]), 'T'(dictionary[0][2]), 'F'(dictionary[0][3]), 'O'(dictionary[0][4]), 'Y'(dictionary[0][5])],
//    1: ['B'(dictionary[1][0]), 'L'(dictionary[1][1]), 'U'(dictionary[1][2]), 'G'(dictionary[1][3]), 'P'(dictionary[1][4]), 'Z'(dictionary[1][5])],
//    2: ['C'(dictionary[2][0]), 'M'(dictionary[2][1]), 'V'(dictionary[2][2]), 'H'(dictionary[2][3]), 'Q'(dictionary[2][4]), '.'(dictionary[2][5])],
//    3: ['D'(dictionary[3][0]), 'N'(dictionary[3][1]), 'W'(dictionary[3][2]), 'I'(dictionary[3][3]), 'R'(dictionary[3][4]), ','(dictionary[3][5])],
//    4: ['E'(dictionary[4][0]), 'Ñ'(dictionary[4][1]), 'X'(dictionary[4][2]), 'J'(dictionary[4][3]), 'S'(dictionary[4][4]), ' '(dictionary[4][5])]
//}





var dictionary = {
    0: ['A', 'K', 'T', 'F', 'O', 'Y'],
    1: ['B', 'L', 'U', 'G', 'P', 'Z'],
    2: ['C', 'M', 'V', 'H', 'Q', '.'],
    3: ['D', 'N', 'W', 'I', 'R', ','],
    4: ['E', 'Ñ', 'X', 'J', 'S', ' ']
}
function codeScript("HI  ", "WE  ", "NEED", "HELP"){}
"HI__" = "dictionary[7][0]+dictionary[8][0]+dictionary[9][2]+dictionary[9][2]..."

function searchArrayCharacter(value){


var dictionary = {
    0: ['A', 'K', 'T', 'F', 'O', 'Y'],
    1: ['B', 'L', 'U', 'G', 'P', 'Z'],
    2: ['C', 'M', 'V', 'H', 'Q', '.'],
    3: ['D', 'N', 'W', 'I', 'R', ','],
    4: ['E', 'Ñ', 'X', 'J', 'S', ' ']
}
    

    inputTexttoArray = value.split("")

    console.log(inputTexttoArray)

    var objectLength = Object.keys(dictionary).length
    stringArray = [];




        function searchArrayCharacter (x){
            for (var i = 0; i < objectLength; i++){
                 for (var j = 0; j < dictionary[i].length; j++){
                    if (dictionary[i][j] === x){
                        stringArray.push("dictionary[" + i + "][" + j + "]")
                        }
                }
            }
        }

    inputTexttoArray.forEach(searchArrayCharacter);    

console.log(stringArray.join("+"));

};

searchArrayCharacter ("HI WE NEED HELP");




d) Crea un programa que use la encriptacion Romana, como es? Si tenemos la palabra SKYLAB, la palabra encriptada será SLKAYB. 
Si divides la palabra original en 2 grupos obtienes:

SKY
|-|-|
LAB Entonces, uniendo las primeras letras de cada grupo, las segundas y las terceras obtienes SLKAYB.
Entonces, el programa deberá recibir SKYLAB y retornar SLKAYB


function romana(value){

    arrayOriginal = value.split("");
    originalLenght = arrayOriginal.length
    halfLength = originalLenght / 2
    arraygroup = [];
    for (var i = 0; i < halfLength ;i++){
        arraygroup.push(arrayOriginal[i],arrayOriginal[halfLength+i])
    }
    console.log("NEW WORD: "+arraygroup.join(""));
    console.log("ORIGINAL: "+arrayOriginal.join(""));

}

romana("SKYLAB");



d2) Programa el desencriptador, pasa como parámetro SLKAYB y que devuelva SKYLAB.

Hint: for decrypt, only catch the pair words like: S L K A Y B , then, you get SKY, the next step is catch the odd words, S L K A Y B, group the two groups and you get the original word.


function antiromana(value){

    arrayOriginal = value.split("");
    originalLenght = arrayOriginal.length
    halfLength = originalLenght / 2
    arrayOdds = [];
    arrayEvens = [];
    

    
    for (var i = 0; i < originalLenght ; i+= 2){
        arrayOdds.push(arrayOriginal[i])
    }
    console.log(arrayOdds);
    
    
    for (var i = 1; i < originalLenght ; i+= 2){
        arrayEvens.push(arrayOriginal[i])
    }
    console.log(arrayEvens);
    
    arraygroup = arrayOdds.concat(arrayEvens) ;
    
    console.log("NEW WORD: "+arraygroup.join(""));
    console.log("ORIGINAL: "+arrayOriginal.join(""));

}

antiromana("SLKAYB");



d3) Agrupa la función Encrypt y decrypt en una unica función, de forma que introduzcas como parámetro SKYLAB y devuelva SKYLAB (con todas las transformaciones internas hechas y mostrando, entre medias, la transformación)


var romanaword = "";

function romana(value){

    arrayOriginal = value.split("");
    originalLenght = arrayOriginal.length
    halfLength = originalLenght / 2
    arraygroup = [];
    for (var i = 0; i < halfLength ;i++){
        arraygroup.push(arrayOriginal[i],arrayOriginal[halfLength+i])
    }
    romanaword = arraygroup.join("");
    console.log("ENCRYPT");
    console.log("NEW WORD: "+arraygroup.join(""));
    console.log("ORIGINAL: "+arrayOriginal.join(""));

}



function antiromana(romanaword){

    arrayOriginal = romanaword.split("");
    originalLenght = arrayOriginal.length
    halfLength = originalLenght / 2
    arrayOdds = [];
    arrayEvens = [];
    

    
    for (var i = 0; i < originalLenght ; i+= 2){
        arrayOdds.push(arrayOriginal[i])
    }
    //console.log(arrayOdds);
    
    
    for (var i = 1; i < originalLenght ; i+= 2){
        arrayEvens.push(arrayOriginal[i])
    }
    //console.log(arrayEvens);
    
    arraygroup = arrayOdds.concat(arrayEvens) ;
    console.log("DENCRYPT");
    console.log("NEW WORD: "+arraygroup.join(""));
    console.log("ORIGINAL: "+arrayOriginal.join(""));

}




function romanStyle(value){
    romana(value)
    antiromana(romanaword)
}


romanStyle("SKYLAB");




d4) Lo tienes? Prueba ahora con SKYLABCODERS. Cambia la función para que pueda aceptar palabras más largas.



var romanaword = "";

function romana(value){

    arrayOriginal = value.split("");
    originalLenght = arrayOriginal.length
    halfLength = originalLenght / 2
    arraygroup = [];
    for (var i = 0; i < halfLength ;i++){
        arraygroup.push(arrayOriginal[i],arrayOriginal[halfLength+i])
    }
    romanaword = arraygroup.join("");
    console.log("-----ENCRYPT-----");
    console.log("NEW WORD: "+arraygroup.join(""));
    console.log("ORIGINAL: "+arrayOriginal.join(""));

}



function antiromana(romanaword){

    arrayOriginal = romanaword.split("");
    originalLenght = arrayOriginal.length
    halfLength = originalLenght / 2
    arrayOdds = [];
    arrayEvens = [];
    

    
    for (var i = 0; i < originalLenght ; i+= 2){
        arrayOdds.push(arrayOriginal[i])
    }
    //console.log(arrayOdds);
    
    
    for (var i = 1; i < originalLenght ; i+= 2){
        arrayEvens.push(arrayOriginal[i])
    }
    //console.log(arrayEvens);
    
    arraygroup = arrayOdds.concat(arrayEvens) ;
    console.log("-----DENCRYPT-----");
    console.log("NEW WORD: "+arraygroup.join(""));
    console.log("ORIGINAL: "+arrayOriginal.join(""));

}




function romanStyle(value){
    romana(value)
    antiromana(romanaword)
}


romanStyle("SKYLABCODERS");



e) Crea un programa al que le introduces un número como parámetro del 0 al 100 y devuelve el número transformado a alfabeto normal, es decir:

sayItWithWords(5) => //output Five
sayItWithWords(23) => //output twenty-three
sayItWithWords(71) => //output seventy-one
Hint:

var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];


function sayItWithWords(number){

var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    var valuesArr = number.toString().split("");
    var digits = valuesArr.length;

    var indexUnits = [];
    var indexTens = [];
    var indexTeens = [];
    
    if (digits == 1){
        indexUnits.push(valuesArr[0]);
        console.log(units[indexUnits])
    } else if (digits == 2 && number > 19){
        indexUnits.push(valuesArr[1]);
        indexTens.push(valuesArr[0]);
        console.log(tens[indexTens] + " " + units[indexUnits])
    } else if (digits == 2 && number < 20){
        indexTeens.push(valuesArr[1]);
        console.log(teens[indexTeens])
    } else if (digits == 3){
        console.log("One hundred")
    }

};

sayItWithWords(19);


e2) Ahora, el output debería ser capaz de, aparte de devolver el número traducido, devolver también los números por los que está formado:

sayItWithWords(5) => //output Five, five / 5
sayItWithWords(23) => //output twenty-three, twenty + three / 20 + 3
sayItWithWords(71) => //output seventy-one, seventy + one / 70 + 1

function sayItWithWords(number){

var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    var valuesArr = number.toString().split("");
    var digits = valuesArr.length;

    var indexUnits = [];
    var indexTens = [];
    var indexTeens = [];
    
    if (digits == 1){
        indexUnits.push(valuesArr[0]);
        console.log(units[indexUnits] + ", " + units[indexUnits] + " / " + indexUnits)
    } else if (digits == 2 && number > 19){
        indexUnits.push(valuesArr[1]);
        indexTens.push(valuesArr[0]);
        console.log(tens[indexTens] + " " + units[indexUnits] + ", " + tens[indexTens] + " + " + units[indexUnits] + " / " +  (indexTens+0) + " + " + indexUnits)
    } else if (digits == 2 && number < 20){
        indexTens.push(valuesArr[0]);
        indexTeens.push(valuesArr[1]);
        indexUnits.push(valuesArr[1]);
        console.log(teens[indexTeens] + ", " + teens[0] + " + " + units[indexUnits] + " / " +  (indexTens+0) + " + " + indexUnits)
    } else if (digits == 3){
        console.log("One hundred")
    }

};

sayItWithWords(15);



e3) Cambia tu programa para que acepte cualquier número entre 0 y 1000.

sayItWithWords(500) => //output five hundred , five hundred  / 500
sayItWithWords(233) => //output two hundred thirty three, two hundred + thirty + three/ 200 + 30 + 3
sayItWithWords(498) => //output four hundred ninety eight, four hundred + ninety + eight/ 400 + 90 + 8

function sayItWithWords(number){

var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var hundreds = ['',"one hundred","two hundred","three hundred","four hundred","five hundred","six hundred","seven hundred","eight hundred", "nine hundred"];

    var valuesArr = number.toString().split("");
    var digits = valuesArr.length;

    var indexUnits = [];
    var indexTens = [];
    var indexTeens = [];
    var indexHundreds = [];
    
    if (digits == 1){//units
        indexUnits.push(valuesArr[0]);
        console.log(units[indexUnits] + ", " + units[indexUnits] + " / " + indexUnits)
    } else if (digits == 2 && number > 19){//tens
        indexUnits.push(valuesArr[1]);
        indexTens.push(valuesArr[0]);
        console.log(tens[indexTens] + " " + units[indexUnits] + ", " + tens[indexTens] + " + " + units[indexUnits] + " / " +  (indexTens+0) + " + " + indexUnits)
    } else if (digits == 2 && number < 20){//teens
        indexTens.push(valuesArr[0]);
        indexTeens.push(valuesArr[1]);
        indexUnits.push(valuesArr[1]);
        console.log(teens[indexTeens] + ", " + teens[0] + " + " + units[indexUnits] + " / " +  (indexTens+0) + " + " + indexUnits)
    } else if (digits == 3){//hundreds
        indexUnits.push(valuesArr[2]);
        indexTens.push(valuesArr[1]);
        indexTeens.push(valuesArr[2]);
        indexHundreds.push(valuesArr[0]);
            if (valuesArr[1] > 1){
            console.log(hundreds[indexHundreds] + " " + tens[indexTens] + " " + units[indexUnits] + ", " + hundreds[indexHundreds] + " + " + tens[indexTens] + " + " + units[indexUnits] + " / " + (indexHundreds+0+0) + " + "+  (indexTens+0) + " + " + indexUnits  )
            } else if (valuesArr[1] == 1){//teens
            console.log(hundreds[indexHundreds] + " " + teens[indexTeens] + ", " + hundreds[indexHundreds] + " + " + teens[0] + " + " + units[indexUnits] + " / " + (indexHundreds+0+0) + " + "+  (indexTens+0) + " + " + indexUnits  )
            } else if (valuesArr[1] < 1){//units
            console.log(hundreds[indexHundreds] + " " + tens[indexTens] + " " + units[indexUnits] + ", " + hundreds[indexHundreds] + " + " + units[indexUnits] + " / " + (indexHundreds+0+0) + " + " + indexUnits  )
            }
    } else if (digits == 4){
        console.log("One thousand")
    }
};

sayItWithWords(155);


f) Recibiendo el siguiente texto por parámetro a tu función... :
f1) Añade una funcionalidad que cuente cuantos cambios/coincidencias ha encontrado de cada palabra, y te los muestre de una forma amigable para el usuario


Prepara dicha función para que modifique y devuelva el texto bajo estas reglas: 
Signos de puntuación:
"." => ","
"," => "" 
Palabras: 
"dolor" => "potato"
"lorem" => "tomato"
"labor" => "cucumber"
"consequatur" => "garlic"
"ipsum" => "onion"


var veryLongText = "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur."

var arrayText = veryLongText.split(" ");

var potatoCounter = 0;
var tomatoCounter = 0;
var cucumberCounter = 0;
var garlicCounter = 0;
var onionCounter = 0;


for (var i = 0; i < arrayText.length; i++){
    if (arrayText[i] == "dolor"){
        arrayText[i] = "potato";
        potatoCounter++;
    } else if (arrayText[i] == "lorem"){
        arrayText[i] = "tomato";
        tomatoCounter++;
    } else if (arrayText[i] == "labor"){
        arrayText[i] = "cucumber";
        cucumberCounter++;
    } else if (arrayText[i] == "consequatur"){
        arrayText[i] = "garlic";
        garlicCounter++;
    } else if (arrayText[i] == "ipsum"){
        arrayText[i] = "onion";
        onionCounter++;
    }
}

var potatoText = arrayText.join(" ");

arrayPotato = potatoText.split("");

for (var i = 0; i < arrayPotato.length; i++){
    if (arrayPotato[i] == "."){
        arrayPotato[i] = ","
    } else if (arrayPotato[i] == ","){
        arrayPotato[i] = ""
    } 
}

//f)
console.log(arrayPotato.join(""));
//f1)
console.log("dolor => potato :" + potatoCounter +"\n"+"lorem => tomato :" + tomatoCounter+"\n"+"labor => cucumber :" + cucumberCounter+"\n"+"consequatur => garlic :" + garlicCounter+"\n"+"ipsum => onion :" + onionCounter)










