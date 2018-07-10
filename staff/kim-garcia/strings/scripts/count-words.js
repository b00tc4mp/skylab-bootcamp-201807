// count words

function countWords(string) {
    var count = 0;
    var blankBefore = true;  

    for (var i = 0; i < string.length; i++) { //recorremos el string
        var char = string[i]; //pillas un CHAR, letra

        if (!isBlank(char)) {   // si el CHAR seleccionado no es blanco, !true osea es FALSE
            if (blankBefore && !hasSymbol(char)) {  // TRUE && "", no es simbolo osea es FALSE
                count++;  

                blankBefore = false; // porque si estamos en una letra
            }
        } else blankBefore = true; //si es simbolo
    }

    return count;  //cantidad de palabras encontradas
}

console.log(countWords('hello world') === 2); // true