function splitToWords(string) {
    var words = [];
    var word = '';
    for (var i = 0; i < string.length; i++) {
        var char = string[i];
        if (!isBlank(char) && !hasSymbol(char)) {
            word += char;
        } else if(word) {
            words.push(word);
            word = '';
        }
    }
    if(word) words.push(word);
    return words;
}