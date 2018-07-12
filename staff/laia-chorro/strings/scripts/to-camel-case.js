
function toCamelCase(string) {
    // TODO: implement using a standard loop
    var words = splitToWords(string.toLowerCase()),
        camelCase = '';

    for (var i = 0; i < words.length; i++) {
        var word = words[i];

        if (i > 0) {
            word =  word.charAt(0).toUpperCase() + word.slice(1);
        }
        
        camelCase += word;
    }

    return camelCase;
}