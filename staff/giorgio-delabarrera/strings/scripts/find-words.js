function findWords(string, func) {
    
    var foundWords = [];
    
    var words = splitToWords(string);

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (func(word)) {
            foundWords.push(word);
        }
    }
    
    return foundWords;
}