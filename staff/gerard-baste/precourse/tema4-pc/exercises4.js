//## Final Challenges (JS)!
//a) Escribe una funcion en la que, declarando una array con los numeros del 1 al 9, muestres por pantalla los numeros unidos por parejas (1-2, 2-3, 3-4...), además, cada elemento de la pareja deberá estar multiplicada por 2.

function showNums() {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var pairs = nums.map(function (x) {
        return x * 2;
    });
    for (var i = 0; i < nums.length - 1; i++) {
        console.log(nums[i] + 'º pareja => ' + pairs[i] + ' - ' + pairs[i + 1]);
    }
}

showNums();
// output =>
//1ª pareja 2 - 4
//2ª pareja 4 - 6
//3ª pareja 6 - 8
//4ª pareja 8 - 10
//5ª pareja 10 - 12
//6ª pareja 12 - 14
//7ª pareja 14 - 16
//8ª pareja 16 - 18


//a1) La funcion debería aceptar la array a tratar como argumento.

function showNums(arrayNums) {

    var pairs = arrayNums.map(function (x) {
        return x * 2;
    });
    for (var i = 0; i < arrayNums.length - 1; i++) {
        console.log(arrayNums[i] + 'º pareja => ' + pairs[i] + ' - ' + pairs[i + 1]);
    }
}
var arrayToSend = [1, 2, 3, 4, 5, 6, 7, 8, 9];
showNums(arrayToSend);

//otra forma

function numsToArr() {

    var newArr = [];
    for (p of arguments) {
        newArr.push(p);
    }
    var pairs = newArr.map(function (x) {
        return x * 2;
    });
    for (var i = 0; i < newArr.length - 1; i++) {
        console.log(newArr[i] + 'º pareja => ' + pairs[i] + ' - ' + pairs[i + 1]);
    }

}
numsToArr(1, 2, 3, 4, 5, 6, 7, 8, 9);

// output =>
// 1ª pareja 2 - 4
// 2ª pareja 4 - 6
// 3ª pareja 6 - 8
//...

//a2) Pasa también el numero a multiplicar a la función como argumento

function numsToArr() {

    var newArr = [];
    for (p of arguments) {
        newArr.push(p);
    }
    console.log('El numero multiplicador es => ' + newArr.length);
    var pairs = newArr.map(function (x) {
        return x * newArr.length;
    });
    for (var i = 0; i < newArr.length - 1; i++) {
        console.log(newArr[i] + 'º pareja => ' + pairs[i] + ' - ' + pairs[i + 1]);
    }

}
numsToArr(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);

//a3) La función debería ser capaz de recibir el numero de parejas que queremos devolver del total.

function numsToArr() {

    var newArr = [];
    for (p of arguments) {
        newArr.push(p);
    }
    var numberRepeats = newArr.slice(-1).pop();
    console.log('El numero multiplicador es => ' + (newArr.length - 1));
    var pairs = newArr.map(function (x) {
        return x * newArr.length - 1;
    });
    for (var i = 0; i < numberRepeats; i++) {
        console.log(newArr[i] + 'º pareja => ' + pairs[i] + ' - ' + pairs[i + 1]);
    }

}
numsToArr(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 6);

//b) Volvemos a la numeros... Podrias hacer una funcion que mostrara por pantalla la serie Fibonacci? https://www.mathsisfun.com/numbers/fibonacci-sequence.html

function fibo() {

    var y = 0;
    var z = 1;
    var fiboArray = [];
    for (x = 0; x < 900; z = x) {
        x += y;
        y = z;
        fiboArray.push(x);
    }
    console.log(fiboArray);
}

fibo();


//b2) Puedes añadir además, la posición de cada resultado?

function fibo() {

    var y = 0;
    var z = 1;


    var fiboArray = [];

    for (var x = 0; x < 900; z = x) {

        x += y;
        y = z;
        fiboArray.push(x);
    }


    for (var i = 0; i < fiboArray.length; i++) {
        acc = (i + 1);

        console.log(acc + 'º ' + fiboArray[i]);
    }
}

fibo();

//b3) Ahora, inserta los resultados en una array y muestralos todos juntos de una manera amigable.

function fibo() {

    var y = 0;
    var z = 1;

    var fiboArray = [];
    var finallyArray = [];

    for (var x = 0; x < 900; z = x) {
        x += y;
        y = z;
        fiboArray.push(x);
    }


    for (var i = 0; i < fiboArray.length; i++) {
        acc = (i + 1);
        finallyArray.push(acc + 'º ' + fiboArray[i]);
        console.log(finallyArray[i]);
    }

}

fibo();

//b4) Ahora, el usuario debería ser capaz de especificar la posición de la serie hasta donde queremos llegar.

function fibo(finallyPosition) {

    var y = 0;
    var z = 1;

    var fiboArray = [];
    var finallyArray = [];

    for (var x = 0; x < 900; z = x) {
        x += y;
        y = z;
        fiboArray.push(x);
    }

    for (var i = 0; i < finallyPosition; i++) {
        acc = (i + 1);
        finallyArray.push(acc + 'º ' + fiboArray[i]);
        console.log(finallyArray[i]);
    }
}

fibo(5);


//b5) Ahora, muestra los resultados en forma piramidal:


function fibo() {

    var y = 0;
    var z = 1;

    var fiboArray = [];


    for (var x = 0; x < 8; z = x) {

        x += y;
        y = z;
        fiboArray.push(x);
        console.log(fiboArray.join(' '));

    }
    for (var i = fiboArray.length; i > 0; i--) {
        fiboArray.pop(i);
        console.log(fiboArray.join(' '));
    }
}

fibo();


// OTRA FORMA

function fibo() {

    var y = 0;
    var z = 1;

    var fiboArray = [];

    for (var x = 0; x < 8; z = x) {

        x += y;
        y = z;
        fiboArray.push(x);


    }
    return fiboArray;
}

function piramide(fibo) {
    var piramid = [];
    for (var i = 0; i < fibo.length; i++) {
        if (i < 1) {
            piramid[i] = fibo[i];
        } else {
            piramid.push(piramid[i - 1] + ' ' + fibo[i]);
        }
    }

    for (var i = fibo.length - 1; i > 0; i--) {
        piramid.push(piramid[i - 1]);
    }
    return piramid;

}
piramide(fibo());

function fiboPymamid(num) {}

//c) Simple Scripting program. Crea un programa que transforme un número de 4 dígitos en otro diferente con las posiciones de los dígitos cambiadas, creandio un nuevo código

function coder(code1, code2) {
    function changePositions(codeToChange) {
        codeToChange = codeToChange.toString().split('');
        // var newCode = []

        var newCode = codeToChange.slice(1, codeToChange.length);
        newCode.push(codeToChange[0]);


        //newCode.push(codeToChange[1])
        //newCode.push(codeToChange[2])
        //newCode.push(codeToChange[3])
        //newCode.push(codeToChange[0])

        return newCode;
    }
    var theResultOf1 = changePositions(code1);
    var theResultOf2 = changePositions(code2);
    console.log('The first function => ' + theResultOf1);

    function multiplyTheCode(codeToMultiply, multi) {
        return codeToMultiply.map(function (n) {
            return n * multi;
        });
    }

    var theResultOf2 = multiplyTheCode(theResultOf1, 2);
    console.log('The second function => ' + theResultOf2);

    function divideTheCode(codeToDivide, div) {
        return codeToDivide.map(function (n) {
            return n / div;
        });
    }

    var theResultOf3 = divideTheCode(theResultOf2, 2);
    console.log('The 3 function => ' + theResultOf3);
}

coder(2412, 1213);


// At Four call, should return the original value
//El primer numero se traslada a la última posicion. El segundo, el tercero y el cuarto suben una posición.

//c2) Ahora, el usuario debería poder introducir como parámetro dos códigos a la vez y devolver los dos códigos encriptados (Los dos códigos se deberían encriptar en la misma función)


function coder(code1, code2) {
    function changePositions(codeToChange) {
        codeToChange = codeToChange.toString().split('');
        // var newCode = []

        var newCode = codeToChange.slice(1, codeToChange.length);
        newCode.push(codeToChange[0]);


        //newCode.push(codeToChange[1])
        //newCode.push(codeToChange[2])
        //newCode.push(codeToChange[3])
        //newCode.push(codeToChange[0])

        return newCode;
    }
    var theResultOf1 = changePositions(code1);
    var theResultOf2 = changePositions(code2);
    console.log('The first function => ' + theResultOf1);
    console.log('The first function => ' + theResultOf2);

    function multiplyTheCode(codeToMultiply, multi) {
        return codeToMultiply.map(function (n) {
            return n * multi;
        });
    }

    var theResultOf3 = multiplyTheCode(theResultOf1, 2);
    var theResultOf4 = multiplyTheCode(theResultOf2, 2);

    console.log('The second function => ' + theResultOf3);
    console.log('The second function => ' + theResultOf4);

    function divideTheCode(codeToDivide, div) {
        return codeToDivide.map(function (n) {
            return n / div;
        });
    }

    var theResultOf5 = divideTheCode(theResultOf3, 2);
    var theResultOf6 = divideTheCode(theResultOf4, 2);
    console.log('The third function => ' + theResultOf5);
    console.log('The third function => ' + theResultOf6);
}

coder(2412, 1213);



// Ahora, vamos a añadir un nivel más de seguridad. Despues de cambiar la posición de los dígitos, multiplicaremos a cada miembro por un numero cuya multiplicación no sea superior a 10. (Si es superior a 10, conseguiremos una multplicación de dos digitos y el código ya no sería de 4 valores)

// Ahora, implementa en otra funcion aparte el decrypter(), que recibirá como argumento un código encriptado (y correspondientemente multiplicado en el apartado c3) y nos devuelva el código desencriptado.


function coder(word1, word2) {
    function wordToCode(word) {

        var dictionary = {
            0: ['A', 'F', 'K', 'O', 'T', 'Y'],
            1: ['B', 'G', 'L', 'P', 'U', 'Z'],
            2: ['C', 'H', 'M', 'Q', 'V', '.'],
            3: ['D', 'I', 'N', 'R', 'W', ','],
            4: ['E', 'J', 'Ñ', 'S', 'X', ' ']
        };

        var codeToReturn = [];
        for (var i = 0; i < word.length; i++) {
            for (key in dictionary) {
                if (dictionary[key].indexOf(word[i]) !== -1) {
                    //console.log(dictionary[key].indexOf(code[i]))
                    codeToReturn.push(key);
                }
            }
        }

        return codeToReturn;
    }

    var theResultOf0 = wordToCode(word1);
    var theResultOf0_1 = wordToCode(word2);


    function changePositions(codeToChange) {
        codeToChange = codeToChange.toString().split('');
        // var newCode = []

        var newCode = codeToChange.slice(1, codeToChange.length);
        newCode.push(codeToChange[0]);


        //newCode.push(codeToChange[1])
        //newCode.push(codeToChange[2])
        //newCode.push(codeToChange[3])
        //newCode.push(codeToChange[0])

        return newCode;
    }
    var theResultOf1 = changePositions(theResultOf0);
    var theResultOf2 = changePositions(theResultOf0_1);
    console.log('The first function => ' + theResultOf1);
    console.log('The first function => ' + theResultOf2);

    function multiplyTheCode(codeToMultiply, multi) {
        return codeToMultiply.map(function (n) {
            return n * multi;
        });
    }

    var theResultOf3 = multiplyTheCode(theResultOf1, 2);
    var theResultOf4 = multiplyTheCode(theResultOf2, 2);

    console.log('The second function => ' + theResultOf3);
    console.log('The second function => ' + theResultOf4);

    function divideTheCode(codeToDivide, div) {
        return codeToDivide.map(function (n) {
            return n / div;
        });
    }

    var theResultOf5 = divideTheCode(theResultOf3, 2);
    var theResultOf6 = divideTheCode(theResultOf4, 2);
    console.log('The third function => ' + theResultOf5);
    console.log('The third function => ' + theResultOf6);

    function decrypt(codeToDecrypt) {

        var numberToChange = codeToDecrypt.pop();
        codeToDecrypt.unshift(numberToChange);
        return codeToDecrypt;

    }

    var result6 = decrypt(theResultOf5);
    var result7 = decrypt(theResultOf6);
    console.log('The fourth function => ' + result6);
    console.log('The fourth function => ' + result7);
}

coder(1132, 1421);




// Añade las dos funciones a la misma función padre, de forma que encripte y desencripte a la vez cuando termine de ejecutarse.

function codeScript(code1, code2) { ...codeDecrypt(code1Encrypt, code2Encrypt);
}
//c6) El usuario podrá solo introducir letras, cada número del 0 al 9 corresponderá a varias letras. Podéis seguir este esquema.


function coder(word1, word2) {
    function wordToCode(word) {

        var dictionary = {
            0: ['A', 'F', 'K', 'O', 'T', 'Y'],
            1: ['B', 'G', 'L', 'P', 'U', 'Z'],
            2: ['C', 'H', 'M', 'Q', 'V', '.'],
            3: ['D', 'I', 'N', 'R', 'W', ','],
            4: ['E', 'J', 'Ñ', 'S', 'X', ' ']
        };

        var codeToReturn = [];
        for (var i = 0; i < word.length; i++) {
            for (key in dictionary) {
                if (dictionary[key].indexOf(word[i]) !== -1) {
                    //console.log(dictionary[key].indexOf(code[i]))
                    codeToReturn.push(key);
                }
            }
        }

        return parseInt(codeToReturn.join(''));
    }

    var theResultOf0 = wordToCode(word1);
    var theResultOf0_1 = wordToCode(word2);


    function changePositions(codeToChange) {
        codeToChange = codeToChange.toString().split('');
        // var newCode = []

        var newCode = codeToChange.slice(1, codeToChange.length);
        newCode.push(codeToChange[0]);


        //newCode.push(codeToChange[1])
        //newCode.push(codeToChange[2])
        //newCode.push(codeToChange[3])
        //newCode.push(codeToChange[0])

        return newCode;
    }
    var theResultOf1 = changePositions(theResultOf0);
    var theResultOf2 = changePositions(theResultOf0_1);
    console.log('The first function => ' + theResultOf1);
    console.log('The first function => ' + theResultOf2);

    function multiplyTheCode(codeToMultiply, multi) {
        return codeToMultiply.map(function (n) {
            return n * multi;
        });
    }

    var theResultOf3 = multiplyTheCode(theResultOf1, 2);
    var theResultOf4 = multiplyTheCode(theResultOf2, 2);

    console.log('The second function => ' + theResultOf3);
    console.log('The second function => ' + theResultOf4);

    function divideTheCode(codeToDivide, div) {
        return codeToDivide.map(function (n) {
            return n / div;
        });
    }

    var theResultOf5 = divideTheCode(theResultOf3, 2);
    var theResultOf6 = divideTheCode(theResultOf4, 2);
    console.log('The third function => ' + theResultOf5);
    console.log('The third function => ' + theResultOf6);

    function decrypt(codeToDecrypt) {

        var numberToChange = codeToDecrypt.pop();
        codeToDecrypt.unshift(numberToChange);

        return codeToDecrypt;
    }

    var result6 = decrypt(theResultOf5);
    var result7 = decrypt(theResultOf6);
    console.log('The fourth function => ' + result6);
    console.log('The fourth function => ' + result7);
}

coder("PEPE", "JEJE");

var dictionary = {
    0: ['A', 'F', 'K', 'O', 'T', 'Y'],
    1: ['B', 'G', 'L', 'P', 'U', 'Z'],
    2: ['C', 'H', 'M', 'Q', 'V', '.'],
    3: ['D', 'I', 'N', 'R', 'W', ','],
    4: ['E', 'J', 'Ñ', 'S', 'X', ' ']
};

function codeScript("HI  ", "WE  ", "NEED", "HELP") {}

//d) Crea un programa que use la encriptacion Romana, como es? Si tenemos la palabra SKYLAB, la palabra encriptada será SLKAYB. Si divides la palabra original en 2 grupos obtienes:

function encrypter(word) {
    var arrayLetters = [];
    var arrayLetters1 = [];
    var resultArray = [];
    for (var i = 0; i < word.length; i++) {
        if (i < word.length / 2) {
            arrayLetters.push(word.charAt([i]));
        } else {
            arrayLetters1.push(word.charAt([i]));
        }
    }
    for (var j = 0; j < arrayLetters.length; j++) {

        resultArray.push(arrayLetters[j]);
        resultArray.push(arrayLetters1[j]);
    }
    console.log(resultArray.join(''));
}

encrypter("SKYLAB");

//d2) Programa el desencriptador, pasa como parámetro SLKAYB y que devuelva SKYLAB.

function desencrypted(word) {

    var part1 = [];
    var part2 = [];
    var part3 = [];
    var resultPart = [];


    for (var i = 0; i < word.length; i++) {
        if (i <= 1) {
            part1.push(word[i]);
        } else if (i > 1 && i <= 3) {
            part2.push(word[i]);
        } else {
            part3.push(word[i]);

        }

    }

    for (var i = 0; i < part1.length; i++) {
        resultPart.push(part1[i]);
        resultPart.push(part2[i]);
        resultPart.push(part3[i]);
    }

    console.log(resultPart.join(""));
}
desencrypted("SLKAYB");

//Hint: for decrypt, only catch the pair words like: S L K A Y B , then, you get SKY, the next step is catch the odd words, S L K A Y B, group the two groups and you get the original word.

//d3) Agrupa la función Encrypt y decrypt en una unica función, de forma que introduzcas como parámetro SKYLAB y devuelva SKYLAB (con todas las transformaciones internas hechas y mostrando, entre medias, la transformación)

function finallEncrypt(word) {

    function encrypter(word) {
        var arrayLetters = [];
        var arrayLetters1 = [];
        var resultArray = [];
        for (var i = 0; i < word.length; i++) {
            if (i < word.length / 2) {
                arrayLetters.push(word.charAt([i]));
            } else {
                arrayLetters1.push(word.charAt([i]));
            }
        }
        for (var j = 0; j < arrayLetters.length; j++) {

            resultArray.push(arrayLetters[j]);
            resultArray.push(arrayLetters1[j]);
        }
        return resultArray.join('');
    }
    var encryptResult = encrypter(word);


    function desencrypted(word) {

        var part1 = [];
        var part2 = [];
        var part3 = [];
        var resultPart = [];


        for (var i = 0; i < word.length; i++) {
            if (i <= 1) {
                part1.push(word[i]);
            } else if (i > 1 && i <= 3) {
                part2.push(word[i]);
            } else {
                part3.push(word[i]);

            }

        }

        for (var i = 0; i < part1.length; i++) {
            resultPart.push(part1[i]);
            resultPart.push(part2[i]);
            resultPart.push(part3[i]);
        }

        return resultPart.join("");
    }

    var decryptResult = desencrypted(encryptResult);
    console.log(encryptResult);
    console.log(decryptResult);

}
finallEncrypt("SKYLAB");

//d4) Lo tienes? Prueba ahora con SKYLABCODERS. Cambia la función para que pueda aceptar palabras más largas.





//e) Crea un programa al que le introduces un número como parámetro del 0 al 100 y devuelve el número transformado a alfabeto normal, es decir:


function numbersToLetters(number) {


    var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    if (number <= 9) {
        console.log(units[number]);
    } else if (number > 9 && number <= 19) {
        console.log(teens[number - 10]);
    } else {
        var array = number.toString().split('');
        console.log(tens[array[0]] + '-' + units[array[1]]);
    }
}
numbersToLetters(45);

//e2) Ahora, el output debería ser capaz de, aparte de devolver el número traducido, devolver también los números por los que está formado:

function numbersToLetters(number) {


    var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    if (number <= 9) {
        console.log(units[number] + ' => ' + number);
    } else if (number > 9 && number <= 19) {
        var array1 = number.toString().split('');
        console.log(teens[number - 10] + ' => ' + array1[0] * 10 + ' + ' + array1[1]);
    } else {
        var array = number.toString().split('');
        console.log(tens[array[0]] + '-' + units[array[1]] + ' => ' + array[0] * 10 + ' + ' + array[1]);
    }
}
numbersToLetters(8);
numbersToLetters(18);
numbersToLetters(48);

   // f) Recibiendo el siguiente texto por parámetro a tu función...:

    var text = "Hola papa como estas";

function textChange(textToChange) {
    for (var i = 0; i < text.length; i++) {
        console.log(text[0]);
    }
}

//Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
//Prepara dicha función para que modifique y devuelva el texto bajo estas reglas: Signos de puntuación: -	"." => "," - "," => "" Palabras: - "dolor" => "potato" - "lorem" => "tomato" - "labor" => "cucumber" - "consequatur" => "garlic" - "ipsum" => "onion"

//Una forma
var allText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.";

function textChange(text) {

    var commaChange = text.replace(/,/g, '""');
    var potatoChange = commaChange.replace(/dolor/g, 'potato');
    var tomatoChange = potatoChange.replace(/lorem/ig, 'tomato');
    var cucumberChange = tomatoChange.replace(/labor/g, 'cucumber');
    var array = cucumberChange.split(' ');
    for (var i = 0; i < array.length; i++)
};

textChange(allText);

//OTRAFORMA

var allText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.";

function textChange(text) {

    var commaChange = text.replace(/,/g, '""').replace(/dolor/g, 'potato').replace(/lorem/ig, 'tomato').replace(/labor/g, 'cucumber');
    console.log(commaChange);
}

textChange(allText);

//f1) Añade una funcionalidad que cuente cuantos cambios/coincidencias ha encontrado de cada palabra, y te los muestre de una forma amigable para el usuario

function textChange(text) {

    var commaChange = text.replace(/,/g, '""').replace(/dolor/g, 'potato').replace(/lorem/ig, 'tomato').replace(/labor/g, 'cucumber');
    var array = commaChange.split(' ');
    var potato = 0;
    var tomato = 0;
    for (var i = 0; i < array.length; i++) {
        if ("potato" == array[i]) {
            potato += 1;
        } else if ("tomato" == array[i]) {
            tomato += 1;
        }
    }
    console.log('La palabra tomato se repite ' + tomato + ' veces en el texto');
    console.log('La palabra potato se repite ' + potato + ' veces en el texto');
    console.log(commaChange);
}


textChange(allText);