function toCamelCase(string) {
    // TODO return string into camelCase
    var words = splitToWords(string.toLowerCase())
    var newString = [];
    for (var i = 1; i < words.length; i++) {
        words[1] = words[i][0].toUpperCase() + words[1].slice(1);
    }
    return words.join("");
}