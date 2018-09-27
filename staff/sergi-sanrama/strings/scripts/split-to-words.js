// split to words

function splitToWords(string) {
    var words = [];
    var currentWord = '';

    for (var i = 0; i < string.length; i++) {
        var char = string[i];

        if (!isBlank(char) && !hasSymbol(char)) {
            //currentWord += char;
            currentWord = currentWord.concat(char);
        } else if (currentWord.length) {
            words.push(currentWord);

            currentWord = '';
        } 
    }

    if (currentWord.length) words.push(currentWord);

    return words;
}