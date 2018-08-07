function toCamelCase(string) {
    // TODO return string into camelCase
    var words = splitToWords(string); // tenemos las palabras []

    if (words.length){
        for (var i=0; i < words.length; i++){
            words[i] = words[i].toLowerCase(); // las pasamos todas a minusculas
        }

        if (words.length === 1){
            return words.join("");
        } else {
            for (var i=1 ; i< words.length; i++){
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            }
            return words.join("");
        }
    } else {
        return words.join("");
    }
}

// split
// .toLowerCase
// .toUpperCase a partir del [1]
// .concat
