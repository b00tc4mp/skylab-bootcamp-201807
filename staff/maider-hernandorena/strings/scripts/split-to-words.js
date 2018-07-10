// split to words
function splitToWords(string) {
    var space = " ",
        word = "",
        wordsArr = [];

    for (var i = 0; i < string.length; i++) {
        var letter = string[i],
            nextLetter = string[i+1];
        if (letter !== space && !hasSymbol(letter)) {
            word += letter;
            if (!nextLetter || nextLetter === space) {
                wordsArr.push(word);
                word = "";
            }
        } 
    }
    return wordsArr;
}