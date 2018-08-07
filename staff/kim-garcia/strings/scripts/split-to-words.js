
// split to words

function splitToWords(string) {
    // TODO implement using standard loop
    var words = []
    var currentWord =""

    for (var i = 0; i < string.length; i++){
        var char = string[i];

        if (!isBlank(char) && !hasSymbol(char)){ //no es no blanco ni simbolo, ira acomulando hasta que detecte un blanco, un espacio
            currentWord = currentWord.concat(char);

        } else if (currentWord.length){ //si existe algo en current word, es true
            words.push(currentWord);
            currentWord = "" // igualamos a zero, vuelve a empezar
        }
    }
    if (currentWord.length) words.push(currentWord); // si acabo el for pero quedo algo acomulado en current words

    return words
}

