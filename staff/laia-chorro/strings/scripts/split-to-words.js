function splitToWords(string) {
    // TODO implement using standard loop
    var word = '',
        words = [];

    for (var i = 0; i < string.length; i++) {
        var letter = string[i],
            nextLetter = string[i+1];

        if (isAlphaNumeric(letter) ) {
            word += letter;

            if (!nextLetter || !isAlphaNumeric(nextLetter) ) {
                words.push(word);
                word = '';
            }
        }
    }

    return words;
}