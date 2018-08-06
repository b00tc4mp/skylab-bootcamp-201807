// count words
function countWords(string) {
    // TODO: count words in string using a standard loop
    var words = 0;

    for (var i = 0; i < string.length; i++) {
        var letter = string[i],
            nextLetter = string[i+1],
            isFirstWord = i === 0 && isAlphaNumeric(letter);

        if (isFirstWord || !isAlphaNumeric(letter) && isAlphaNumeric(nextLetter)) {
            words++;
        }        
    }

    return words;
}