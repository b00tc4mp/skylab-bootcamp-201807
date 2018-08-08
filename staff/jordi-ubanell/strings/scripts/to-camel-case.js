function toCamelCase(string) {
    // TODO return string into camelCase
    var words = splitToWords(string.toLowerCase()) 
        var newString = [];
        for (var i = 1; i < words.length; i++) {
            words[1] = words[i][0].toUpperCase() + words[1].slice(1);        
    }
return words.join("");
}






// pillar la frase
// aplicarle la función separar palabras
// coger cada palabra y poner la primera en mayúscula
// join en un array todas las palabras


// find words (that match expression in provided function)

function findWords(string, func) {
    var words = splitToWords(string);

    var matchingWords = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i];

        if (func(word)) matchingWords.push(word);
    }

    return matchingWords;
}