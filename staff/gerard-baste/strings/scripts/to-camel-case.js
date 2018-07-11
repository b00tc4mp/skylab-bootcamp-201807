
// to camel case

function toCamelCase(string) {
    var empty = "";
    var words = splitToWords(string);

    for (var i = 0; i < words.length; i++) {
        for (var j = 0; j < words[i].length; j++) {
            if ( i !== 0 && j === 0 ) {
                empty += words[i][0].toUpperCase();
            } else {
                empty += words[i][j].toLowerCase();
            }
        }
    }
    console.log(empty);
    return empty;
}
 

//otra prueba, solo que al final de los simbolos y espacios o tabulaciones peta
function _toCamelCase(string) {
    var empty = "";
    var lowerCase = string.toLowerCase();
    for (var i = 0; i < lowerCase.length; i++) {
        if (hasSymbol(lowerCase[i]) || isBlank(lowerCase[i])) {
            if (i === 0) {
                empty += lowerCase[i+1];
                i++;
            } else {
                empty += lowerCase[i+1].toUpperCase();
                i++;
            }
        } else if (!isBlank(lowerCase[i])) {
            empty += lowerCase[i];
        } 
    }
    console.log(empty);
    return empty;
}


console.log(toCamelCase('hello world') === 'helloWorld') //true
console.log(toCamelCase('Hola Mundo') === 'holaMundo') //true
console.log(toCamelCase('HELLO WORLD') === 'helloWorld') //true
