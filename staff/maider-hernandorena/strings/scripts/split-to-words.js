// split to words
function _splitToWords(string) {
        word = "",
        wordsArr = [];

    for (var i = 0; i < string.length; i++) {
        var letter = string[i];
        //var nextLetter = string[i+1];
        if (!isBlank(letter) && !hasSymbol(letter)) {
            word += letter;
            /* if (!nextLetter || nextLetter === isBlank(letter)) {
                wordsArr.push(word);
                word = "";
            } */
        } 
        if (word.length) wordsArr.push(word);
    }
    return wordsArr;
}

// split to words CLASE

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